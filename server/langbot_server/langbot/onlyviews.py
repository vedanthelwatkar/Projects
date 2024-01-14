from django.http import JsonResponse
from PyPDF2 import PdfReader
import tempfile
import os
from dotenv import load_dotenv
from openai import OpenAI
import json
from langchain.text_splitter import RecursiveCharacterTextSplitter
import faiss
import numpy as np
from langchain_openai import OpenAIEmbeddings


load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI', default='')

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_chunks(text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = 500,
        chunk_overlap = 0,
        length_function = len
    )
    chunks = splitter.split_text(text)
    return chunks


embeddings_model = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
def get_vectorstore(text_chunks):
    embeddings = embeddings_model.embed_documents(text_chunks)
    if not embeddings:
        raise Exception("Embeddings list is empty")
    embedding_size = len(embeddings[0])
    index = faiss.IndexFlatIP(embedding_size)

    vectors = np.array(embeddings, dtype=np.float32)
    index.add(vectors)

    faiss.write_index(index, "vectorstore.index")

    return index

def load_vectorstore():
    index = faiss.read_index("vectorstore.index")
    return index

def get_similar_docs(query, text_chunks, index, k=1):
    embedded_query = embeddings_model.embed_query(query)
    distances, similar_doc_indices = index.search(np.array([embedded_query], dtype=np.float32), k)

    if len(similar_doc_indices) == 0:
        most_similar_doc_index = None
        most_similar_doc = None
    else:
        similar_doc_indices = similar_doc_indices.flatten().tolist()
        most_similar_doc_index = similar_doc_indices[0]
        most_similar_doc = text_chunks[most_similar_doc_index]

    return most_similar_doc_index, most_similar_doc

def chatgpt(most_similar_doc,query):
        try:    
            paragraph = most_similar_doc
            client = OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages = [{"role": "user", "content": f"Given the following data: {paragraph}\nAnswer the question: {query}"}],
            temperature=0.5
            )
            answer = response.choices[0].message.content
            return answer
        except Exception as e:
            return str(e)

def home(request):
    global chunks
    if request.method == 'POST':
        pdf_files = request.FILES.getlist("pdfFiles")
        pdf_docs = []
        if not pdf_files:
            return JsonResponse({"message": "no input"})
        try:
            pdf_filenames = []
            for pdf_file in pdf_files:
                pdf_filename = pdf_file.name
                with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
                    temp_pdf.write(pdf_file.read())
                    pdf_docs.append(temp_pdf.name)
                    pdf_filenames.append(pdf_filename)
                temp_pdf.close()
            text = get_pdf_text(pdf_docs)
            print('text',len(text))
            chunks = get_chunks(text)
            print('chunks',len(chunks))
            if os.path.isfile("vectorstore.index"):
                load_vectorstore()
            else:
                get_vectorstore(chunks)

            for pdf_file in pdf_docs:
                os.remove(pdf_file)
            response_data = {"message": "Vector Store Created", "chunks": chunks}
            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def bot(request):
    if request.method == "POST":
        data = json.loads(request.body)
        query = data.get("query", "").strip()
        chunks = data.get('chunks')
        print("text chunks length = " + str(len(chunks)))
        vectorstore = load_vectorstore()

        if not query:
            return JsonResponse({"message": "Invalid query"})

        if chunks is None:
            return JsonResponse({"message": "Text chunks not available"})

        most_similar_doc_index, most_similar_doc = get_similar_docs(query, chunks, vectorstore)
        
        if most_similar_doc_index is None:
            return JsonResponse({"message": "No similar documents found"})

        answer = chatgpt(most_similar_doc,query)
        print(answer)

        return JsonResponse({
            "query": query,
            "answer": answer
        })
    
    return JsonResponse({"message": "Invalid request method"})

def delete_vectorstore(request):
    if request.method == "POST":
        if os.path.isfile("vectorstore.index"):
            os.remove("vectorstore.index")
            return JsonResponse({"message": "DELETED"})
        else:
            return JsonResponse({"message": "Vector Store Not Found"})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)