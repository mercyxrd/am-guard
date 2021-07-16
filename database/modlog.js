const mongoose = require("mongoose");
const channel = new mongoose.Schema({
    guildID: String, 
    channel: String});
const MessageModel = (module.exports = mongoose.model("Kanal", channel));