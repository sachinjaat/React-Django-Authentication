# Generated by Django 3.1.4 on 2021-03-22 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210322_1438'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]