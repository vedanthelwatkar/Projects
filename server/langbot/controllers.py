from django.http import JsonResponse
from langbot.services import (
    get_chunks,
    get_vectorstore,
    load_vectorstore,
    get_similar_docs,
    chatgpt,
    get_pdf_text
)
import tempfile,os,json

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
        vectorstore = load_vectorstore()

        if not query:
            return JsonResponse({"message": "Invalid query"})

        if chunks is None:
            return JsonResponse({"message": "Text chunks not available"})

        most_similar_doc_index, most_similar_doc = get_similar_docs(query, chunks, vectorstore)

        if most_similar_doc_index is None:
            return JsonResponse({"message": "No similar documents found"})

        answer = chatgpt(most_similar_doc,query)

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
