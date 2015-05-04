# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formsetapp', '0004_auto_20150502_1144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='id',
            field=models.IntegerField(serialize=False, primary_key=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='id',
            field=models.IntegerField(serialize=False, primary_key=True),
        ),
    ]
