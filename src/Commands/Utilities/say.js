const Discord = require('discord.js');

module.exports = {
    name: 'say',
    aliases: ['falar'],
    
    category: '「 Utilidades 」',
    usage: 'say [mensagem]',
    permissions: ['Nenhuma.'],
    description: 'Repetir a mensagem dita.',
    
    run: async (client, message, args) => {
        const msg = args.join(' ');
        
        if (!msg) {
            message.reply(`Você precisa escrever algo para que eu possa repetir.`);
            return;
        }
        
        message.reply({
            content: `${message.author.username} disse: \n\n ${msg}`
        });
    }
}