const Discord = require('discord.js');

module.exports = {
    name: "simjoin",
    description: "simulates a join!",

    async run (bot, message, args) {
        if(message.author.id != "707166340800315414") return;
        bot.emit('guildMemberAdd', message.member);
    },
}