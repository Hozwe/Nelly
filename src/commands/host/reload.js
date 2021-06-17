// Dependencies
const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = class Reload extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			guildOnly: true,
			dirname: __dirname,
            aliases: [],
            permissions: [],
			ownerOnly: true,
			description: "",
			usage: "",
		});
	}
	
	// Run command
	async run(client, message, args) {

	const files = args[0];
	// Checks to see if a command was specified
	if (!message, files) return message.channel.send('misc:INCORRECT_FORMAT');

	// checks to make sure command exists
	const commandName = message.args[0].toLowerCase();
	if (client.commands.has(commandName) || client.commands.get(client.aliases.get(commandName))) {
		// Finds command
		const cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

		// reloads command
		try {
			await client.unloadCommand(cmd.conf.location, cmd.help.name);
			await client.loadCommand(cmd.conf.location, cmd.help.name);
			return message.channel.success('host/reload:SUCCESS', { NAME: commandName }).then(m => m.delete({ timeout: 8000 }));
		} catch (err) {
			client.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			if (message.deletable) message.delete();
			return message.channel.error('misc:ERROR_MESSAGE', { ERROR: err.message }).then(m => m.delete({ timeout: 5000 }));
		}
	} else if (Object.keys(client._events).includes(message.args[0])) {
		try {
			// locate file
			let fileDirectory;
			const evtFolder = await readdir('./src/events/');
			evtFolder.forEach(async folder => {
				const folders = await readdir('./src/events/' + folder + '/');
				folders.forEach(async file => {
					const { name } = path.parse(file);
					if (name == message.args[0]) {
						fileDirectory = `../../events/${folder}/${file}`;
						delete require.cache[require.resolve(fileDirectory)];
						client.removeAllListeners(message.args[0]);
						const event = new (require(fileDirectory))(bot, message.args[0]);
						client.logger.log(`Loading Event: ${message.args[0]}`);
						// eslint-disable-next-line no-shadow
						client.on(message.args[0], (...args) => event.run(bot, ...args));
						return message.channel.success('host/reload:SUCCESS_EVENT', { NAME: message.args[0] }).then(m => m.delete({ timeout: 8000 }));
					}
				});
			});
		} catch (err) {
			client.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			return message.channel.error('misc:ERROR_MESSAGE', { ERROR: err.message }).then(m => m.delete({ timeout: 5000 }));
		}
	} else {
		return message.channel.error('host/reload:INCORRECT_DETAILS', { NAME: commandName }).then(m => m.delete({ timeout: 10000 }));
	}
}
};
