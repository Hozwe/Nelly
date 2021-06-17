const path = require('path');
const Client = require('./base/bot');
const client = new Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	ws: {
		intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES'],
	},
});
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);

(async () => {
    
    /*
    const cmdFolders = await readdir('./src/commands/');
    cmdFolders.forEach(async(dir) => {
	    const commands = await readdir('./src/commands/' + dir + '/');
        commands.forEach((cmd) => {
            const resp = client.loadCommand('./commands/' + dir, cmd);
        });
    });
    */

    /*const evtFiles = await readdir('./src/events/');
    evtFiles.forEach(file => {
        let evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        client.on(evtName, evt.bind(null, client));
        console.log(`Loading Event: ${evtName}`);
    });
    */

	 /// "discord.js-commando": "github:discordjs/Commando",

 
    	// load commands
	const cmdFolders = (await readdir('./src/commands/')).filter((v, i, a) => a.indexOf(v) === i);
	client.logger.log('Loading command(s): 125 ');
    cmdFolders.forEach(async (dir) => {
		//if (bot.config.disabledPlugins.includes(dir)) return;
		try {
			const commands = (await readdir('./src/commands/' + dir + '/')).filter((v, i, a) => a.indexOf(v) === i);
			commands.forEach((cmd) => {
				//if (bot.config.disabledCommands.includes(cmd.replace('.js', ''))) return;
				const resp = client.loadCommand('./commands/' + dir, cmd);
				if (resp) client.logger.error(resp);
			});
		} catch (err) {
			console.log(err.message);
		}
	});

	// load events
	const evtFolder = await readdir('./src/events/');
	client.logger.log(`Loading events(s): ${evtFolder.length}`);
	evtFolder.forEach(async folder => {
		const folders = await readdir('./src/events/' + folder + '/');
		folders.forEach(async file => {
			delete require.cache[file];
			const { name } = path.parse(file);
			try {
				const event = new (require(`./events/${folder}/${file}`))(client, name);
				client.logger.log(`Loading Event: ${name}`);
				client.on(name, (...args) => event.run(client, ...args));
			} catch (err) {
				client.logger.error(`Failed to load Event: ${name} error: ${err.message}`);
			}
		});
	});

	//client.mongoose.init(client)

    const token = client.config.token;
    client.login(token)
})();