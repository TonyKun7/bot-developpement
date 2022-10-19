const {
    client
} = require('../../index')

const {staffRole} = require('../../config.json')

client.on('guildMemberUpdate', async (after, before) => {
    if (after.roles.cache.size < before.roles.cache.size || after.roles.cache.size > before.roles.cache.size) {
        let removedRole = after.roles.cache.filter(role => !before.roles.cache.has(role.id)).first()
        let newRole = before.roles.cache.filter(role => !after.roles.cache.has(role.id)).first()

        if(removedRole !== undefined && staffRole.some(c => c.id == removedRole.id) || newRole !== undefined && staffRole.some(c => c.id == newRole.id))return require('../function').editMessageStaffList()
    }
})