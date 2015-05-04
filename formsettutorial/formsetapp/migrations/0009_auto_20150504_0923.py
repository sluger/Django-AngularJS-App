# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formsetapp', '0008_auto_20150504_0915'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookauthor',
            name='author',
            field=models.ForeignKey(to='formsetapp.Author'),
        ),
        migrations.AlterField(
            model_name='bookauthor',
            name='book',
            field=models.ForeignKey(to='formsetapp.Book'),
        ),
    ]
