import express from "express";
import cors from "cors";
import routesUser from "../routes/usuarios.js";
import routesAuth from "../routes/auth.js";
import routesPeliculas from "../routes/peliculas.js";
import dbConnection from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      peliculas: '/api/peliculas',
      usuarios: '/api/usuarios'
    }
    //Conectar a la base de datos
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas de mi aplicación
    this.routes();
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    //Cors
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio público
    this.app.use( express.static('public') );
  }
  routes() {
    this.app.use(this.paths.auth, routesAuth);
    this.app.use(this.paths.peliculas, routesPeliculas);
    this.app.use(this.paths.usuarios, routesUser);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Ejecutándose en el puerto ", this.port);
    });
  }
}

export default Server;
