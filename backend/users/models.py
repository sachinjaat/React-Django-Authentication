from django.db import models
from django.db.models import Model
# Create your models here.
  
class LoginHistoryModel(Model):
    ip_address = models.GenericIPAddressField()
    logged_in_user_id = models.IntegerField()
# Create your models here.
