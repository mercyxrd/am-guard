const mongoose = require("mongoose");
const channel = new mongoose.Schema({
    WhiteListMembers:  { type: Array, default: [] },
    WhiteListRoles:  { type: Array, default: [] },
    WhiteListChannels:  { type: Array, default: [] },
    ServerID: { type: String, default: '' },
    FiltredWords:  { type: Array, default: [] },
});
const MessageModel = (module.exports = mongoose.model("whitelist", channel));