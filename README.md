# simple-crud-api

Приложение работает на последней версии NodeJs.

Перед запуском приложение выполните команду npm run dev.
После этого можно использовать проверить работу сервера. Я использовал Postman.

GET
Для получения списка людей используем эндпоит http://localhost:4000/person

Для получение одного человека http://localhost:4000/person/{id}

POST
Для добавления в список нового человека http://localhost:4000/person и модель

{
    "name": "name",
    "age": 777",
    "hobbies": ["hobbi"]
}

PUT
Для изменения записи о человеке http://localhost:4000/person/{id} и модель

{
    "name": "name",
    "age": 777",
    "hobbies": ["hobbi"]
}

DELETE
Для удаления человека из списка http://localhost:4000/person/{id}