// Dependecies
const path = require('path');

// Command structure
module.exports = class Command {
	constructor(client, {
		name = null,
		guildOnly = false,
		dirname = false,
		aliases = new Array(),
		botPermissions = new Array(),
		userPermissions = new Array(),
		ownerOnly = false,
		description = '',
		usage = '',
	}) {
		this.client = client;
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length - 1, 10)] : "onther");
		this.conf = { guildOnly, userPermissions, botPermissions, ownerOnly };
		this.help = { name, category, aliases, description, usage };
	}
		

	// eslint-disable-next-line no-unused-vars
	async run(...args) {
		throw new Error(`Command: ${this.help.name} does not have a run method`);
	}
};