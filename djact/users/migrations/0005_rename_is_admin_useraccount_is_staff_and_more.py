# Generated by Django 5.0.3 on 2024-04-01 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_useraccount_is_admin'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='is_admin',
            new_name='is_staff',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]
