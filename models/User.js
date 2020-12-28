const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// import mongoose from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

// passportLocalMongoose 적용함.
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

const model = mongoose.model("User", UserSchema);
//export default model;
module.exports = model;