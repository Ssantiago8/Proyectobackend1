const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    // campos
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'Email address is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    firstname: { type: String, required: [true, 'Please provide a name'] },

    secondname: { type: String, required: [true, 'Please provide a second name'] },

    password: { type: String, required: [true, 'Please provide a password'] },

    numerocel: { type: Number, required: [true, 'Please provide a phone number'] },

    tipo: {
      type: String,
      enum: ['cliente', 'admin', 'domiciliario'],
      required: [true, 'Please select a user type'],
    },

    pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pedidos' }],

    address: { type: String },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('user', userSchema);
