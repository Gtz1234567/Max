const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    
    category: '「 Utilidades 」',
    usage: 'serverinfo',
    permissions: ['Nenhuma.'],
    description: 'Exibir informações sobre o servidor.',
    
    run: async (client, message) => {
        const bot = message.guild.members.cache.find(x => x.id === client.user.id);
        const join = Math.floor(bot.guild.joinedTimestamp / 1000);
        
        const embed = new EmbedBuilder()
        .setAuthor({name: "Informações", iconURL: message.author.displayAvatarURL()})
        .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
        .setTitle(`Servidor: ${message.guild.name}`)
        .setDescription(`
›› **Dono**: <@${message.guild.ownerId}> (\`${message.guild.ownerId}\`)
›› **ID do servidor**: \`${message.guild.id}\`

• **Membros:** \`${message.guild.memberCount}\`
• **Cargos**: \`${message.guild.roles.cache.size}\`

• **Canais(${message.guild.channels.cache.filter(x => x.type === 0).size + message.guild.channels.cache.filter(x => x.type === 2).size})**:
• Canais De Texto: \`${message.guild.channels.cache.filter(x => x.type === 0).size}\`
• Canais De Voz: \`${message.guild.channels.cache.filter(x => x.type === 2).size}\`

• Criação: <t:${Math.floor(message.guild.createdTimestamp / 1000)}>
• Minha Entrada: <t:${join}>
`)
        .setColor("c52027")
        .setThumbnail(message.guild.iconURL())
        .setTimestamp()
        
        message.reply({embeds: [embed]})

    }

}