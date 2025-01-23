const {
    Discord,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'date',
    aliases: ['data', 'day', 'dia'],
    
    category: '「 Utilidades 」',
    usage: 'date',
    permissions: ['Nenhuma.'],
    description: 'Exibir a data atual.',
    
    run: async (client, message) => {
        const date = Math.floor(Date.now() / 1000);
        
        const DateEmbed = new EmbedBuilder()
			.setAuthor({ name: `» ${message.author.globalName}`, iconURL: message.author.displayAvatarURL() })
			.setDescription(`> • *Hoje é:* **<t:${date}:F>**`)
			.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
			.setColor('#cb272f')
			.setTimestamp()
        
        message.reply({
            embeds: [DateEmbed]
        });
    }
}