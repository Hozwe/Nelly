const config = require('../config');
const prefix = config.prefix


module.exports = async (client, message) => {
  if (message.author.bot) return;

  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
    
  if (!message.member) message.member = await message.guild.fetchMember (message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
    
  if (cmd.length === 0) return;
    
  const command =
  client.commands.get(cmd) || client.commands.find(x => x.info && x.info, a => a.aliases && a.aliases.includes(cmd));

  try {
    if (command) command.execute(message, args, cmd, client);
  } catch (err) {
    message.reply("There was an error when trying to execute this command!");
    console.log(err);
  }
};
  