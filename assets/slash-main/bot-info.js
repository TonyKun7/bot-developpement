const { MessageEmbed } = require('discord.js')
const data = require('../data.json')

function noteToEmoji(note){
    return note.toString().includes('.') ? '<:1_:1022251489701408768>'.repeat(Math.round(note)-1) + '<:2_:1022251279935877130>' : '<:1_:1022251489701408768>'.repeat(Math.round(note))
}

module.exports = {
    name: 'bot-info',
    description: 'Permettre d\'avoir des informations sur un bot vérifier ou prochainement vérifié du serveur',
    options: [{
        name: 'id',
        description: 'id du bot que vous souhaitez avoir les information',
        type: 'STRING',
        required: true
    }],
    run: async(client, interaction) => {
        await interaction.deferReply()

        let embed = new MessageEmbed()
        .setColor('AQUA')

        if(!data.waiting.find(x => x.id == interaction.options.getString('id')) && !data.accept.find(x => x.id == interaction.options.getString('id')) && !data.reject.find(x => x.id == interaction.options.getString('id')))return interaction.editReply('Je n\'ai pas trouver le bot dans ma base de donné.')
        else {
            let bot = data.waiting.find(x => x.id == interaction.options.getString('id')) || data.accept.find(x => x.id == interaction.options.getString('id')) || data.reject.find(x => x.id == interaction.options.getString('id'))
            if(data.waiting.find(x => x.id == interaction.options.getString('id')))embed.setTitle('Le bot attend ça vérification').setDescription('> Le bot: `' + bot.username + "` (ID: `" + bot.id + "`)\n> Auteur de la demande de vérification: `" + client.users.cache.get(bot.author).username + "` (ID: `" + bot.author + "`)\n> Lien / prefix: [URL](" + bot.link+") | " + bot.prefix + "\n> Position actuelle dans la file: " + (data.waiting.map((x) => x.id).indexOf(bot.id)+1))
            else if(data.accept.find(x => x.id == interaction.options.getString('id')))embed.setTitle('Le bot a effectuer ça vérification, et a était accepter sur le serveur').setDescription('> Le bot: `' + bot.username + "` (ID: `" + bot.id + "`)\n> Auteur de la demande de vérification: `" + client.users.cache.get(bot.author).username + "` (ID: `" + bot.author + "`)\n> Lien / prefix: [URL](" + bot.link+") | " + bot.prefix + "\n> Note donné au bot: " + (bot.opinion))
            else if(data.reject.find(x => x.id == interaction.options.getString('id')))embed.setTitle('Le bot a effectuer ça vérification, et a était rejeter sur le serveur').setDescription('> Le bot: `' + bot.username + "` (ID: `" + bot.id + "`)\n> Auteur de la demande de vérification: `" + client.users.cache.get(bot.author).username + "` (ID: `" + bot.author + "`)\n> Lien / prefix: [URL](" + bot.link+") | " + bot.prefix + "\n> Note donné au bot: " + (bot.opinion))
            return interaction.editReply({embeds: [embed]})
        }
    }
}