# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('formsetapp', '0007_auto_20150504_0901'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookauthor',
            old_name='authors',
            new_name='author',
        ),
        migrations.RenameField(
            model_name='bookauthor',
            old_name='books',
            new_name='book',
        ),
    ]
