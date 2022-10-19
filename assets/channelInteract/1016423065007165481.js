const { MessageEmbed } = require("discord.js")

module.exports = (message) => {
    let embed = new MessageEmbed()
    .setTitle('Suggestion de '  + message.author.username)
    .setDescription('💡 Suggestion:\n\`\`\`fix\n' + message.content + "\`\`\`")
    .addField('😃 réagis:', '> 🟢 Bonne idée\n> 🟠 Pourquoi pas\n> 🔴 Mauvaise')

    return message.channel.send({embeds: [embed]}).then(async(r) => {
        await message.delete();
        await r.startThread({'name': message.author.username});
        for(const emote of ['🟢', '🟠', '🔴']){
            r.react(emote)
        }
    })
}