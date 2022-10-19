const {
    MessageEmbed
} = require("discord.js")

const {
    guildMainID
} = require('../../config.json')

const {
    getUser,
    dataManipulation_add,
    dataManipulation_delete
} = require('../function')

const data = require('../data.json')
module.exports = {
    name: "add-bot",
    description: 'Permettre a votre bot d\'être ajouter au serveur.',
    options: [{
            name: 'id',
            description: 'L\'id du bot que vous souhaitez ajouter.',
            type: 'STRING',
            required: true
        },
        {
            name: 'prefix',
            description: 'Prefixe du bot.',
            type: 'STRING',
            required: true
        },
        {
            name: 'lien',
            description: 'Lien d\'invitation de votre bot.',
            type: 'STRING',
            required: true
        },
        {
            name: 'description',
            description: 'if you have any comments to make to the person who will review your bot.',
            type: 'STRING',
            required: false
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply()

        getUser(interaction.options.getString('id')).then(r => {
            if (r.bot !== true) return interaction.editReply('ce n\'est pas un bot.')
            else {
                if(data.waiting.find(x => x.id == r.id) || data.accept.find(x => x.id == r.id) || data.reject.find(x => x.id == r.id)) dataManipulation_delete(r.id)
                let embed = new MessageEmbed()
                    .setTitle('Nouvelle demande d\'ajout de bot')
                    .addField('Demande de ' + interaction.user.username + " (`" + interaction.user.id + "`)", 'Pour ajouter le bot ' + r.username + ' (`'+ r.id + '`)')
                    .addField('Lien & prefixe', '[URL](' + interaction.options.getString('lien') + ') & (' + interaction.options.getString('prefix') + ')')
                    .addField('Chose a dire :', interaction.options.getString('descriptions') ? interaction.options.getString('descriptions') : 'rien')

                return client.channels.cache.get('1022223053331120158').send({
                    content: interaction.options.getString('id'),
                    embeds: [embed]
                }).then(rdm => {

                    let embed = new MessageEmbed()
                    .setColor('ORANGE')
                    .setDescription('Demande de vérification pour le bot ' + r.username + ' (`' + r.id + '`) en cours.\nPositionnement actuel: ' + (data.waiting.length+1))
                    
                    client.guilds.cache.get(guildMainID).channels.cache.get('1016748953808678992').send({
                        embeds: [embed]
                    }).then(rdm => {
                        dataManipulation_add({'id': r.id, 'username': r.username, 'link': interaction.options.getString('lien'), author: interaction.user.id, prefix: interaction.options.getString('prefix'), opinion: 0})
                        interaction.editReply('demande envoyer, soyez patient le temps que le bot sois vérifié.')
                    })
                })
            }
        }).catch(e => {
            console.log(e)
            return interaction.editReply('Une erreur est survenu, contacter un membre du staff.')
        })
    }
}
