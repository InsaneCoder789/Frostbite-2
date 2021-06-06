const Discord = require('discord.js');

module.exports = {
    name: "play",
    aliases: ['p','play'],
    description: "play a song!",

    async run (bot, message, args) {
        const embed1 = new Discord.MessageEmbed()
        .setDescription( "You have to be connected to a voice channel before you can use this command!")
        .setColor("RED")
        if(!message.member.voice.channel) return message.reply(embed1);

        const music = args.join(" "); //.play <args (song name)>
        if(!music) return message.reply("Please provide a song!");

        await bot.distube.play(message, music)
    }
}