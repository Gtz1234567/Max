const { Discord, EmbedBuilder } = require('discord.js');

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = async (client, message) => {
	 if (message.author.bot) return;
	 if (!message.guild) return;

	 const prefix = client.config.prefix;

	 if (message.content.trim() === `<@${client.user.id}>`) {
		  return message.reply(`Olá ${message.author}! Meu nome é **Max** e sou um bot de economia e utilidades! Use **\`M+help\`**`);
	 }
    
    let userdb = await User.findOne({
        _id: message.author.id
    });
    
    if(!userdb) {
        userdb = await User.create({ _id: message.author.id });
        console.log('pessoa registrada na db');
    }

	 if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

	 const [command, ...args] = message.content
		  .slice(prefix.length)
		  .trim()
		  .split(/ +/g);

	 const cmd = client.commands.get(command.toLowerCase()) || client.commands.find(c => c.aliases?.includes(command.toLowerCase()));

	 if (cmd) {
		  try {
				await cmd.run(client, message, args);
		  } catch (error) {
				console.error(`Erro no: ${command}:`, error);
		  }
	 }

};