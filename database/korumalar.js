const mongoose = require("mongoose");
const database = new mongoose.Schema({
    guildID: String, 
    davetEngel: Boolean, 
    kufurEngel: Boolean, 
    CapslockEngel: Boolean, 
    LinkEngel: Boolean, 
    EtiketEngel: Boolean,
    RolKoruma: Boolean,
    KanalKoruma: Boolean,
    serverKoruma: Boolean,
    banKoruma: Boolean,
    botKoruma: Boolean,
    JailRole:  { type: Array, default: [] }

});
const MessageModel = (module.exports = mongoose.model("Korumalar", database));