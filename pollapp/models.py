from django.db import models
from django.contrib.auth.models import User

class StudentModel(models.Model):
	question = models.CharField(max_length=300)
	op1 = models.CharField(max_length=100)
	op2 = models.CharField(max_length=100)
	op3 = models.CharField(max_length=100)
	op1c = models.IntegerField(default=0)
	op2c = models.IntegerField(default=0)
	op3c = models.IntegerField(default=0)
	dt = models.DateTimeField(auto_now_add=True)	
	created_by = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
	

	def __str__(self):
		return self.question