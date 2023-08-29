from django.db import models

class MailModel(models.Model):
    Mail = models.CharField(max_length=500)
