from django import forms
from .models import StudentModel

class StudentForm(forms.ModelForm):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.fields['question'].label = 'Enter question:'
		self.fields['op1'].label = 'Option 1:'
		self.fields['op2'].label = 'Option 2:'
		self.fields['op3'].label = 'Option 3:'
	
	question = forms.CharField(widget=forms.Textarea(attrs={'rows': 3,'resize':'none','placeholder':'Enter question here', 'style': 'font-size: 20px; font-weight: bold; color: #333;'}))
	op1 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter option 1','style': 'font-size: 20px; font-weight: bold; color: #333;'}))
	op2 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter option 2','style': 'font-size: 20px; font-weight: bold; color: #333;'}))
	op3 = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter option 3','style': 'font-size: 20px; font-weight: bold; color: #333;'}))
	class Meta:
		model = StudentModel
		fields = ["question","op1","op2","op3"]