const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    guildId: String,
    cmds: Array
})

module.exports = mongoose.model('Commands', Schema)