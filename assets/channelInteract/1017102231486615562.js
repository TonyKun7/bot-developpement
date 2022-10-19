const {client} = require('../../index')
const { MessageEmbed } = require("discord.js")

module.exports = (message) => {
    let embed  = new MessageEmbed()
    .setTitle('<:moderator:1013891579225854033> __RÉPONSE CODE__')
    .setDescription(`${message.content.toString()}`)
    .addField('<:DiscordMessageSendArrow:1013206759873192077> RÉPONDU PAR', message.member.toString())

    return client.channels.cache.get('1016380802520600617').send({embeds: [embed]}).then(r => message.delete())
}