const Discord = require("discord.js");

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: 'saldo',
    aliases: ["bal", "atm"],
    
    category: '「 Economia 」',
    usage: 'saldo (usuário)',
    permissions: ['Nenhuma.'],
    description: 'Exibir seu saldo na carteira ou de outra pessoa.',
  
    run: async(client, message, args) => {
        const mention = message.mentions.users.first() || message.author;

        if (mention.bot) {
            return message.reply("Você não pode verificar o saldo de um bot.");
        }

        const user = await User.findOne({_id: mention.id});

        if (!user) {
            return message.reply(`${mention} não está registrado no sistema.`);
        }

        let saldo = user.maxiums;

        let embed = new Discord.EmbedBuilder()
            .setTitle("Saldo")
            .setColor("#cb272f");

        if (mention === message.author) {
            embed.setDescription(`${mention}, você possui **${saldo} Maxiums**`);
        } else {
            embed.setDescription(`${mention} possui **${saldo} Maxiums**`);
        }
        
        message.reply({
            embeds: [embed]
        });
    }
};