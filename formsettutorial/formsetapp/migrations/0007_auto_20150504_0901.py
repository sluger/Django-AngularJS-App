# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formsetapp', '0006_auto_20150502_1203'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookauthor',
            name='authors',
            field=models.OneToOneField(to='formsetapp.Author'),
        ),
        migrations.AlterField(
            model_name='bookauthor',
            name='books',
            field=models.OneToOneField(to='formsetapp.Book'),
        ),
    ]
