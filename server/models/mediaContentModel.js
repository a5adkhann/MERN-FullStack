const mongoose = require("mongoose");

const mediaContentModel = new mongoose.Schema({
    Image : String
})

module.exports = mongoose.model("MediaContent", mediaContentModel);