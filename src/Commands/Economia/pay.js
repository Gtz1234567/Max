const {
	EmbedBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ComponentType,
    MembershipScreeningFieldType
} = require('discord.js');

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
	name: 'pay',
    aliases: ['pagar'],
    
    category: '「 Economia 」',
    usage: 'pagar [usuário] [valor]',
    permissions: ['Nenhuma.'],
    description: 'Pagar algum usuário.',
    
	run: async (client, message) => {
		const arg1 = message.content.split(' ')[1];
		const user = message.mentions.users.first() || message.guild.members.cache.find(x => x.id === arg1) || message.guild.members.cache.find(x => x.name === arg1);
      let  amount = message.content.split(' ')[2];
      amount = parseInt(amount)
        
		if (!user) {
			message.reply({
				content: 'Você precisa mencionar um usuário.',
				ephemeral: true
			});
			return;
		}

		if (user.id === message.author.id) {
			message.reply({
				content: 'Quer pargar a si mesmo, espertinho?',
				ephemeral: true
			});
			return;
		}

		if (user.bot) {
			message.reply({
				content: 'Você não pode pagar um bot. :D',
				ephemeral: true
			});
			return;
		}

		if (isNaN(amount)) {
			message.reply({
				content: 'Você precisa inserir um valor.',
				ephemeral: true
			});
			return;
		}
        
        if (Number(amount) <= 0) {
            message.reply({
				content: 'Você precisa inserir um valor inteiro e positivo.',
				ephemeral: true
			});
			return;
        }
        
        const PayerData = await User.findOne({
            _id: message.author.id
        });
        
        const ReceiverData = await User.findOne({
            _id: user.id
        });
        
        if(!PayerData) {
            message.reply({
				content: 'Você ainda não está registrado em meu banco de dados. Utilize qualquer comando para se registrar. :D.',
				ephemeral: true
			});
			return;
        }
        
        if(!ReceiverData) {
            message.reply({
				content: 'O usuário ainda não está registrado no meu banco de dados. Por favor, peça para ele usar qualquer comando para se registrar. :D',
				ephemeral: true
			});
			return;
        }
		
        const PayerMaxiums = PayerData.maxiums;
        const ReceiverMaxiums = ReceiverData.maxiums;

		if (PayerData.maxiums < amount) {
            message.reply({
				content: 'Você não tem **Maxiums** suficiente para completar esta transação.',
				ephemeral: true
			});
			return;
        }

		const PayEmbed = new EmbedBuilder()
			.setAuthor({ name: `»	Pagamento para: ${user.username}`, iconURL: message.author.displayAvatarURL() })
			.setThumbnail(user.displayAvatarURL())
			.setDescription(`**Pagamento De:** \`${message.author.username}\` \n **Pagamento Para:** \`${user.username}\` \n **Maxiums:** \`${amount}\` \n\n ›   O pagamento será concluído quando o usuário clicar no botão abaixo.`)
			.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
			.setColor('#cb272f')
			.setTimestamp()

		const PayConfirmButton = new ButtonBuilder()
			.setLabel('Aceitar')
			.setStyle(ButtonStyle.Success)
			.setCustomId('pay-aceitar')
			.setEmoji('✅')

		const PayDenyButton = new ButtonBuilder()
			.setLabel('Recusar')
			.setStyle(ButtonStyle.Danger)
			.setCustomId('pay-recusar')
			.setEmoji('❌')

		const PayRow = new ActionRowBuilder()
			.addComponents(PayConfirmButton, PayDenyButton)

		message.reply({
			content: `<@${user.id}>`,
			embeds: [PayEmbed],
			components: [PayRow]
		})

		const PayCollector = message.channel.createMessageComponentCollector({
			componentType: ComponentType.Button,
			time: 600000
		});

		PayCollector.on('collect', async i => {
			if (i.user.id !== user.id) {
				i.reply({
					content: 'Ei, você não é o usuário que solicitou o pagamento.',
					ephemeral: true
				});
				return;
			}

			const value = i.customId;
			
			if (value === 'pay-aceitar') {
				const AcceptEmbed = new EmbedBuilder()
					.setAuthor({ name: `»	Pagamento para: ${user.username}`, iconURL: message.author.displayAvatarURL() })
					.setThumbnail(user.displayAvatarURL())
					.setDescription(`> ›   O pagamento foi realizado. \n**Pagamento De:** \` ${message.author.username}\` \n **Pagamento Para:** \`${user.username}\` \n **Maxiums:** \`${amount}\` `)
					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
					.setColor('#cb272f')
					.setTimestamp()

				i.update({
					embeds: [AcceptEmbed],
					components: []
				}).then((m) => {
					setTimeout(async () => {
						m.delete();
					}, 120000);
				});
                
                await User.updateOne({
                    _id: message.author.id
                }, {
                    maxiums: PayerData.maxiums - amount
                });
                
                await User.updateOne({
                    _id: user.id
                }, {
                    maxiums: ReceiverMaxiums + amount
                });
			} else if (value === 'pay-recusar') {
				const DenyEmbed = new EmbedBuilder()
					.setAuthor({ name: `»	Pagamento para: ${user.username}`, iconURL: message.author.displayAvatarURL() })
					.setThumbnail(user.displayAvatarURL())
					.setDescription('> ›   O pagamento foi cancelado.')
					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
					.setColor('#cb272f')
					.setTimestamp()

				i.update({
					embeds: [DenyEmbed],
					components: []
				}).then((m) => {
					setTimeout(async () => {
						m.delete();
					}, 120000);
				});
			}
		});
		
		// PayCollector.on('end', async (i) => {
		// 	i.reply({
		// 		content: 'O tempo acabou, tente novamente.',
		// 		ephemeral: true
		// 	});
		// });
	}
}