import { request, response } from "express";
import Pelicula from "../models/pelicula.js";
import jwtDecode from "jwt-decode";

const peliculasGet =  async(req = request, res = response) => {
    //comprueba que existan peliculas con su id
    const token = req.get('x-token');
    const payload = jwtDecode(token);
    const userId = payload.uid;
    const {categoria, nombre} = req.query;
    const query = {estado: true, usuario: userId};
    const [peliculas] = await Promise.all([
        Pelicula.find(query)
            .populate('usuario', 'nombre')
    ]);
    
    res.json({
        peliculas
    })
}

const peliculaGet =  async(req = request, res = response) => {
    const { id} = req.params;
    const pelicula = await Pelicula.findById(id)
                                    .populate('usuario','nombre');
    const token = req.get('x-token');
    const payload = jwtDecode(token);
    const userId = payload.uid;
    if (pelicula.usuario!==userId || !pelicula.estado) {
        return res.status(400).json({
            msg: `La película ${pelicula.nombre} no existe en su lista.`
        });
    }
    res.status(201).json(pelicula);
}


const peliculaPost = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const peliculaDB = await Pelicula.findOne({nombre});
    if (peliculaDB) {
        return res.status(400).json({
            msg: `La película ${peliculaDB.nombre} ya existe.`
        });
    }
    const datosPelicula = {
        nombre,
        categoria: req.body.categoria,
        usuario: req.usuario._id,
        estreno: req.body.estreno,
        portada: req.body.portada,
        fechaCreacion: Date.now(),
        fechaActualizacion: Date.now()
    }
    const pelicula = new Pelicula(datosPelicula);
    await pelicula.save();
    res.status(201).json(pelicula);
}

const peliculaPut = async(req = request, res = response) => {
    const {id} = req.params;
    const pelicula = await Pelicula.findById(id)
                                    .populate('usuario','nombre');
    const token = req.get('x-token');
    const payload = jwtDecode(token);
    const userId = payload.uid;
    if (pelicula.usuario!==userId) {
        return res.status(400).json({
            msg: `La película ${pelicula.nombre} no existe en su lista.`
        });
    }
    const {_id, usuario, fechaCreacion, ...datosActualizar} = req.body;
    datosActualizar.fechaActualizacion = Date.now();
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, datosActualizar, {new: true});
    res.json(peliculaActualizada);

}

const peliculaDelete = async (req=request, res= response) => {
    const {id} = req.params;
    const pelicula = await Pelicula.findById(id)
                                    .populate('usuario','nombre');
    const token = req.get('x-token');
    const payload = jwtDecode(token);
    const userId = payload.uid;
    if (pelicula.usuario!==userId) {
        return res.status(400).json({
            msg: `La película ${pelicula.nombre} no existe en su lista.`
        });
    }
    const peliculaEliminada = await Pelicula.findByIdAndUpdate(id, {estado: false}, { new: true});
    res.json( peliculaEliminada);
}



export {
    peliculaPost,
    peliculasGet,
    peliculaGet,
    peliculaPut, 
    peliculaDelete
};
