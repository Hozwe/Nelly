// Dependencies


module.exports = {
  info: {
    name: "ban",
    aliases: ["b"],
    permissions: ["BAN_MEMBERS"],
    category: "Moderation",
    description: "Ban a user.",
    usage: "ban <user> [reason] [time]",
    cooldown: 5000,
		examples: ["ban username spamming chat 4d", "ban username raiding"],
  },
 
 // execute command
 async execute(message, args, cmd, client) {
   const member = message.mentions.users.first();
    if (member) {
      const memberTarget = message.guild.members.cache.get(member.id);
      memberTarget.ban();
      message.channel.send("User has been banned");
    } else {
      message.channel.send("You couldn't ban the member");
    }
  }
}