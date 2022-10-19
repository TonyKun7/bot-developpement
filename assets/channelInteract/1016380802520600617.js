const { MessageEmbed } = require("discord.js")

module.exports = (message) => {
    let embed  = new MessageEmbed()
    .setTitle('<:DiscordMessageSendArrow:1013206759873192077> __DEMANDE DE CODE__')
    .setDescription(`${message.content.toString()}`)
    .addField('<:DiscordMessageSendArrow:1013206759873192077> DEMANDÉ PAR', message.member.toString())

    return message.channel.send({embeds: [embed]}).then(r => message.delete())
}
