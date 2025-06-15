const mongoose = require('mongoose');

const OfertaTrabajoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título de la oferta es obligatorio'],
        trim: true
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción de la oferta es obligatoria'],
        trim: true
    },
    requisitos: [{
        type: String,
        trim: true
    }],
    salario: {
        minimo: { type: Number, required: false },
        maximo: { type: Number, required: false },
        moneda: { type: String, default: 'EUR', trim: true },
        tipo: { type: String, enum: ['anual', 'mensual', 'por_hora'], required: false }
    },
    ubicacion: {
        type: String,
        required: [true, 'La ubicación es obligatoria'],
        trim: true
    },
    tipo_empleo: {
        type: String,
        enum: ['Jornada Completa', 'Media Jornada', 'Contrato', 'Temporal', 'Prácticas'],
        required: [true, 'El tipo de empleo es obligatorio']
    },
    id_empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: [true, 'La empresa asociada es obligatoria']
    },
    id_admin_publicador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del administrador que publicó la oferta es obligatorio']
    },
    fecha_limite_aplicacion: {
        type: Date,
        required: false
    },
    estado: {
        type: String,
        enum: ['activa', 'cerrada', 'borrador'],
        default: 'activa'
    }
}, {
    timestamps: true
});

OfertaTrabajoSchema.index({ titulo: 'text', descripcion: 'text', ubicacion: 'text' });
OfertaTrabajoSchema.index({ tipo_empleo: 1 });
OfertaTrabajoSchema.index({ id_empresa: 1 });
OfertaTrabajoSchema.index({ id_admin_publicador: 1 });

module.exports = mongoose.model('OfertaTrabajo', OfertaTrabajoSchema);
