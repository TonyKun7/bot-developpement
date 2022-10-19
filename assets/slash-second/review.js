const {
    MessageEmbed
} = require("discord.js")

const {
    guildMainID
} = require('../../config.json')

const {
    dataManipulation_move
} = require('../function')

function noteToEmoji(note){
    return note.toString().includes('.') ? '<:1_:1022251489701408768>'.repeat(Math.round(note)-1) + '<:2_:1022251279935877130>' : '<:1_:1022251489701408768>'.repeat(Math.round(note))
}

const data = require('../data.json')
module.exports = {
    name: "review",
    description: 'Permettre a votre bot d\'être ajouter au serveur.',
    options: [{
            name: 'id',
            description: 'L\'id du bot que vous souhaitez review.',
            type: 'STRING',
            required: true
        },
        {
            name: 'avis',
            description: 'Accepter ou non?',
            type: 'STRING',
            choices: [
                {
                    name: 'oui', value: 'true'
                },
                {
                    name: 'non', value: 'false'
                }
            ],
            required: true
        },
        {
            name: 'note',
            description: 'Noté le bot de 1 a 5.',
            type: 'STRING',
            choices: [
                { name: '0.5', value: "0.5" },
                { name: '1', value: "1" },
                { name: '1.5', value: "1.5" },
                { name: '2', value: "2" },
                { name: '2.5', value: "2.5" },
                { name: '3', value: "3" },
                { name: '3.5', value: "3.5" },
                { name: '4', value: "4" },
                { name: '4.5', value: "4.5" },
                { name: '5', value: "5" }
            ],
            required: true
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply()

        let bot = data.waiting.find(r => r.id === interaction.options.getString('id'))

        if(!bot)return interaction.editReply('le bot n\'a pas était trouver vérifié l\'id.')

        let embed = new MessageEmbed()
        .setDescription(interaction.options.getString('avis') == "true" ? 'Demande de vérification pour le bot ' + bot.username + ' (`' + bot.id + '`) est accepter' : 'Demande de vérification pour le bot ' + bot.username + ' (`' + bot.id + '`) est refuser')
        .addField('Note donner par le testeur : ', noteToEmoji(interaction.options.getString('note')))
        .addField('TAG du testeur :' , interaction.user.username)
        .setColor(interaction.options.getString('avis') === true ? 'RED' : 'GREEN')

        client.guilds.cache.get(guildMainID).channels.cache.get(interaction.options.getString('avis') == true ? '1016749836885831690' : '1016749092740808774').send({
            embeds: [embed]
        })

        dataManipulation_move(interaction.options.getString('id'), interaction.options.getString('avis'), interaction.options.getString('note'))

        return interaction.editReply('note envoyer!')
    }
}
