// Dependencies
/*const Event = require('../../structures/Event.js');


module.exports = class Bug extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

    async run(client, message, channel) {

    if (message.channel.id === client.config.bugs) {
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
}};
*/

// Dependencies
const Event = require('../../structures/Event.js');


module.exports = class Bug extends Event {
    constructor(...args) {
        super(...args, {
            dirname: __dirname,
        });
    }

    async run(client, message, channel) {

    if (message.channel.id === client.config.bugs) {
        let messageContent = message.content();
        var check1 = messageContent.startsWith("Explenation:") || messageContent.startsWith("\nExplenation:");
        if(check1)
        {
            var check2 = messageContent.substring(messageContent.indexOf("Evidence:"))
            if(check1.startsWith("Evidence:") && check2.includes("Platform:"))
            {
                return message.react(`${client.config.upvote}`, message.react(`${client.config.downvote}`));
            
            }
            if(message.member.roles.cache.has(client.config.developer)) return;   
            else return message.author.send("ok", message.delete());
        } 
        if(message.member.roles.cache.has(client.config.developer)) return;
        else return message.author.send("ok", message.delete()); 

    };
}}