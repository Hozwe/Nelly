const { Client, Collection } = require('discord.js'),
    mongoose = require('mongoose'),
	moment = require('moment'),
	path = require('path');

	
module.exports = class Bot extends Client {
	constructor(options) {
		super(options);
		// for console logging
		this.logger = require('../utils/Logger');

		// For command handler
		this.aliases = new Collection();
		this.commands = new Collection();

		// connect to database
		//this.mongoose = require('../database/mongoose');
		
		// config file
		this.config = require ('../config.js');

		// for emojis
		this.customEmojis = require('../assets/json/emojis.json');

		this.created = moment().format('HH:MM:SS');
	}
	
	// Load a command
	loadCommand(commandPath, commandName) {
		try {
			const cmd = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
			console.log(`Loading Command: ${cmd.help.name}`);
			cmd.conf.location = commandPath;
			if (cmd.init) cmd.init(this);
			this.commands.set(cmd.help.name, cmd);
			cmd.help.aliases.forEach((alias) => {
				this.aliases.set(alias, cmd.help.name);
			});
			return false;
		} catch (err) {
			return `Unable to load command ${commandName}: ${err}`;
		}
	}

	// Unload a command
	async unloadCommand(commandPath, commandName) {
		let command;
		if (this.commands.has(commandName)) {
			command = this.commands.get(commandName);
		} else if (this.aliases.has(commandName)) {
			command = this.commands.get(this.aliases.get(commandName));
		}
		if(!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
		if(command.shutdown) await command.shutdown(this);
		delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
		return false;
	}
};