const mongoose = require("mongoose");
// const bcript = require("bcrypt-nodejs"); //za enkripciju
const config = require("../config/database");
const bcryptjs = require("bcryptjs");

//User Schema
const UserSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = (module.exports = mongoose.model("User", UserSchema));
//(ime modela: User, shema: UserSchema)

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  }); //hashiranje passworda, 10 rundi,
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
