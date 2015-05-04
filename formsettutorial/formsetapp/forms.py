from django import forms
from django.forms.models import inlineformset_factory
from .models import Author, Book, BookAuthor

class AuthorForm(forms.ModelForm):
    class Meta:
        model = Author
        fields = '__all__'

class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ('title',)

class BookAuthorForm(forms.ModelForm):
    class Meta:
        model = BookAuthor
        fields = '__all__'

BookFormSet = inlineformset_factory(Author, BookAuthor, fields=('book',))
AuthorFormSet = inlineformset_factory(Book, BookAuthor, fields=('author',))
