// const mongoose = require("mongoose");

// const assignmentSchema = new mongoose.Schema({
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   clientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Client",
//     required: true
//   },
//   agentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   }
// });

// const Assignment = mongoose.model("Assignment", assignmentSchema);

// module.exports = Assignment;

// const mongoose = require("mongoose");

// const assignmentSchema = new mongoose.Schema({
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   agentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   clients: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Client"
//   }]
// });

// const Assignment = mongoose.model("Assignment", assignmentSchema);

// module.exports = Assignment;

const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  }]
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const assignmentSchema = new Schema({
//   adminId: { type: Schema.Types.ObjectId, ref: 'User' },
//   agentId: { type: Schema.Types.ObjectId, ref: 'User' },
//   clients: [{ type: Schema.Types.ObjectId, ref: 'Client' }]
// });

// const Assignment = mongoose.model('Assignment', assignmentSchema);

// module.exports = Assignment;

