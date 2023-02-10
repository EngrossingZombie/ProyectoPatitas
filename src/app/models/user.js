const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
    name: String,
    rut: String,
    region: String,
    comuna: String,
    foto: String,
    admin: String
  }
});

// generando un hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// verifica que la password sea válida
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// crea el modelo de usuario y lo exporta
module.exports = mongoose.model('User', userSchema);
