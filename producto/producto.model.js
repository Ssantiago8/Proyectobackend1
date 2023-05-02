const mongoose = require('mongoose');

const productoSchema = mongoose.Schema(
  {
    // campos
    nombre: { type: String, required: [true, 'Please provide a name for the product'] },

    descripcion: { type: String, required: [true, 'Please provide a desc for the product'] },

    categorias: [
      {
        type: String,
        required: true,
      },
    ],

    restaurante: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurantes' },

    precio: { type: Number, required: [true, 'Please put some price'] },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('producto', productoSchema);
