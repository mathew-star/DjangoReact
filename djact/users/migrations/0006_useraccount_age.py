# Generated by Django 5.0.3 on 2024-04-05 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_rename_is_admin_useraccount_is_staff_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='age',
            field=models.IntegerField(default=0),
        ),
    ]