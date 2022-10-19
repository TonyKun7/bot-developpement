const {
    client
} = require('../../index')

const {guildMainID} = require('../../config.json')

client.on('guildMemberAdd', async(member) => {
    client.guilds.cache.get(guildMainID).channels.cache.get('1021037824310513764').send(member.user.toString())
})