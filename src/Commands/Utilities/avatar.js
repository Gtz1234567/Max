const Discord = require('discord.js');

module.exports = {
    name: 'useravatar',
    aliases: ['user-avatar', 'avatar', 'av'],
    
    category: '「 Utilidades 」',
    usage: 'avatar (usuário)',
    permissions: ['Nenhuma.'],
    description: 'Exibir seu avatar ou de um usuário.',
    
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const avatarUrl = user.displayAvatarURL({ size: 1024 });

        const embed = new Discord.EmbedBuilder()
            .setColor('#cb272f')
            .setAuthor({ name: `» Avatar de ${user.username}`, iconURL: message.author.displayAvatarURL() })
            .setImage(avatarUrl)
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
        	.setTimestamp()

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel('Baixar Avatar')
                    .setStyle(Discord.ButtonStyle.Link)
                    .setURL(avatarUrl) 
            );

        message.channel.send({ embeds: [embed], components: [row] });
    },
};