const { EmbedBuilder } = require("discord.js");

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: "cooldowns",
    aliases: ['cd'],
    
    category: '「 Economia 」',
    usage: 'coodowwns',
    permissions: ['Nenhuma.'],
    description: 'Exibir o tempo de espera para utilizar comandos.',
    
    run: async(client, message) => {
        const userdb = await User.findOne({
            _id: message.author.id
        });
        
        const daily = Date.now() > userdb.daily ? "✅ Pronto" : `❌ Volte em <t:${parseInt(userdb.daily / 1000)}:R>`
        const coinflip = Date.now() > userdb.cooldownc ? "✅ Pronto" : `❌ Volte em <t:${parseInt(userdb.cooldownc / 1000)}:R>`
        
        const embed = new EmbedBuilder()
        	.setAuthor({ name: '»	COOLDOWNS', iconURL: message.author.displayAvatarURL() })
        	.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
        	.setTitle(`Cooldowns de \`${message.author.username}\``)
        	.setDescription(`**Daily:**
${daily}

**Coinflip:**
${coinflip}`)
        
        	.setColor("Red")
        	.setThumbnail(message.author.displayAvatarURL())
        
        message.reply({embeds: [embed]})
    }
}
    
    
    
    
    
    
    
    
    

