from django.db import models

class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)

    def __unicode__(self):
        return self.title

class BookAuthor(models.Model):
    author = models.ForeignKey(Author)
    book = models.ForeignKey(Book)

    def __unicode__(self):
        return u'%s %s' % (self.author, self.book)
