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
curl --location --request GET 'http://localhost:8080/api/peliculas' 
```
Obtener película por id:
```
curl --location --request GET 'http://localhost:8080/api/peliculas/63f51e593c681ffaaa41c10a' 
```
Modificar película por id:
```
curl --location --request PUT 'http://localhost:8080/api/peliculas/63f51e593c681ffaaa41c10a'
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
    curl --location --request DELETE 'http://localhost:8080/api/peliculas/63f51e593c681ffaaa41c10a'
```
