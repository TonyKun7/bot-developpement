const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const {client} = require('../../index')
const {autoRole, guildMainID} = require('../../config.json')

client.on('ready', () => {
    /*let text = ""
    let arraySelect = []
    for(const role of autoRole){
        let roleGet = client.guilds.cache.get(guildMainID).roles.cache.get(role.id)
        text += "> " + role.emoji + roleGet.name + "\n"
        arraySelect.push({'label': roleGet.name, value: role.id, emoji: role.emoji})
    }
    let embed = new MessageEmbed()
    .setDescription('> > **__Selectionner les rôles notification__**\n\n' + text)
    let row = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
        .setCustomId('roleNotif')
        .setMaxValues(6)
        .setMinValues(0)
        .addOptions(arraySelect)
    )
    client.guilds.cache.get(guildMainID).channels.cache.get('1016753406645391440').send({embeds: [embed], components: [row]})*/
    console.log(client.user.username + " ready")
})