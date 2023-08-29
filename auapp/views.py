from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import login,logout,authenticate
from django.core.mail import send_mail

def uhome(request):
	if request.user.is_authenticated:
		return redirect('home')
	else:
		if request.method=="POST":
			un = request.POST.get("un")
			pw = request.POST.get("pw")	
			usr = authenticate(username=un,password=pw)
			if usr is None:
				return render(request,"uhome.html",{"msg":"invalid username/password"})	
			else:
				login(request,usr)
				return redirect("home")
		else:
			return render(request,"uhome.html")

def signup(request):
	if request.user.is_authenticated:
		return redirect("home")
	else:
		if request.method=="POST":
			un = request.POST.get("un")
			pw1 = request.POST.get("pw1")	
			pw2 = request.POST.get("pw2")
			if len(un) < 6:
				return render(request,"signup.html",{"msg":"username must be more than 6 letters"})
			if len(pw1) < 6:
				return render(request,"signup.html",{"msg":"password must be more than 6 letters"})
			if un == pw1 or un == pw2:
				return render(request,"signup.html",{"msg":"username and password cannot be same"})
			if pw1 == pw2:
				try:
					usr = User.objects.get(username=un)
					return render(request,"signup.html",{"msg":"user already exists"})	
				except User.DoesNotExist:
					usr = User.objects.create_user(username=un,password=pw1)
					usr.save()
					subject = "Welcome to our Voting Website"
					text = "Here you can vote for anyone anonymously"
					from_email = "vedant.tester.22@gmail.com"
					to_email = [str(un)]
					send_mail(subject,text,from_email,to_email)
					return redirect("uhome")
			else:
				return render(request,"signup.html",{"msg":"passwords do not match"})	
		else:
			return render(request,"signup.html")

def ulogout(request):
	logout(request)
	return redirect("uhome")

def cp(request):
	if request.user.is_authenticated:
		if request.method == "POST":
			pw1 = request.POST.get("pw1")	
			pw2 = request.POST.get("pw2")	
			if pw1 == pw2:
				try:
					usr = User.objects.get(username=request.user.username)
					usr.set_password(pw1)
					usr.save()
					return redirect("uhome")
				except User.DoesNotExist:
					return render(request,"cp.html",{"msg":"user does not exist"})
			else:
				return render(request,"cp.html",{"msg":"passwords do not match"})
		else:
			return render(request,"cp.html")
	else:
		return redirect("uhome")

