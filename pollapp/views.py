from django.shortcuts import render,redirect,get_object_or_404
from .models import StudentModel
from .forms import StudentForm
from django.contrib import messages


def home(request):
	if request.user.is_authenticated:
		data = StudentModel.objects.all()
		return render(request,"home.html",{"data":data})
	else:
		return redirect("uhome") 	

def create(request):
	if request.method == "POST" and request.POST.get("sub"):
		qu = request.POST.get("question")
		op1 = request.POST.get("op1")
		op2 = request.POST.get("op2")
		op3 = request.POST.get("op3")
		try:
			if op1 == op2 or op1 == op3 or op2 == op3:
				fm = StudentForm()
				return render(request,"create.html",{"msg":"Options cannnot be the same","fm":fm})
			if len(qu)<5:
				fm = StudentForm()
				return render(request,"create.html",{"msg":"Question must be greater than 5 alphabets","fm":fm})
			else:
				usr = StudentModel.objects.get(question=qu)
				fm = StudentForm()
				return render(request,"create.html",{"msg":"Poll already Created","fm":fm})
		except StudentModel.DoesNotExist:
			data = StudentForm(request.POST)
			poll = data.save(commit=False)
			poll.created_by = request.user
			poll.save()
			fm = StudentForm()
			return render(request,"create.html",{"msg":"Poll Created","fm":fm})
	else:
		fm = StudentForm()
		return render(request,"create.html",{"fm":fm})
	
def vote(request,pk):
	try:
		data = StudentModel.objects.get(pk=pk)
		if request.method == "POST" and request.POST.get("vote"):
			if request.POST.get("option") == data.op1:
				data.op1c += 1	
			if request.POST.get("option") == data.op2:
				data.op2c += 1
			if request.POST.get("option") == data.op3:
				data.op3c += 1
			if request.POST.get("option") == None:
				return render(request,"vote.html",{"data":data,"msg":"select atleast one option"})
			else:
				data.save()
				return redirect("result",pk=pk)
		return render(request,"vote.html",{"data":data})
	except StudentModel.DoesNotExist:
		return redirect("home")

def result(request,pk=None):
	if pk is None:
		return redirect("home")
	try:
		data = StudentModel.objects.get(pk=pk)
		return render(request,"result.html",{"data":data})
	except StudentModel.DoesNotExist:
		return redirect("home")	

def delete(request,pk):
	poll = get_object_or_404(StudentModel, pk=pk)
	if request.user != poll.created_by:
		messages.error(request, "You are not authorized to delete this poll")
		return redirect("home")
	if request.method == "POST":
		poll.delete()
		messages.success(request, "Poll Deleted")
		return redirect("home")
	return render(request, "delete.html", {"poll": poll})

def pnf(request):
	return redirect("home")