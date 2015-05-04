# Restful-Django-Angular-Tutorial

**Description**
This is a simple project based on [Django](https://www.djangoproject.com/) and [AngularJS](https://angularjs.org/) using [Tastypie](http://tastypieapi.org/) to separate client and server side. Initially this project focused on Django only (e.g. Inline formsets) and was later expanded through Tastypie and AngularJS to provide a decoupled client side via restful API.

**Global Requirements**

    virtualenv ~1.11.16
    python ~2.7

**Deployment**

    virtualenv env

    source env/bin/activate

    pip install -r requirements.txt

    nodeenv -p

    source nenv/bin/activate

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
