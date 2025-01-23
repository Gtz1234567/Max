const Discord = require("discord.js")

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: 'daily',
    
    category: '「 Economia 」',
    usage: 'daily',
    permissions: ['Nenhuma.'],
    description: 'Resgatar recompensa diária.',
    
    run: async (client, message) => {
        const userdb = await User.findOne({
            _id: message.author.id
        });
      
        if(userdb.daily > Date.now()) { 
            message.reply(`:x: | ${message.author}, você resgatou seu daily recentemente, volte <t:${parseInt(userdb.daily / 1000)}:R>!`);
            return;
        }
        
        function getRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        let valor = getRandomNumber(250, 700);
        
        await User.updateOne({_id: message.author.id}, {
          $inc: {
            "maxiums": valor
          },
          $set: {
            "daily": Date.now() + 86400000
          },
        })
        
        message.reply({
            content: `o | ${message.author}, você resgatou \`${valor.toLocaleString()}\` **Maxiums** do seu daily!`
        })
    }
}