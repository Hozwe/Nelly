// Dependencies


module.exports = {
    info: {
      name: "slowmode",
      aliases: ["sl"],
      permissions: ["MANAGE_CHANNELS"],
      category: "Moderation",
      description: "Activate slowmode on a channel.",
      usage: "slowmode <time | off>",
      cooldown: 5000,
      examples: ["slowmode off', 'slowmode 1m"],
    },
    
    
    // execute command
    execute(message, args, cmd, client, Discord) {
        if (message.member.hasPermission("MANAGE_CHANNELS")) {
            if (!args.length) {
                message.channel.send("You didn't provide any arguments.")
            } else {
                var slowmode;
                if (args[0] == 'off') slowmode = 0;
                else slowmode = args[0];
                message.channel.setRateLimitPerUser(slowmode, null);
                let confirmEmbed = new Discord.MessageEmbed()
                    .setColor('#7E78D2')
                    .setTitle("Slowmode")
                    .setDescription(`Slowmode set to ${slowmode} seconds`)
                message.channel.send(confirmEmbed)
            }
        } else {
            message.channel.send("You don't have permissions to change slowmode.")
        }
    }
}