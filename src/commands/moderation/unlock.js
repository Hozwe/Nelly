// Dependencies


module.exports = {
  info: {
    name: "unlock",
    aliases: ["ul"],
    permissions: ["MANAGE_CHANNELS"],
    category: "Moderation",
    description: "Unlock a channel so that everyone can speak in it.",
    usage: "unlock [reason]",
    cooldown: 5000,
    examples: ["unlock raidaig is finished"],
  },
  
  
  // execute command
    async execute(message, args, cmd, client, Discord) {
      if (message.member.hasPermission('MANAGE_CHANNELS')) {
      message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null }).catch(e => {
    console.log(e);
    message.author.send("I couldn't unlock the channel. Please try again.")
  });
  message.channel.send(`🔒 This channel has been unlocked by a member of staff for reason: ${message.content.substring(8)}`);
      }
    }
  }