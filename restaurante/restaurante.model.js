const mongoose = require('mongoose');

const restauranteSchema = mongoose.Schema(
  {
    // campos
    nombre: { type: String, required: [true, 'Please provide a name for the restaurant'] },

    numerocel: { type: Number, required: [true, 'Please provide a phone number'] },

    categorias: [
      {
        type: String,
      },
    ],

    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'productos' }],

    numpedidos: { type: Number },

    address: { type: String, required: [true, 'Please provide address'] },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('restaurante', restauranteSchema);
