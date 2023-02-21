# movies-users 
API en Node.js (Express JS) donde un usuario puede registrarse, identificarse y gestionar sus películas.

## Running movies-users locally
Es una aplicación backend construida con node que permite crear, actualizar, eliminar y listar películas por parte del usuario. A su vez, también permite que un usuario pueda crear, actualizar o listar usuarios. El administrador será el único que pueda borrar usuarios.
Debemos crear una base de datos con MongoDB, podemos utilizar MongoDB Compass y configurar un archivo ".env", como ejemplo tenemos el archivo "envexample".
Tras crear la base de datos, podemos levantar la API con los siguientes comandos:

```
git clone https://github.com/gcastrogomez/movies-users
cd movies-users
npm install
node app
```

La aplicación es puro backend, por lo que tendremos que consumir los servicios mediante postman o algún cliente similar. No olvidemos generar un token y añadirlo en los Headers en cada una de nuestras peticiones.

Crear un usuario:
```
curl --location --request POST 'http://localhost:8080/api/usuarios' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "test4",
    "google": true,
    "nuevocampo": true,
    "correo": "test4@test.com",
    "password": "123456",
    "rol": "ADMIN_ROLE"
}'
```

Listar usuarios:
```
curl --location --request GET 'http://localhost:8080/api/usuarios?limite=5&desde=0'
```

Actualizar un usuario:
```
curl --location --request PUT 'http://localhost:8080/api/usuarios/63f527702c5bd565b213b31c' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "test5",
    "google": true,
    "correo": "test4@test.com",
    "password": "123456",
    "rol": "ADMIN_ROLE"
}'
```
Login de un usuario:
```
curl --location --request POST 'http://localhost:8080/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "correo": "test4@test.com",
    "password": "123456"
}'
```
Borrar un empleado:
```
curl --location --request DELETE 'http://localhost:8080/api/usuarios/63e4e15f0500dd60820819b0' \
--header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2Y1Mjc3MDJjNWJkNTY1YjIxM2IzMWMiLCJpYXQiOjE2NzcwMTEzMTAsImV4cCI6MTY3NzAyNTcxMH0.c7toO1sxDpA3yUNb1bn6xUO1JB0ZLsaSP9P-o7E-Xuc' \
--data-raw ''
```

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
