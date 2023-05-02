const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema(
  {
    // campos
    estado: {
      type: String,
      enum: ['Creado', 'Enviado', 'Aceptado', 'Recibido', 'En dirección', 'Realizado'],
    },

    productos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos ',
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Please provide a user ID'],
    },

    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'restaurantes',
    },

    address: { type: String, required: [true, 'Please provide a address'] },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('pedido', pedidoSchema);
