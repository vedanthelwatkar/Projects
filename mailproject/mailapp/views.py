from django.shortcuts import render, redirect
from .forms import MailForm
import pickle

def home(request):
    if request.method == "POST":
        form = MailForm(request.POST)
        if form.is_valid():
            Mail = form.cleaned_data["Mail"]
            if Mail is not None:
                if len(Mail) < 2:
                    msg = "Mail must be at least 2 characters"
                if len(Mail) > 200:
                    msg = "Mail must be less than 200 characters"
                else:
                    with open("re.model", "rb") as f:
                        model, feature_extraction = pickle.load(f)
                    input_data_features = feature_extraction.transform([Mail])
                    prediction = model.predict(input_data_features)
                    if prediction[0]:
                        msg = "Ham Mail"
                        form = MailForm
                    else:
                        msg = "Spam Mail"
                        form = MailForm
                return render(request, "home.html", {"form": form, "msg": msg})
    else:
        form = MailForm()
    return render(request, "home.html", {"form": form})
