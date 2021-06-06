const Discord = require('discord.js');
const Schema = require('../../Schema/leave-schema');

module.exports = {
    name: "setleave",
    aliases: ['lchannelset','leavechannelset'],
    description: "sets a Leave channel!",

    async run (bot, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You cannot use this command!");

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply("Please specify a channel you would like to be your Leave channel!");

        Schema.findOne({ guildId: message.guild.id }, async (err, data) => {
            if (data){
                data.channelId = channel.id;
                data.save();
            } else {
                new Schema({
                    guildId: message.guild.id,
                    channelId: channel.id,
                }).save();
            }
            message.reply(`New Leave channel is now set as: ${channel}!`);
        })
    }
}