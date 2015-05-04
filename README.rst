Requirements:
virtualenv
python

Deployment:
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

http://127.0.0.1:8000/


API usage examples
curl http://localhost:8000/formsetapp/api/v1/book/
curl --dump-header - -H "Content-Type: application/json" -X POST --data '{"title": "post_create_api_book_"}' http://localhost:8000/api/v1/book/
curl --dump-header - -H "Content-Type: application/json" -X PUT --data '{"title": "put_update_api_book"}' http://localhost:8000/api/v1/book/6/
curl --dump-header - -H "Content-Type: application/json" -X PATCH --data '{"title": "patch_update_api_book"}' http://localhost:8000/api/v1/book/6/
curl --dump-header - -H "Content-Type: application/json" -X PUT --data '{"objects": [{"title": "new book 1"},{"title": "new book 2"},{"title": "new book 3"}]}' http://localhost:8000/api/v1/book/
curl --dump-header - -H "Content-Type: application/json" -X DELETE  http://localhost:8000/api/v1/book/7/
curl --dump-header - -H "Content-Type: application/json" -X PATCH --data '{"objects": [{"title": "new book 1"},{"title": "new book 2"},{"title": "new book 3"}], "deleted_objects": ["http://localhost:8000/api/v1/book/10/"]}'  http://localhost:8000/formsetapp/api/v1/book/

deactivate
