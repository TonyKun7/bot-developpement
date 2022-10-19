const {client} = require('../../index')
const fs = require('fs')

client.on('messageCreate', (message) => {
    if(message.author.bot)return
    if(fs.existsSync('./assets/channelInteract/' + message.channel.id + ".js")){
        require('../channelInteract/' + message.channel.id)(message)
    }
})