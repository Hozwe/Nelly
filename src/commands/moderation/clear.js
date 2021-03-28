// Dependencies


module.exports = {
  info: {
    name: "clear",
    aliases: ["c"],
    permissions: ["MANAGE_MESSAGES"],
    category: "Moderation",
    description: "Clear a certain amount of messages.",
    usage: "clear <Number> [member]",
    cooldown: 5000,
    examples: ["clear 50 username", "clear 10"],
  },

  
  // execute command
  async execute (message, args, cmd, client) {
    
    const amount = args[0];

    if (!amount) return message.reply('help').then(m => m.delete({ timeout: 5000 }));

    // Make sure x is a number
     if (isNaN(amount) || (amount > 100) || (amount < 1)) return message.sendInvalidUsage(commandData);

    // Delete messages
    await message.channel.messages.fetch({ limit: amount }).then(async messages => {
      // Delete user messages
      if (message.guild.members.cache.get(args[1])) {
        messages = messages.filter((m) => m.author.id === message.guild.members.get(args[1]).user.id);
      }
      
      // delete the message
      await message.channel.bulkDelete(messages, true).catch(err => console.log('error'));
      message.reply(` I have deleted ${messages.size}`).then(m => m.delete({ timeout: 3000 }));
    });
  }
};