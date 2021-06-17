// Dependencies
const Command = require('../../structures/Command.js');

module.exports = class Reboot extends Command {
	constructor(client) {
		super(client, {
			name: "reboot",
            guildOnly: true,
			dirname: __dirname,
            aliases: [],
            permissions: [],
            ownerOnly: true,
            description: "",
            usage: "",
		});
	}
	async run(client, message, args) {
        
        message.channel.send("ok")
        client.destroy()
        client.login(client.config.token);
    }
};