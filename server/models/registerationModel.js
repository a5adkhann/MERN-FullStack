const mongoose = require("mongoose");

const registerationModel = new mongoose.Schema({
    name : String,
    email : String,
    password : String
})

module.exports = mongoose.model("Registeration", registerationModel);