const {
    Discord,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'ping',
    
    category: '「 Bot 」',
    usage: 'ping',
    permissions: ['Nenhuma.'],
    description: 'Exibir meu ping.',
    
    run: async (client, message) => {
        const PingEmbed = new EmbedBuilder()
			.setAuthor({ name: '» Max™ - Ping', iconURL: message.author.displayAvatarURL() })
			.setDescription(`> • Meu ping atual é: **\`${client.ws.ping}\`**`)
			.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
			.setColor('#cb272f')
			.setTimestamp()
        
        message.reply({
            embeds: [PingEmbed]
        });
    }
}