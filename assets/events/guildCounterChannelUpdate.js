const {
    client
} = require('../../index')
const {guildMainID, countChannel} = require('../../config.json')

setInterval(function(){
    client.guilds.cache.get('1013101563625082920').premiumSubscriptionCount

    if(client.channels.cache.get(countChannel.Members).name !== '👥 ・ Membres: ' + client.guilds.cache.get(guildMainID).memberCount) client.channels.cache.get(countChannel.Members).setName('👥 ・ Membres: ' + client.guilds.cache.get(guildMainID).memberCount)

    if(client.channels.cache.get(countChannel.Boost).name !== '🔮 ・ Booster: ' + client.guilds.cache.get(guildMainID).premiumSubscriptionCount) client.channels.cache.get(countChannel.Boost).setName('🔮 ・ Booster: ' + client.guilds.cache.get(guildMainID).premiumSubscriptionCount)
}, 10*60000)
