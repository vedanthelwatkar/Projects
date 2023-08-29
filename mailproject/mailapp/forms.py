from django import forms
from .models import MailModel

class MailForm(forms.ModelForm):
    class Meta:
        model = MailModel
        fields = ['Mail']
        labels = {'Mail': ''}
        widgets = {'Mail': forms.Textarea(attrs={'placeholder': 'Enter the mail content you want to check', 
                                                 'style': 'font-size: 24px; opacity: 1;'})
        }

