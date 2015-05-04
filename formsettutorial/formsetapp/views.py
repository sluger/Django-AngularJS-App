from django.views.generic import CreateView, UpdateView
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_protect
from .models import Author, Book
from .forms import AuthorForm, BookFormSet, BookForm, AuthorFormSet

'''
Serverside Django views, not needed for restful services. The tutorial
was built upon formset views at first.
'''

class AddAuthorView(CreateView):
    template_name = 'formsetapp/create_author.html'
    form_class = AuthorForm

    def get_context_data(self, **kwargs):
        context = super(AddAuthorView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = BookFormSet(self.request.POST)
        else:
            context['formset'] = BookFormSet()
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        if formset.is_valid():
            self.object = form.save()
            formset.instance = self.object
            formset.save()
            return redirect('authors')
        else:
            return self.render_to_response(self.get_context_data(form=form))

class EditAuthorView(UpdateView):
    template_name = 'formsetapp/edit_author.html'
    form_class = AuthorForm

    def get_object(self, queryset=None):
        obj = Author.objects.get(id=self.kwargs['id'])
        return obj

    def get_context_data(self, **kwargs):
        context = super(EditAuthorView, self).get_context_data(**kwargs)

        if self.request == 'POST':
            context['formset'] = BookFormSet(self.request.PUT, instance=self.object)
        else:
            context['formset'] = BookFormSet(instance=self.object)
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        print context
        formset = context['formset']
        if formset.is_valid():
            #self.object = form.save()
            #formset.instance = self.object
            form.save()
            formset.save()
            return redirect('authors')
        else:
            #return self.render_to_response(self.get_context_data(form=form))
            return super(EditAuthorView, self).form_valid(form)

def authors(request, template_name='formsetapp/authors.html'):
    authors = Author.objects.all()
    context = {}
    context['object_list'] = authors
    return render(request, template_name, context)

def author_delete(request, id, template_name='formsetapp/author_confirm_delete.html'):
    author = get_object_or_404(Author, id=id)
    if request.method=='POST':
        author.delete()
        return redirect('authors')
    return render(request, template_name, {'author':author})

class AddBookView(CreateView):
    template_name = 'formsetapp/create_book.html'
    form_class = BookForm

    def get_context_data(self, **kwargs):
        context = super(AddBookView, self).get_context_data(**kwargs)
        if self.request.POST:
            context['formset'] = BookFormSet(self.request.POST)
        else:
            context['formset'] = BookFormSet()
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        formset = context['formset']
        if formset.is_valid():
            self.object = form.save()
            formset.instance = self.object
            formset.save()
            return redirect('books')
        else:
            return self.render_to_response(self.get_context_data(form=form))

class EditBookView(UpdateView):
    template_name = 'formsetapp/edit_book.html'
    form_class = BookForm

    def get_object(self, queryset=None):
        obj = Book.objects.get(id=self.kwargs['id'])
        return obj

    def get_context_data(self, **kwargs):
        context = super(EditBookView, self).get_context_data(**kwargs)

        if self.request == 'POST':
            context['formset'] = AuthorFormSet(self.request.PUT, instance=self.object)
        else:
            context['formset'] = AuthorFormSet(instance=self.object)
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        print context
        formset = context['formset']
        if formset.is_valid():
            #self.object = form.save()
            #formset.instance = self.object
            form.save()
            formset.save()
            return redirect('authors')
        else:
            #return self.render_to_response(self.get_context_data(form=form))
            return super(EditBookView, self).form_valid(form)

def books(request, template_name='formsetapp/books.html'):
    books = Book.objects.all()
    context = {}
    context['object_list'] = books
    return render(request, template_name, context)

def book_delete(request, id, template_name='formsetapp/book_confirm_delete.html'):
    book = get_object_or_404(Book, id=id)
    if request.method=='POST':
        book.delete()
        return redirect('books')
    return render(request, template_name, {'book':book})

def index(request, template_name='formsetapp/index.html'):
    return render(request, template_name)
