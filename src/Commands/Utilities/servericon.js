const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "servericon",
    aliases: ["icon"],
    
    category: '「 Utilidades 」',
    usage: 'servericon',
    permissions: ['Nenhuma.'],
    description: 'Exibir o ícone do servidor.',
    
    run: async (client, message) => {
        
        const embed = new EmbedBuilder()
            .setAuthor({name: "Ícone Do Servidor:", iconURL: message.author.displayAvatarURL()})
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            .setColor("c52027")
            .setImage(message.guild.iconURL({ size: 1024 }))
            .setTimestamp()

        message.reply({embeds: [embed]})

    }

}