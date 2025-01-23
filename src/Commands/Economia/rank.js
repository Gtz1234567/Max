const { EmbedBuilder } = require("discord.js");

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: "leaderboard",
    aliases: ['rank', 'top'],
    
    category: '「 Economia 」',
    usage: 'leaderboard',
    permissions: ['Nenhuma.'],
    description: 'Exibir o Top 10 da economia global.',

    run: async (client, message) => {
        const maxiums = await User.find({ maxiums: { $gt: 0 } }).sort({ maxiums: -1 });

        if (maxiums.length === 0) {
            return message.channel.send("Não tem ninguém no ranking zzz");
        }
        
        const userIndex = maxiums.findIndex(user => user._id === message.author.id);
        const userPosition = userIndex !== -1 ? userIndex + 1 : "Nenhuma";
        const position = [];

        for (let i = 0; i < 10; i++) {
            const users = maxiums[i];
            
            if (users) {
                const user = await client.users.fetch(users._id).catch(() => null);

                if (user) {
                    position.push(`> \`(${i + 1}º)\` - **${user.username}** - \`${users.maxiums.toLocaleString()}\``);
                } else {
                    position.push(`> \`(${i + 1}º)\` - **Usuário desconhecido** - \`${users.maxiums.toLocaleString()}\``);
                }
            } else {
                position.push(`> \`(${i + 1}º)\` - **Posição vazia**`);
            }
        }

        const embed = new EmbedBuilder()
            .setTitle("Ranking")
            .setDescription(position.join("\n"))
            .setColor("Red")
            .setFooter({ text: `Sua posição: ${userPosition}`, iconURL: message.author.displayAvatarURL()});
        
        message.reply({ embeds: [embed] });
    }
};