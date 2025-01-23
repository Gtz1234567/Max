const { 
    Discord,
    EmbedBuilder
} = require('discord.js');

function getCooldown(channel) {
  if (!channel.isTextBased()) return null;
  return channel.rateLimitPerUser;
}

module.exports = {
    name: 'channelinfo',
    aliases: ['ci', 'channel-info', 'channel', 'canal'],
    
    category: '「 Utilidades 」',
    usage: 'channelinfo (canal)',
    permissions: ['Nenhuma.'],
    description: 'Exibir informações sobre o canal atual ou um canal mencionado.',
    
    run: async (client, message, args) => {
        const channel = message.guild.channels.cache.get(message.content.split(' ')[1]) || message.channel;
            
        const CIEmbed = new EmbedBuilder()
        	.setAuthor({name: "Informações", iconURL: message.author.displayAvatarURL()})
            .setTitle(`Canal: ${channel.name}`)
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            .setDescription(`
• *Menção:* <#${channel.id}> (\`${channel.id}\`)

• *Tempo De Espera:* **${getCooldown(channel) ? getCooldown(channel) : `Este é um canal de voz.`}**
• *Criado em:* **<t:${Math.floor(channel.createdTimestamp / 1000)}>**
		    `)
            .setColor("#c52027")
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .setTimestamp()
        
        message.reply({
            embeds: [CIEmbed]
        });
    }
}