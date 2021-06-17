// Dependencies
const Command = require('../../structures/Command.js');
const Discord = require('discord.js');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            guildOnly: true,
            dirname: __dirname,
            aliases: [],
            permissions: [],
            ownerOnly: true,
            description: "",
            usage: "ping",
        });
    }
    run(client, message, args) {
        
        const ms = Math.round(client.ws.ping);

        message.channel.send(`API Lentacy is ${ms}ms`);
    }
};