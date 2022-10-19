const { MessageEmbed, version } = require("discord.js")

const package = require('../../package.json')

module.exports = {
    name: "botstat",
    description: 'Envoi les stats du bot.',
    options: [],
    run: async(client, interaction) => {
        await interaction.deferReply()

        let embed = new MessageEmbed()
        .setColor('RANDOM')
        .addField('> > __Informations classiques__', 
        '> Bot allumé depuis <t:' + Math.round((Date.now() - client.uptime) / 1000) + ':R> (<t:' + Math.round((Date.now() - client.uptime) / 1000) + ':F>).\n> Ping `' + Math.floor(Math.round(client.ws.ping)) + 'ms`.\n> Github page https://github.com/TonyKun7/devland-bot')
        .addField('> > **__Informations version__**',
        '> Discord.js version: `v' + version + '`\n> Nodejs version: `' + process.version + "`\n> Bot version: `v" + package.version +"`")

        await interaction.editReply({embeds: [embed]})
    }
}