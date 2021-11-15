const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Userschema = new Schema({
  prenom: {
    type: String,
    required: true,
},

  nom: {
    type: String,
    required: true,
},

  telephone: {
    type: String,
},

  email: {
    type: String,
    required: true,
},

  password: {
      type: String,
      required: true,
  }
  

});

const User = mongoose.model('user', Userschema);

module.exports = User;
