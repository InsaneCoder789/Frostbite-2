const Discord = require('discord.js');

module.exports = {
    name: "queue",
    aliases: ['q','queue'],
    description: "check queue",

    async run (bot, message, args) {
        const embed1 = new Discord.MessageEmbed()
        .setDescription( "You have to be connected to a voice channel before you can use this command!")
        .setColor("RED")
        if(!message.member.voice.channel) return message.reply(embed1);

        const queue = bot.distube.getQueue(message);
        const embed2 = new Discord.MessageEmbed()
        .setTitle(`Song Queue of ${message.guild.name}`)
        .setDescription(`Current queue:\n${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`)
        .setColor("RED")
        .setFooter(`Requested By ${member.user}`)
        await message.channel.send(embed2);
    }
}