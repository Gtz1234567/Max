const { Discord, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: 'bet',
    aliases: ['apostar'],
    
    category: '「 Economia 」',
    usage: 'bet [usuário] [valor]',
    permissions: ['Nenhuma.'],
    description: 'Apostar com algum usuário.',
    
    run: async (client, message) => {
        const arg1 = message.content.split(' ')[1];
        const user = message.mentions.users.first() || message.guild.members.cache.find(x => x.id === arg1) || message.guild.members.cache.find(x => x.name === arg1);
        let amount = message.content.split(' ')[2];
        amount = parseInt(amount);

        if (!user) {
            message.reply({ content: 'Você precisa mencionar um usuário para apostar.', ephemeral: true });
            return;
        }

        if (user.id === message.author.id) {
            message.reply({ content: 'Quer apostar consigo mesmo, espertinho?', ephemeral: true });
            return;
        }

        if (user.bot) {
            message.reply({ content: 'Você não pode apostar com um bot. :D', ephemeral: true });
            return;
        }

        if (isNaN(amount)) {
            message.reply({ content: 'Você precisa inserir um valor para apostar.', ephemeral: true });
            return;
        }

        if (Number(amount) <= 0) {
            message.reply({ content: 'Você precisa inserir um valor inteiro e positivo.', ephemeral: true });
            return;
        }

        const AuthorData = await User.findOne({ _id: message.author.id });
        const UserData = await User.findOne({ _id: user.id });

        if (AuthorData.maxiums < amount) {
            message.reply({ content: 'Você não tem **Maxiums** suficiente para esta aposta.', ephemeral: true });
            return;
        }

        if (UserData.maxiums < amount) {
            message.reply({ content: `${user.username} não tem **Maxiums** suficiente para esta aposta.`, ephemeral: true });
            return;
        }

        const BetEmbed = new EmbedBuilder()
            .setAuthor({ name: '»	APOSTA', iconURL: message.author.displayAvatarURL() })
            .setDescription(`**Aposta Entre:** \`${message.author.username}\` e \`${user.username}\`\n**Maxiums:** \`${amount}\`\n\n›   A aposta será feita/cancelada quando o usuário clicar no botão abaixo.`)
            .setThumbnail(user.displayAvatarURL())
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            .setColor('#cb272f')
            .setTimestamp();

        const BetConfirmButton = new ButtonBuilder()
            .setLabel('Aceitar')
            .setStyle(ButtonStyle.Success)
            .setCustomId('bet-aceitar')
            .setEmoji('✅');

        const BetDenyButton = new ButtonBuilder()
            .setLabel('Recusar')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('bet-recusar')
            .setEmoji('❌');

        const BetRow = new ActionRowBuilder().addComponents(BetConfirmButton, BetDenyButton);

        const BetMessage = await message.reply({
            content: `<@${user.id}>`,
            embeds: [BetEmbed],
            components: [BetRow]
        });

        const BetCollector = BetMessage.createMessageComponentCollector({
            ComponentType: ComponentType.Button,
            time: 120000
        });

        BetCollector.on('collect', async (interaction) => {
            const selection = interaction.customId;

            if (interaction.user.id === message.author.id) {
                interaction.reply({ content: 'Você não pode confirmar, somente o usuário convidado para a aposta. :D', ephemeral: true });
                return;
            }

            if (interaction.user.id !== user.id && interaction.user.id !== message.author.id) {
                interaction.reply({ content: 'Você não parte da aposta, espertinho. :D', ephemeral: true });
                return;
            }

            if (selection === 'bet-aceitar') {
                const result = Math.random() < 0.5 ? message.author : user;

                const BetAEmbed = new EmbedBuilder()
                    .setAuthor({ name: '»	APOSTA', iconURL: message.author.displayAvatarURL() })
                    .setDescription(`> O ganhador da aposta de **${amount} Maxiums** \`foi: ${result.username}\`! \n\n **Aposta Entre:** \`${message.author.username}\` e \`${user.username}\`\n**Maxiums:** \`${amount}\``)
                    .setThumbnail(result.displayAvatarURL())
                    .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                    .setColor('#cb272f')
                    .setTimestamp();

                interaction.update({ embeds: [BetAEmbed], components: [] });

                if (result === message.author) {
                    await User.updateOne({ _id: message.author.id }, { maxiums: AuthorData.maxiums + Number(amount) });
                    await User.updateOne({ _id: user.id }, { maxiums: UserData.maxiums - Number(amount) });
                } else {
                    await User.updateOne({ _id: message.author.id }, { maxiums: AuthorData.maxiums - Number(amount) });
                    await User.updateOne({ _id: user.id }, { maxiums: UserData.maxiums + Number(amount) });
                }
            } else if (selection === 'bet-recusar') {
                const BetDEmbed = new EmbedBuilder()
                    .setAuthor({ name: '»	APOSTA', iconURL: message.author.displayAvatarURL() })
                    .setDescription(`Aposta cancelada. \n\n **Aposta Entre:** \`${message.author.username}\` e \`${user.username}\`\n**Maxiums:** \`${amount}\``)
                    .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                    .setColor('#cb272f')
                    .setTimestamp();

                interaction.update({ embeds: [BetDEmbed], components: [] });
            }
        });
    }
};
