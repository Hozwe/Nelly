// Dependencies
const Command = require('../../structures/Command.js');
const Discord = require('discord.js');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "lockdown",
            guildOnly: true,
            dirname: __dirname,
            aliases: [],
            permissions: [],
            ownerOnly: true,
            description: "People are restricted from talking in the server or that channel.",
            usage: "lockdown [optional channel name]",
        });
    }
}