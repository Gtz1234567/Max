const {
    Discord,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    
    category: '「 Bot 」',
    usage: 'uptime',
    permissions: ['Nenhuma.'],
    description: 'Exibir meu tempo ativo.',
    
    run: async (client, message) => {
        const uptime = Math.floor(Math.trunc(Date.now() - client.uptime) / 1000)
        
        const UpEmbed = new EmbedBuilder()
			.setAuthor({ name: '» Max™ - Uptime', iconURL: message.author.displayAvatarURL() })
			.setDescription(`> • *Estou online:* **<t:${uptime}:R>**`)
			.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
			.setColor('#cb272f')
			.setTimestamp()
        
        message.reply({
            embeds: [UpEmbed]
        });
    }
}