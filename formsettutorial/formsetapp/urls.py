from django.conf.urls import patterns, include, url
from tastypie.api import Api
from formsetapp.api import AuthorResource, BookResource, BookAuthorResource
from django.contrib import admin
from . import views

v1_api = Api(api_name='v1')
v1_api.register(AuthorResource())
v1_api.register(BookResource())
v1_api.register(BookAuthorResource())

urlpatterns = patterns('',

    url(r'^$', views.index, name='index'),
    url(r'^authors$', views.authors, name='authors'),
    url(r'^authors/new$', views.AddAuthorView.as_view(), name='create_author'),
    url(r'^authors/edit/(?P<id>\d+)$', views.EditAuthorView.as_view(), name='edit_author'),
    url(r'^authors/del/(?P<id>\d+)$', views.author_delete, name='author_delete'),

    url(r'^books$', views.books, name='books'),
    url(r'^books/new$', views.AddBookView.as_view(), name='create_book'),
    url(r'^books/edit/(?P<id>\d+)$', views.EditBookView.as_view(), name='edit_book'),
    url(r'^books/del/(?P<id>\d+)$', views.book_delete, name='book_delete'),

    (r'^api/', include(v1_api.urls)),
)
