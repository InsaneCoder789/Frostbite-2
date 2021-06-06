const Discord = require('discord.js');
const MessageEmbed = require('discord.js')
module.exports = {
    name: "loop",
    aliases: ['loop', 'repeat', 'lp'],
    description: "loops throught current song",

    async run (bot, message, args) {
        const embed1 = new Discord.MessageEmbed()
        .setDescription( "You have to be connected to a voice channel before you can use this command!")
        .setColor("RED")
        if(!message.member.voice.channel) return message.reply(embed1);

        await bot.distube.setRepeatMode(message, parseInt(args[0]));
        const embed2 = new Discord.MessageEmbed()
        .setTitle("Looping through current song!")
        .setColor("RANDOM")
        await message.channel.send(embed2);
    }
}