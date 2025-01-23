const {
    Discord,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    name: 'eval',
    aliases: ['ev', 'e'],
    
    category: '「 Desenvolvedores 」',
    usage: 'eval [código]',
    permissions: ['Somente meus desenvolvedores.'],
    description: 'Evaluar um código.',
    
    run: async (client, message, args) => {
        const code = args.join(' ');

        try {
            let result = await eval(code);

            if (typeof result === 'object' && result !== null) {
                result = JSON.stringify(result, null, 2); 
            }

  
            if (result.length > 1024) {
                result = result.substring(0, 1020) + '...'; 
            }

            const embed = new EmbedBuilder()
                .setTitle('Resultado:')
                .setDescription(`\`\`\`js\n${result}\n\`\`\``)
                .setColor('#c52027')
                .setFooter({ text: 'Evaluado com sucesso!' });

            message.channel.send({ embeds: [embed] });

        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Eval Error')
                .setDescription(`\`\`\`js\n${error.message}\n\`\`\``)
                .setColor('Red')
                .setFooter({ text: 'Error in evaluation' });

            message.channel.send({ embeds: [errorEmbed] });
        }
    }
}