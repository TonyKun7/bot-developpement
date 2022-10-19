const {
    client
} = require('../../index')

const {
    guildMainID,
    guildTesterID,
    autoRole
} = require('../../config.json')

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        var cmd;
        if (interaction.guild.id == guildMainID) cmd = client.slashCommands.get(interaction.commandName);
        else if (interaction.guild.id == guildTesterID) cmd = client.slashSeconds.get(interaction.commandName)
        if (!cmd) return interaction.reply({
            content: 'An error has occured'
        })

        return cmd.run(client, interaction)
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId == 'roleNotif') {
            let roleRemove = []
            let roleAdd = []
            for (let {id} of autoRole) {
                if (client.guilds.cache.get(guildMainID).members.cache.get(interaction.user.id).roles.cache.get(id)){
                    if(!interaction.values.includes(id)) roleRemove.push(id)
                }else{
                    if(interaction.values.includes(id)) roleAdd.push(id)
                }
            }
            if(roleRemove.length !== 0) client.guilds.cache.get(guildMainID).members.cache.get(interaction.user.id).roles.remove(roleRemove)
            if(roleAdd.length !== 0) client.guilds.cache.get(guildMainID).members.cache.get(interaction.user.id).roles.add(roleAdd)

            return interaction.reply({
                ephemeral: true,
                content: 'roles mise a jour.'
            })
        }
    }
})