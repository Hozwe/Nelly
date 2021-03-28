// Dependencies


module.exports = {
    info: {
      name: "lock",
      aliases: ["l"],
      permissions: ["MANAGE_CHANNELS"],
      category: "Moderation",
      description: "Lock a channel from members being able to talk in it.",
      usage: "lock [reason]",
      cooldown: 5000,
      examples: ["lock raiding"],
    },
    
    
    // execute command
    async execute(message, args, cmd, client, Discord) { 
        if (message.member.hasPermission('MANAGE_CHANNELS')) {
            message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false }).catch(e => {
    console.log(e);
    message.author.send("I couldn't lock the channel. Please try again.")
  });
  message.channel.send(`🔒 This channel has been locked by a member of staff for reason: ${message.content.substring(6)}`);
      }
    }
}