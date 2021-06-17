// Dependencies
const Command = require('../../structures/Command.js');

module.exports = class React extends Command {
    constructor(client) {
        super(client, {
            name: "react",
            guildOnly: true,
            dirname: __dirname,
            aliases: [],
            permissions: [],
            ownerOnly: true,
            description: "",
            usage: "",
        });
    }
    // execute command
    run(client, message, args) {

        const channelID= message.channel.id;
        const messageID = args[0];
        const emoji = args[1];

        if(!messageID) 
        return message.channel.send("Command has failed\n> ReferenceError: `messageID is not defined`");

        if(!emoji) 
        return message.channel.send("Command has failed\n> ReferenceError: `emoji is not defined`");
        
        message.client.channels.fetch(channelID).then(channel => {
            channel.messages.fetch(messageID).then(message => {
                message.react(`${emoji}`);
            })
        })
    }
};