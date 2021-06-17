const config = require('../../config');
const Event = require('../../structures/Event.js');
const prefix = config.prefix;
	
module.exports = class Message extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}
	
		// run event
		async run(client, message) {

    if (message.author.bot) 
		return;
		
	/*if (message.channel.id === client.config.bugs) {
		let messageContent = message.content;
		var check1 = messageContent.startsWith("Explenation:") || messageContent.startsWith("\nExplenation:")
		if(check1)
		{
			var check2 = messageContent.substring(messageContent.indexOf("Evidence:"))
			if(check2.startsWith("Evidence:") && check2.includes("Platform:"))
			{
				
				return message.react(`${client.config.upvote}`, message.react(`${client.config.downvote}`));
				
			}
			if(message.member.roles.cache.has(client.config.developer)) return;   
			else return message.author.send("ok", message.delete());
		} 
		if(message.member.roles.cache.has(client.config.developer)) return;
		else return message.author.send("ok", message.delete()); 
	}; 
	*/

	if (message.content.indexOf(prefix) !== 0) 
	    return;
	
	const args = message.content.split(' ');
    const command = args.shift().slice(prefix.length).toLowerCase();

	const cmd = client.commands.get(command) ||  client.commands.get(client.aliases.get(command));
	if (!cmd) 
		return;	

	if (cmd && !message.guild && cmd.conf.guildOnly)
	    return;
	
	if (cmd.conf.ownerOnly && !client.config.ownerID.includes(message.author.id))
	    return;
	
	cmd.run(client, message, args);
}};