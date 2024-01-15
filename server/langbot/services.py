from dotenv import load_dotenv
from openai import OpenAI
# from langchain_openai import OpenAIChatAgent          not available
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI,OpenAIEmbeddings
# from langchain_community.vectorstores import FAISS            not available
# from langchain.agents import OpenAIChatAgent              not available
from langchain.memory import ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain.chains import LLMChain
import faiss,numpy as np,tempfile,os
from PyPDF2 import PdfReader


load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI', default='')

# def read_word_document(uploaded_file):
#     if uploaded_file.name.endswith(('.doc', '.docx')):
#         with tempfile.NamedTemporaryFile(delete=False) as temp_docx:
#             temp_docx.write(uploaded_file.read())
#             document_path = temp_docx.name

#         doc = Document(document_path)
#         document_content = ""

#         for paragraph in doc.paragraphs:
#             document_content += paragraph.text + "\n"

#         for table in doc.tables:
#             for row in table.rows:
#                 for cell in row.cells:
#                     document_content += cell.text + "\n"

#         os.remove(document_path)
#         return document_content

#     return ""

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
# llm = OpenAI(openai_api_key=OPENAI_API_KEY)

def get_vectorstore(text_chunks):
#with llms
    # embeddings = llm.embed_documents(text_chunks)            used according to docs but this method is not available
    # if not embeddings:
    #     raise Exception("Embeddings list is empty")
    # embedding_size = len(embeddings[0])
    # index = faiss.IndexFlatIP(embedding_size)

    # vectors = np.array(embeddings, dtype=np.float32)
    # index.add(vectors)

    # faiss.write_index(index, "vectorstore.index")

    # return index


#with OpenAIEmbeddings

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
    # embedded_query = llm.embed_query(query)                           used according to docs but this method is not available
    # distances, similar_doc_indices = index.search(np.array([embedded_query], dtype=np.float32), k)

    # if len(similar_doc_indices) == 0:
    #     most_similar_doc_index = None
    #     most_similar_doc = None
    # else:
    #     similar_doc_indices = similar_doc_indices.flatten().tolist()
    #     most_similar_doc_index = similar_doc_indices[0]
    #     most_similar_doc = text_chunks[most_similar_doc_index]

    # return most_similar_doc_index, most_similar_doc

#with OpenAIEmbeddings

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


def chatgpt(most_similar_doc, query, chat_history=[]):
    llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY)
    most_similar_doc_str = str(most_similar_doc[0]) if isinstance(most_similar_doc, list) and len(most_similar_doc) > 0 else str(most_similar_doc)
    prompt = ChatPromptTemplate(
        messages=[
            SystemMessagePromptTemplate.from_template(f"You are a chatbot with a conversation history of {most_similar_doc_str} and keep all the answers within 100 words"),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template(f"{query}"),
        ]
    )

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    conversation = LLMChain(llm=llm, prompt=prompt, verbose=True, memory=memory)

    for message in chat_history:
        if isinstance(message, str):
            memory.chat_memory.add_user_message(message)

    response = conversation({"query": query})
    if isinstance(response, str):
        memory.chat_memory.add_ai_message(response)
    print(response['chat_history'][-1].content)
    return response['chat_history'][-1].content
        # try:    
        #     paragraph = most_similar_doc
        #     client = OpenAI(api_key=OPENAI_API_KEY)
        #     response = client.chat.completions.create(
        #     model="gpt-3.5-turbo",
        #     messages = [{"role": "user", "content": f"Given the following data: {paragraph}\nAnswer the question: {query}"}],
        #     temperature=0.5
        #     )
        #     answer = response.choices[0].message.content
        #     return answer
        # except Exception as e:
        #     return str(e)
