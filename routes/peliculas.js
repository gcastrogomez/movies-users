import Router from "express";
import { check } from "express-validator";

import { validarJWT } from "../middlewares/validar-jwt.js";
import validarCampos from "../middlewares/validar-campos.js";
import { 
  peliculaDelete, 
  peliculaGet, 
  peliculaPost, 
  peliculaPut, 
  peliculasGet } from "../controllers/peliculas.controller.js";
import { existePelicula } from "../helpers/db-validators.js";

const router = Router();

//todas las peliculas
router.get("/", [
    validarJWT
], peliculasGet);

//una pelicula por su id
router.get("/:id", [
    validarJWT,
    check('id', 'No es un id de mongoDB válido').isMongoId(),
    check('id').custom(existePelicula),
    validarCampos
], peliculaGet);

//crear pelicula
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "La o las categorías son obligatorias").not().isEmpty(),
    check('categoria', 'La categoria debe ser Terror, Suspense, Romance, Accion, Fantasia, Comedia, Aventura y/o Drama').isIn(['Terror', 'Suspense', 'Romance', 'Accion', 'Fantasia', 'Comedia', 'Aventura', 'Drama']),
    check('estreno','Indique el año de estreno de la película').not().isEmpty(),
    check('portada','Introduzca un enlace o link con la imagen de portada de la película').not().isEmpty(),
    check('portada',),
    validarCampos
  ], peliculaPost
);

//actualizar pelicula
router.put("/:id", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "La o las categorías son obligatorias").not().isEmpty(),
    check('categoria', 'La categoria debe ser Terror, Suspense, Romance, Accion, Fantasia, Comedia, Aventura y/o Drama').isIn(['Terror', 'Suspense', 'Romance', 'Accion', 'Fantasia', 'Comedia', 'Aventura', 'Drama']),
    check('estreno','Indique el año de estreno de la película').not().isEmpty(),
    check('portada','Introduzca un enlace o link con la imagen de portada de la película').not().isEmpty(),
    check('id', 'No es un id de mongoDB válido').isMongoId(),
    check('id').custom(existePelicula),
    validarCampos
], peliculaPut);

//borrar pelicula
router.delete("/:id", [
    validarJWT,
    check('id', 'No es un id de mongoDB válido').isMongoId(),
    check('id').custom(existePelicula),
    validarCampos
], peliculaDelete);

export default router;
