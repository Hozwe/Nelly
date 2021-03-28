// Dependencies
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
const { readdirSync } = require('fs');
const fs = require('fs');
const config = require('./config');
const logger = require('./utils/logger');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


// Loading Commands
const cmdFolders = readdirSync('./src/commands/');
cmdFolders.forEach(dir => {
	const commands = readdirSync(`./src/commands/${dir}/`);
	commands.forEach(cmd => {
        let cmdName = require(`./commands/${dir}/${cmd}`);
        client.commands.set(cmdName.info.name,cmdName)
        console.log(`Loaded command ${cmdName.info.name}`)
	});
});


// Loading Events
const evtFiles = fs.readdirSync('./src/events/');
evtFiles.forEach(file => {
    const evt = require(`./events/${file}`);
    const evtName = file.split('.')[0];
    client.on(evtName, evt.bind(null, client));
    console.log(`Loaded event '${evtName}'`);
});


// Logging in to discord
client.login(config.token);