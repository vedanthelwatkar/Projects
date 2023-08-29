from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.core.mail import send_mail
from django.contrib import messages
import json
from collections import Counter
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.db import connection



@login_required(login_url='login')
def index(request):
    user = request.user
    full_name = None
    if user.is_authenticated:
        full_name = user.first_name if user.first_name else user.username
        with connection.cursor() as cursor:
            cursor.execute("SELECT intensity,likelihood,relevance,topic,region,end_year,start_year,country,title,added,sector,insight,pestle,source FROM userdata")
            data = cursor.fetchall()

        intensity_list = [row[0] for row in data]
        likelihood_list = [row[1] for row in data]
        relevance_list = [row[2] for row in data]
        topic_list = [row[3] for row in data]
        region_list = [row[4] for row in data]
        end_year_list = [row[5] for row in data]
        start_year_list = [row[6] for row in data]
        country_list = [row[7] for row in data]

        intensity_freq = Counter(intensity_list)
        likelihood_freq = Counter(likelihood_list)
        relevance_freq = Counter(relevance_list)
        topic_freq = Counter(topic_list)
        region_freq = Counter(region_list)
        end_year_freq = Counter(end_year_list)
        start_year_freq = Counter(start_year_list)
        country_freq = Counter(country_list)

        intensity_common = intensity_freq.most_common(10)
        likelihood_common = likelihood_freq.most_common(10)
        relevance_common = relevance_freq.most_common(10)
        topic_common_words = topic_freq.most_common(10)
        region_common_words = region_freq.most_common(10)
        end_year_common_words = end_year_freq.most_common(10)
        start_year_common_words = start_year_freq.most_common(10)
        country_common_words = country_freq.most_common(10)

        intensity_labels = [item[0] for item in intensity_common]
        intensity_data_values = [item[1] for item in intensity_common]

        likelihood_labels = [item[0] for item in likelihood_common]
        likelihood_data_values = [item[1] for item in likelihood_common]

        relevance_labels = [item[0] for item in relevance_common]
        relevance_data_values = [item[1] for item in relevance_common]

        topic_labels = [word[0] for word in topic_common_words]
        topic_data_values = [word[1] for word in topic_common_words]

        region_labels = [word[0] for word in region_common_words]
        region_data_values = [word[1] for word in region_common_words]

        end_year_labels = [word[0] for word in end_year_common_words]
        end_year_data_values = [word[1] for word in end_year_common_words]

        start_year_labels = [word[0] for word in start_year_common_words]
        start_year_data_values = [word[1] for word in start_year_common_words]

        country_labels = [word[0] for word in country_common_words]
        country_data_values = [word[1] for word in country_common_words]

        data_with_serial = [(i+1, *item) for i, item in enumerate(data)]

        context = {
            'user': user,
            'full_name': full_name,
            'intensity_labels_json': json.dumps(intensity_labels),
            'intensity_data_values_json': json.dumps(intensity_data_values),
            'likelihood_labels_json': json.dumps(likelihood_labels),
            'likelihood_data_values_json': json.dumps(likelihood_data_values),
            'relevance_labels_json': json.dumps(relevance_labels),
            'relevance_data_values_json': json.dumps(relevance_data_values),
            'topic_labels_json': json.dumps(topic_labels),
            'topic_data_values_json': json.dumps(topic_data_values),
            'region_labels_json': json.dumps(region_labels),
            'region_data_values_json': json.dumps(region_data_values),
            'end_year_labels_json': json.dumps(end_year_labels),
            'end_year_data_values_json': json.dumps(end_year_data_values),
            'start_year_labels_json': json.dumps(start_year_labels),
            'start_year_data_values_json': json.dumps(start_year_data_values),
            'country_labels_json': json.dumps(country_labels),
            'country_data_values_json': json.dumps(country_data_values),
            'data': data_with_serial,
        }
        return render(request, 'index.html', context)
    return HttpResponse("You are not logged in.")

def support(request):
    user = request.user
    full_name = None
    if user.is_authenticated:
        full_name = user.first_name if user.first_name else user.username
    return render(request, 'pages/support/support.html' ,{'user': user, 'full_name': full_name})

def ulogin(request):
    if request.user.is_authenticated:
        return redirect("index")
    else:
        if request.method == "POST":
            un = request.POST.get("exampleInputEmail1")
            pw = request.POST.get("exampleInputPassword1")
            usr = authenticate(username=un, password=pw)
            if usr is not None:
                login(request, usr)
                return redirect("index")
            else:
                messages.error(request, "Invalid username/password")
        return render(request, 'pages/samples/login.html')

def uregister(request):
    if request.user.is_authenticated:
        return redirect("index")
    else:
        if request.method == "POST":
            na = request.POST.get("exampleInputname1")
            un = request.POST.get("exampleInputUsername1")
            em = request.POST.get("exampleInputEmail1")
            cn = request.POST.get("exampleFormControlSelect2")
            pw = request.POST.get("exampleInputPassword1")
            cb = request.POST.get("checkbox")
            if not na.replace(" ", "").isalpha():
                messages.error(request, "Name can only contain alphabets")
                return render(request, 'pages/samples/register.html')
            if cb is None:
                messages.error(request, "Please select the checkbox")
                return render(request, 'pages/samples/register.html')
            if not un:
                messages.error(request, "Please provide a username.")
                return render(request, 'pages/samples/register.html')

            if len(un) < 6:
                messages.error(request, "Username must be at least 6 characters long.")
                return render(request, 'pages/samples/register.html')

            if "@" not in em:
                messages.error(request, "Invalid email format. Please enter a valid email address.")
                return render(request, 'pages/samples/register.html')

            if un == pw or un == pw:
                messages.error(request, "Username and password cannot be the same.")
                return render(request, 'pages/samples/register.html')

            if not cn:
                messages.error(request, "Please select a country.")
                return render(request, 'pages/samples/register.html')

            try:
                usr = User.objects.get(username=un)
                messages.error(request, "User already exists.")
                return render(request, 'pages/samples/register.html')
            except User.DoesNotExist:
                usr = User.objects.create_user(username=un, password=pw, first_name=na)
                usr.save()
                subject = "Welcome to our Data Visualization Website!"
                text = f"Dear {na},\n\nThank you for registering on our Data Visualization Website. We are excited to have you as a member of our community!\n\nAt Black Coffer, we provide powerful data visualization tools that allow you to explore and analyze data from various perspectives. With our charts and tables, you can gain valuable insights into your company's performance and make informed decisions.\n\nTo get started, simply log in to our website using your username and password.\n\nWe hope you have a great experience exploring your company's data!\n\nBest regards,\nThe Black Coffer Team"

                from_email = "vedant.tester.22@gmail.com"
                to_email = [str(em)]
                send_mail(subject, text, from_email, to_email)
                return redirect("login")
        else:
            return render(request, 'pages/samples/register.html')

def ulogout(request):
    logout(request)
    return redirect("login")


def error_404(request, exception=None):
    return render(request, 'pages/samples/error-404.html')

def error_500(request):
    return render(request, 'pages/samples/error-500.html')
