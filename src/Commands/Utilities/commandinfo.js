const {
    Discord,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'commandinfo',
    aliases: ['command-info', 'info-command', 'info-comando'],
    
    category: '「 Utilidades 」',
    usage: 'commandinfo [comando]',
    permissions: ['Nenhuma.'],
    description: 'Exibir informações sobre o comando indicado.',
    
    run: async (client, message) => {
        const command = message.content.split(' ')[1]
        const cmd = client.commands.get(command)
        
        if (!cmd) {
            message.reply('Não foi possível encontrar um comando');
            return;
        }
        
        const CIEmbed = new EmbedBuilder()
        	.setAuthor({name: "Informações", iconURL: message.author.displayAvatarURL()})
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            .setTitle(`Comando: ${command}`)
            .setDescription(`
Nota: \`[]\` = Obrigatório | \`()\` = Opcional

Nome:\`\`\`${cmd.name}\`\`\`
Apelidos:\`\`\`${cmd.aliases.join(' ')}\`\`\`
Categoria:\`\`\`${cmd.category}\`\`\`
Descrição:\`\`\`${cmd.description}\`\`\`
Uso:\`\`\`${cmd.usage}\`\`\`
Permissões:\`\`\`${cmd.permissions}\`\`\`
    		`)
            .setColor("c52027")
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
        
        message.reply({
            embeds: [CIEmbed]
        });
    }
}