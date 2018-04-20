const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  age: Number,
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;