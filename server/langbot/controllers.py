from django.http import JsonResponse
from langbot.services import (
    get_chunks,
    get_vectorstore,
    load_vectorstore,
    get_similar_docs,
    chatgpt,
    get_pdf_text
)
from docx2txt import process
import tempfile,os,json
def home(request):
    global chunks
    if request.method == 'POST':
        files = request.FILES.getlist("Files")
        pdf_docs = []
        try:
            if not files:
                return JsonResponse({"message": "no input"})

            pdf_filenames = []
            for uploaded_file in files:
                file_extension = os.path.splitext(uploaded_file.name)[1].lower()

                if file_extension == '.pdf':
                    pdf_filename = uploaded_file.name
                    with tempfile.NamedTemporaryFile(delete=False) as temp_pdf:
                        temp_pdf.write(uploaded_file.read())
                        pdf_docs.append(temp_pdf.name)
                        pdf_filenames.append(pdf_filename)
                    temp_pdf.close()
                    text = get_pdf_text(pdf_docs)

                elif file_extension == '.docx':
                    with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as temp_docx:
                        temp_docx.write(uploaded_file.read())
                        text = process(temp_docx.name)
                else:
                    print("error", "Unsupported file format")
                    return JsonResponse({"error": "Unsupported file format"})

                chunks = get_chunks(text)
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

        print('mostsimilardoc',most_similar_doc,query)

        answer = chatgpt(most_similar_doc,query)
        print('answer',answer)
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
