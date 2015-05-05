# Restful Django Angular Tutorial

**Description**

This is a simple project based on [Django](https://www.djangoproject.com/) and [AngularJS](https://angularjs.org/) using [Tastypie](http://tastypieapi.org/) to separate client and server side. Initially this project focused on a serverside only implementation (e.g. Django inline formsets - hence the formset naming) and was then expanded through Tastypie and AngularJS to add a decoupled client side via restful API. The data held is of 'Authors' and 'Books', where multiple Authors may have written multiple books and vice versa.

**Global Requirements**

    virtualenv ~1.11.16
    python ~2.7

**Deployment**

    virtualenv env

    source env/bin/activate

    pip install -r requirements.txt

    nodeenv -p

    cd formsettutorial/node/formsetproject

    npm install -g bower

    bower install

    cd ../../

    python manage.py migrate

    python manage.py createsuperuser

    python manage.py runserver

**Visit your browser @** http://127.0.0.1:8000/

**Leave virtualenv**

    deactivate
