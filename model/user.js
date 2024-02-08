// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   userType: {
//     type: String,
//     enum: ['admin', 'agent'],
//     default: 'agent'
//   }
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['admin', 'agent'],
    default: 'agent'
  },
  extension: {
    type: String,
    required: function() {
      return this.userType === 'agent'; // Required only if userType is 'agent'
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
