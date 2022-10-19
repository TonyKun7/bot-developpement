const {
    client
} = require("../../index")

const {
    MessageEmbed
} = require("discord.js")

const {
    webhookLogs,
    guildMainID,
    countChannel
} = require("../../config.json")

const axios = require("axios").default

async function sendWebhook(username, embed) {
    await axios({
        method: "POST",
        url: webhookLogs,
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            username: username,
            embeds: [embed]
        })
    })
}

const fetchAuditLog = async (name) => {
    let entry = await client.guilds.cache.get(guildMainID).fetchAuditLogs({
        type: name
    }).then(audit => audit.entries.first())
    return entry
}

var embed = new MessageEmbed()
    .setTimestamp()
    .setColor("AQUA")

client.on("channelCreate", async (channel) => {
    if (channel.guild.id == guildMainID) {
        embed.fields = []
        let entry = await fetchAuditLog("CHANNEL_CREATE")

        embed.setDescription("> Nom du nouveau channel: `" + channel.name + "` (type: `" + channel.type + "`, ID: `" + channel.id + "`)\n\n> Auteur de la création: `" + entry.executor.username + "#" + entry.executor.discriminator + "` (ID: `" + entry.executor.id + "` )")
        sendWebhook("channelCreate", embed)
    }
})

client.on("channelUpdate", async (oldChannel, newChannel) => {
    if(oldChannel.id == countChannel.Boost || oldChannel.id == countChannel.Members)return
    if (oldChannel.guild.id == guildMainID) {
        if (oldChannel.name !== newChannel.name) {
            embed.fields = []
            let entry = await fetchAuditLog("CHANNEL_UPDATE")

            embed.setDescription("> ID du salon modifier: `" + oldChannel.id + "`\n> Ancien nom du channel: `" + oldChannel.name + "`\n> Nouveau nom du channel: `" + newChannel.name + "`\n\n> Auteur de la modification: `" + entry.executor.username + "#" + entry.executor.discriminator + "` (ID: `" + entry.executor.id + "` )")
            sendWebhook("channelUpdate", embed)
        }
    }
})

client.on("channelDelete", async (channel) => {
    if (channel.guild.id == guildMainID) {
        embed.fields = []
        let entry = await fetchAuditLog("CHANNEL_DELETE")

        embed.setDescription("> Nom du salon supprimer: `" + channel.name + "` (type: `" + channel.type + "`, ID: `" + channel.id + "`)\n\n> Auteur du channel supprimer: `" + entry.executor.username + "#" + entry.executor.discriminator + "` (ID: `" + entry.executor.id + "` )")
        sendWebhook("channelDelete", embed)
    }
})



client.on("guildBanAdd", async (ban) => {
    if (ban.guild.id == guildMainID) {
        embed.fields = []
        let entry = await fetchAuditLog("MEMBER_BAN_ADD")

        embed.setDescription("> Utilisateur banni: `" + ban.user.username + "#" + ban.user.discriminator + "` (ID: `" + ban.user.id + "`)\n> Raison du ban: `" + entry.reason + "`\n\n> Auteur du ban: `" + entry.executor.username + "#" + entry.executor.discriminator + "` (ID: `" + entry.executor.id + "` )")
        sendWebhook("memberBan", embed)
    }
})

client.on("guildBanRemove", async (ban) => {
    if (ban.guild.id == guildMainID) {
        embed.fields = []
        let entry = await fetchAuditLog("MEMBER_BAN_REMOVE")

        embed.setDescription("> Utilisateur unban: `" + ban.user.username + "#" + ban.user.discriminator + "` (ID: `" + ban.user.id + "`)\n\n> Auteur du unban: `" + entry.executor.username + "#" + entry.executor.discriminator + "` (ID: `" + entry.executor.id + "` )")
        sendWebhook("memberUnban", embed)
    }
})



client.on("guildMemberAdd", async (member) => {
    if (member.guild.id == guildMainID) {
        embed.fields = []
        embed.setDescription("> Utilisateur qui rejoint: `" + member.user.username + "#" + member.user.discriminator + "` (ID: `" + member.user.id + "`, BOT: `" + member.user.bot + "`)\n> Date de création du compte: <t:" + Math.round(member.user.createdTimestamp / 1000) + ":R> (<t:" + Math.round(member.user.createdTimestamp / 1000) + ":F>")
        sendWebhook("memberAdd", embed)
    }
})

