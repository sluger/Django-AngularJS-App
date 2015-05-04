from tastypie.resources import ModelResource
from tastypie import fields
from formsetapp.models import Book, Author, BookAuthor
from tastypie.authorization import Authorization

class BookResource(ModelResource):
    authors = fields.ToManyField('formsetapp.api.BookAuthorResource', 'bookauthor_set', null=True)
    class Meta:
        queryset = Book.objects.all()
        resource_name = 'book'
        authorization = Authorization()
        allowed_methods = ["get", "post", "put", "delete" ]
        always_return_data = True
        fields = [ "id", "title" ]

class AuthorResource(ModelResource):
    books = fields.ToManyField('formsetapp.api.BookAuthorResource', 'bookauthor_set', null=True)
    class Meta:
        queryset = Author.objects.all()
        resource_name = 'author'
        authorization = Authorization()
        allowed_methods = ["get", "post", "put", "delete" ]
        always_return_data = True
        fields = [ "id", "name" ]

class BookAuthorResource(ModelResource):
    book = fields.ToOneField(BookResource, 'book', null=True)
    author = fields.ToOneField(AuthorResource, 'author', null=True)

    class Meta:
        queryset = BookAuthor.objects.all()
        resource_name = 'book_author'
        authorization = Authorization()
        allowed_methods = ["get", "post", "put", "delete", "patch" ]
        always_return_data = True
        fields = [ "book", "author"]
