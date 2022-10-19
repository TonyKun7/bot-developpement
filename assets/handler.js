const {
    glob
} = require("glob");
const {
    promisify
} = require("util");
const globPromise = promisify(glob);

const {guildMainID, guildTesterID} = require('../config.json')

module.exports = async(client) => {
    let eventFiles = await globPromise(`${process.cwd()}/assets/events/*.js`);
    eventFiles.map((value) => require(value));

    let arrayOfSlashCommands = [];
    let slashCC = await globPromise(`${process.cwd()}/assets/slash-main/*.js`);

    slashCC.map((value) => {
        let file = require(value)
        if (!file || !file.name) return

        client.slashCommands.set(file.name, file)
        arrayOfSlashCommands.push(file)
    })

    let arrayOfSlashCommandsForSecond = [];
    let slashCCForSecond = await globPromise(`${process.cwd()}/assets/slash-second/*.js`);

    slashCCForSecond.map((value) => {
        let file = require(value)
        if (!file || !file.name) return

        client.slashSeconds.set(file.name, file)
        arrayOfSlashCommandsForSecond.push(file)
    })

    client.on('ready', async() => {
        await client.guilds.cache.get(guildMainID).commands.set(arrayOfSlashCommands)
        await client.guilds.cache.get(guildTesterID).commands.set(arrayOfSlashCommandsForSecond)
    })
}
