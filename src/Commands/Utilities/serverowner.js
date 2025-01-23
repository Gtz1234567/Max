const {
    Discord,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'serverowner',
    aliases: ['server-owner', 'guild-owner', 'guildowner', 'owner', 'dono'],
    
    category: '「 Utilidades 」',
    usage: 'serverowner',
    permissions: ['Nenhuma.'],
    description: 'Exibir informações sobre o dono do servidor.',
    
    run: async (client, message) => {
        const owner = await client.users.fetch(message.guild.ownerId);
        const ownerm = await message.guild.members.fetch(owner.id);
        const cargos = ownerm.roles.cache.filter(r => r.name !== '@everyone').map(r => r).join(' ');
        
        const SOEmbed = new EmbedBuilder()
            .setAuthor({ name: `Informações`, iconURL: message.author.displayAvatarURL() })
            .setFooter({ text: '» Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
        	.setTitle(`Dono: ${owner.username}`)
            .setDescription(`
• *Menção:* <@${owner.id}> (\`${owner.id}\`)
• *Membro Do Discord Desde:* **<t:${Math.floor(owner.createdTimestamp / 1000)}>**
         
• *Cargos:* ${cargos ? cargos : `**Nenhum cargo.**`}
`)
            .setColor("#c52027")
            .setThumbnail(`${owner.displayAvatarURL()}`)
            .setTimestamp();
        
        message.reply({
            embeds: [SOEmbed]
        });
    }
}