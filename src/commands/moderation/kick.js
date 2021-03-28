// Dependencies


module.exports = {
    info: {
      name: "kick",
      aliases: ["k"],
      permissions: ["KICK_MEMBERS"],
      category: "Moderation",
      description: "Kick a user.",
      usage: "kick <user> [reason]",
      cooldown: 5000,
      examples: ["kick username spamming chat"],
    },
    

    // execute command
    execute(message, args, cmd, client, Discord) {
        const member = message.mentions.users.first();
        if (member) {
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send("User has been kicked");
        } else {
            message.channel.send("You couldn't kick the member");
        }
    }
}


      
