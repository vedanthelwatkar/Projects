from langbot.controllers import home, bot, delete_vectorstore

def home_view(request):
    return home(request)

def bot_view(request):
    return bot(request)

def delete_vectorstore_view(request):
    return delete_vectorstore(request)