client.on("guildMemberRemove", async (member) => {
    if (member.guild.id == guildMainID) {
        embed.fields = []
        embed.setDescription("> Utilisateur qui est parti: `" + member.user.username + "#" + member.user.discriminator + "` (ID: `" + member.user.id + "`, BOT: `" + member.user.bot + "`)\n> Date ou il a rejoint le serveur: <t:" + Math.round(member.joinedTimestamp / 1000) + ":R> (<t:" + Math.round(member.joinedTimestamp / 1000) + ":F>")
        sendWebhook("memberRemove", embed)
    }
})

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (oldMember.guild.id == guildMainID) {
        if (oldMember.nickname !== newMember.nickname) {
            embed.fields = []
            embed.setDescription("> Utilisateur qui a changer de pseudo: `" + oldMember.user.username + "#" + oldMember.user.discriminator + "` (ID: `" + oldMember.user.id + "`)\n> Ancien pseudo: `" + oldMember.nickname + "`\n> Nouveau pseudo: `" + newMember.nickname + "`")
            sendWebhook("memberNickname", embed)
        } else if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            embed.fields = []
            if (oldMember.roles.cache.size < newMember.roles.cache.size) {
                for (const role of newMember.roles.cache.map(x => x.id)) {
                    if (!oldMember.roles.cache.has(role)) {
                        let RoleGet = oldMember.guild.roles.cache.get(role);
                        embed.setDescription("> utilisateur qui a gagner un rôle: `" + oldMember.user.username + "#" + oldMember.user.discriminator + "` (ID: `" + oldMember.user.id + "`)\n\n> Role gagner:")
                        .addField("`" + RoleGet.name + "`", "(ID: `" + RoleGet.id + "`)")
                    }
                }
                sendWebhook("memberRoleAdd", embed)
            } else if (oldMember.roles.cache.size > newMember.roles.cache.size) {
                for (const role of oldMember.roles.cache.map(x => x.id)) {
                    if (!newMember.roles.cache.has(role)) {
                        let RoleGet = oldMember.guild.roles.cache.get(role)
                        embed.setDescription("> utilisateur qui a perdu un rôle: `" + oldMember.user.username + "#" + oldMember.user.discriminator + "` (ID: `" + oldMember.user.id + "`)\n\n> Role perdu:")
                        .addField("`" + RoleGet.name + "`", "(ID: `" + RoleGet.id + "`)")
                    }
                }
                sendWebhook("memberRoleRemove", embed)
            }
        }
    }
})



client.on("messageDelete", async (message) => {
    if(message.author.bot)return
    if (message.guild.id == guildMainID) {
        embed.fields = []
        embed.setDescription("> Utilisateur du message supprimer: `" + message.author.username + "#" + message.author.discriminator + "` (ID: `" + message.author.id + "`)\n> Channel ou le message a était suprimé: `" + message.channel.name + "` (ID: `" + message.channel.id + "`)\n\n> Message content: \n\`\`\`fix\n" + message.content + "\`\`\`")
        sendWebhook('messageDelete', embed)
    }
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
    if(oldMessage.author.bot)return
    if (oldMessage.guild.id == guildMainID) {
        embed.fields = []
        embed.setDescription("> Utilisateur du message modifier: `" + oldMessage.author.username + "#" + oldMessage.author.discriminator + "` (ID: `" + oldMessage.author.id + "`)\n> Channel ou le message a était modifier: `" + oldMessage.channel.name + "` (ID: `" + oldMessage.channel.id + "`)\n\n> Ancien message content: \n\`\`\`fix\n\"" + oldMessage.content + "\"\`\`\`\n> Nouveau message content: \n\`\`\`xl\n\"" + newMessage.content + "\"\`\`\`")
        sendWebhook('messageUpdate', embed)
    }
})



client.on("voiceStateUpdate", async (oldState, newState) => {
    let user = client.users.cache.get(newState.id)
    if(oldState.guild.id == guildMainID){
        embed.fields = []
        if(oldState.channelId == null && newState.channelId !== null){
            embed.setDescription("> Utilisateur qui a rejoint un channel vocal : `" + user.username + "#" + user.discriminator + "`(ID: `" + user.id + "`)\n> Channel vocal qu'il a rejoint: `" + newState.channel.name + "` (ID: `" + newState.channel.id + "`)")
            sendWebhook('channelJoin', embed)
        }else if(oldState.channelId !== null && newState.channelId == null){
            embed.setDescription("> Utilisateur qui a quitter un channel vocal : `" + user.username + "#" + user.discriminator + "`(ID: `" + user.id + "`)\n> Channel vocal qu'il a quitter: `" + oldState.channel.name + "` (ID: `" + oldState.channel.id + "`)")
            sendWebhook('channelLeave', embed)
        }else if(oldState.channelId !== newState.channelId){
            embed.setDescription("> Utilisateur qui a changer de channel vocal : `" + user.username + "#" + user.discriminator + "`(ID: `" + user.id + "`)\n\n> Ancien channel vocal: `" + oldState.channel.name + "` (ID: `" + oldState.channel.id + "`)\n> Nouveau channel vocal: `"+ newState.channel.name + "` (ID: `" + newState.channel.id + "`)")
            sendWebhook('channelMoove', embed)
        }
    }
})