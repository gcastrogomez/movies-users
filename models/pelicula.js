import { Schema, model } from 'mongoose';

const PeliculaSchema = Schema({
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre de la película es obligatorio'],
    },
    estreno: {
        type: Number,
        required: [true, 'El año de estreno es obligatoria']
    },
    portada: { // Mediante una URL sería más rápido, por eso es String
        type: String,
        required: [true, 'Indique el enlace o link con la portada de la película']
    },
    fechaCreacion: {
        type: Date,
        required: [true, 'La fecha de creación es obligatoria']
    },
    fechaActualizacion: {
        type: Date,
        required: [true, 'La fecha de actualizacion es obligatoria']
    },
    categoria: {
        type: [String],
        required: [true, 'La categoría o categorías son obligatorias'],
        enum: ['Terror', 'Suspense', 'Romance', 'Accion', 'Fantasia', 'Comedia', 'Aventura', 'Drama']

    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});

PeliculaSchema.methods.toJSON = function () {
    const {__v, estado, ...pelicula} = this.toObject();
    return pelicula;
}

export default model('Pelicula', PeliculaSchema);