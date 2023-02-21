# movies-users 
API en Node.js (Express JS) donde un usuario puede registrarse, identificarse y gestionar sus películas.

## Running movies-users locally
Es una aplicación backend construida con node que permite crear, actualizar, eliminar y listar películas por parte del usuario. A su vez, también permite que un administrador pueda crear, actualizar, eliminar o listar usuarios.
Debemos crear una base de datos con MongoDB, podemos utilizar MongoDB Compass y configurar un archivo ".env", como ejemplo tenemos el archivo "envexample".
Tras crear la base de datos, podemos levantar la API con los siguientes comandos:

```
git clone https://github.com/gcastrogomez/movies-users
cd movies-users
npm install
node app
```

La aplicación es puro backend, por lo que tendremos que consumir los servicios mediante postman o algún cliente similar. No olvidemos generar un token y añadirlo en los Headers en cada una de nuestras peticiones.

Crear una película:

```
curl --location --request POST 'http://localhost:8080/api/peliculas' \
--header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2U0ZTUzZGNjMjMzNTQ2YjI0ZjEzM2UiLCJpYXQiOjE2NzcwMDgzNTgsImV4cCI6MTY3NzAyMjc1OH0.ohgy6fI60z8GqwJkmNV3UI4ly8nCD8bg8ivoC2_Qykk' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "usuario": "63e4e53dcc233546b24f133e",
    "nombre": "INTERSTELLAR",
    "estreno": 2014,
    "portada": "https://pics.filmaffinity.com/Interstellar-306936708-large.jpg",
    "fechaCreacion": "2023-02-21T19:41:13.242Z",
    "fechaActualizacion": "2023-02-21T19:41:13.242Z",
    "categoria": [
        "Accion",
        "Fantasia",
        "Drama"
    ],
    "_id": "63f51e593c681ffaaa41c10a"
}
```

Listar películas:
```
curl --location --request GET 'http://localhost:8080/api/peliculas' \
--header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2U0ZTUzZGNjMjMzNTQ2YjI0ZjEzM2UiLCJpYXQiOjE2NzcwMDgzNTgsImV4cCI6MTY3NzAyMjc1OH0.ohgy6fI60z8GqwJkmNV3UI4ly8nCD8bg8ivoC2_Qykk' 
```
Obtener película por id:
```
curl --location --request GET 'http://localhost:8080/api/peliculas/63f51e593c681ffaaa41c10a' \
--header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2U0ZTUzZGNjMjMzNTQ2YjI0ZjEzM2UiLCJpYXQiOjE2NzcwMDgzNTgsImV4cCI6MTY3NzAyMjc1OH0.ohgy6fI60z8GqwJkmNV3UI4ly8nCD8bg8ivoC2_Qykk' 
```
Modificar película por id:
```
curl --location --request PUT 'http://localhost:8080/api/peliculas/63f51e593c681ffaaa41c10a' \
--header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2U0ZTUzZGNjMjMzNTQ2YjI0ZjEzM2UiLCJpYXQiOjE2NzY5OTkyMDYsImV4cCI6MTY3NzAxMzYwNn0.FESNX64ATXNXmRNnqrCpt5fIuTnDn9OpEYarTf-iRYM' \
	--header 'Content-Type: application/json' \
	--data-raw '{
    "nombre": "Interstellar",
    "categoria": [
        "Accion",
        "Fantasia"
    ],
    "estreno": 2014,
    "portada": "https://pics.filmaffinity.com/Interstellar-306936708-large.jpg"
}
```
Eliminar una pelicula (borrado lógico):
```
    curl --location --request DELETE 'http://localhost:8080/api/peliculas/63f51e593c681ffaaa41c10a' \
--header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2U0ZTUzZGNjMjMzNTQ2YjI0ZjEzM2UiLCJpYXQiOjE2NzY5OTkyMDYsImV4cCI6MTY3NzAxMzYwNn0.FESNX64ATXNXmRNnqrCpt5fIuTnDn9OpEYarTf-iRYM'
```
