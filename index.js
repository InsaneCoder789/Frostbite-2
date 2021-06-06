const Discord = require('discord.js');
const bot = new Discord.Client();
const {MessageEmbed} = require('discord.js')
const mongoose = require('mongoose')
 mongoose.connect('mongodb+srv://Insanecoder789:Rahul@5111@cluster0.47kul.mongodb.net/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false 
}).then(console.log('Connected to mongo!'))



const { token } = require('./config.json');

const { readdirSync, read } = require('fs');

const { join } = require('path');

//levels
const Levels = require('discord-xp');
Levels.setURL("mongodb+srv://Insanecoder789:Rahul@5111@cluster0.47kul.mongodb.net/test")



const config = require('./config.json');
bot.config = config;


bot.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');
const Timeout = new Discord.Collection();

//-----

const { GiveawaysManager } = require('discord-giveaways')
bot.giveawaysManager = new GiveawaysManager(bot, {
    storage: "./giveaway.json",
    updateCountdownEvery: 5000, //1000ms = 1s
    default: {
        botsCanWin: true,
        exemptPermissions: [],
        embedColor: "#3CFFFB",
        reaction: "🎉"
    }
});

const prefix = 'fb!';
//this prefix can be what ever you want ;)

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}

bot.on("error", console.error);


//------------------------------------------------------------------------------
bot.on('ready', () => {
    console.log('Bot is ready!');
})
//------------------------------------------------------------------------------

bot.on("message", async (message) => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return; //optional#

     //Levels
     const randomAmountOfXp = Math.floor(Math.random() * 10) + 1;
     const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
     if (hasLeveledUp) {
         const user = await Levels.fetch(message.author.id, message.guild.id);
         message.channel.send(`${message.author}, Congratulations! You have leveled up to **${user.level}**!`);
     }
     //

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        if (command) {
            if(command.cooldown) {
                if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please Wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` Before using this command again!`);
                command.run(bot, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(bot, message, args);
        }
    }
})




//--------------------------------------------------------------------------------------------------------------------\\
const distube = require('distube');
bot.distube = new distube(bot, { searchSongs: false, emitNewSongOnly: true })
bot.distube
    .on('playSong', (message, queue, song) => message.channel.send(`Playing ${song.name} - \`${song.formattedDuration}\ `))
    .on('addSong', (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
    ))
    .on('error', (message, e) => {
		//console.error(e)
		message.channel.send(`An error encountered: ${e}`)
	})

    


//--------------------------------------------------------------------------------------------------------------------\\
const WelcomeSchema = require('./Schema/welcome-schema');

bot.on("guildMemberAdd", async (member, guild) => {
    WelcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
        if(!data) return;

        const user = member.user;
        const channel = member.guild.channels.cache.get(data.channelId);
        const message = require('discord.js')
        const Canvas = require("discord-canvas"),
  Discord = require("discord.js");
 
const image = await new Canvas.Welcome()
.setUsername(`${member.user.username}`)
.setDiscriminator(member.user.discriminator)
.setAvatar(member.user.displayAvatarURL({dynamic: true, format: 'png'}))
.setMemberCount(member.guild.memberCount)
.setGuildName(`${member.guild.name}`)
.setColor("border", "#8015EA")
.setColor("username-box", "#8015EA")
.setColor("discriminator-box", "#8015EA")
.setColor("message-box", "#8015EA")
.setColor("title", "#8015EA")
.setColor("avatar", "#8015EA")
.setBackground("http://clipart-library.com/images/yikr9jXET.jpg")
.toAttachment();

const attachment = new Discord.MessageAttachment(image.toBuffer(), "WelcomeImage.png");
channel.send(attachment);
channel.send(` Welcome ${user} To ${member.guild.name}`)

})
})
//--------------------------------------------------------------------------------------------------------------------\\

const LeaveSchema = require('./Schema/leave-schema');
const Song = require('distube/typings/Song');

bot.on("guildMemberRemove", async (member, guild) => {
    LeaveSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
        if(!data) return;

        const user = member.user;
        const channel = member.guild.channels.cache.get(data.channelId);
        const message = require('discord.js')

channel.send(` Thank You ${user} For Staying at ${member.guild.name}`)

})
})
//--------------------------------------------------------------------------------------------------------------------\\
bot.on("guildMemberAdd", async (member) => {
    console.log(member.user.tag); 
})

//--------------------------------------------------------------------------------------------------------------------\\
bot.on("guildMemberRemove", async (member) => {
    console.log(member.user.tag); 
})
bot.login(token);