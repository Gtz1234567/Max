const {
	EmbedBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ComponentType,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js')

module.exports = {
	name: 'help',
    aliases: ['ajuda', 'h'],
    
    category: '「 Bot 」',
    usage: 'help',
    permissions: ['Nenhuma.'],
    description: 'Exibir meu painel de ajuda.',
    
	run: async (client, message, args) => {
		const PanelEmbed = new EmbedBuilder()
			.setAuthor({ name: '»	Painel De Comandos - Max™', iconURL: message.author.displayAvatarURL() })
			.setDescription('Pelo visto você precisa de ajuda, então aqui está meu painel de comandos. \n > ›	 \`Seleciona a categoria que deseja ver abaixo.\`')
			.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
			.setColor('#cb272f')
        	.setThumbnail(message.author.displayAvatarURL())
			.setTimestamp()

		const UtilsOption = new StringSelectMenuOptionBuilder()
			.setLabel('Utilidades')
			.setValue('util')
			.setDescription('Comandos De Utilidade');

		const EcoOption = new StringSelectMenuOptionBuilder()
			.setLabel('Economia')
			.setValue('eco')
			.setDescription('Comandos De Utilidade');

		const HelpMenu = new StringSelectMenuBuilder()
			.setCustomId('help')
			.setMinValues(1)
			.setMaxValues(1)
			.setPlaceholder('Selecione uma categoria')
			.addOptions(UtilsOption, EcoOption);

		const MenuRow = new ActionRowBuilder()
			.addComponents(HelpMenu);
        
        const AddMeButton = new ButtonBuilder()
			.setLabel('Me Adicione!')
			.setStyle(ButtonStyle.Link)
			.setURL('https://discord.com/oauth2/authorize?client_id=1325520276296830977')

		const ServerButton = new ButtonBuilder()
			.setLabel('Suporte')
			.setStyle(ButtonStyle.Link)
			.setURL('https://discord.com/oauth2/authorize?client_id=1325520276296830977')

		const WebsiteButton = new ButtonBuilder()
			.setLabel('Meu Website!')
			.setStyle(ButtonStyle.Link)
			.setURL('https://discord.com/oauth2/authorize?client_id=1325520276296830977')
        	.setDisabled(true)

			const ButtonsRow = new ActionRowBuilder()
				.addComponents(AddMeButton, ServerButton, WebsiteButton)

		const Panel = await message.reply({
			embeds: [PanelEmbed],
			components: [MenuRow, ButtonsRow]
		});
        
		const PanelCollector = Panel.createMessageComponentCollector({ 
			componentType: ComponentType.StringSelect,
			time: 120000
		});

		PanelCollector.on('collect', async i => {
            if (i.user.id !== message.author.id) {
                i.reply({
                    content: 'Calma ai... Essa interação não é sua.',
                    ephemeral: true
                });
                return;
            }
            
			const selection = i.values[0];
			
			if (selection === 'util') {
				const UtilEmbed = new EmbedBuilder()
					.setAuthor({ name: '»	Painel De Comandos - Max™ | Utilidades', iconURL: message.author.displayAvatarURL() })
					.setDescription('> » Meus comandos de utilidades(6): \n \`\`\`M+: avatar, botinfo, userinfo, serverinfo, roleinfo, perfil\`\`\`')
					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
					.setColor('#cb272f')
					.setTimestamp()

				await i.update({
					embeds: [UtilEmbed],
					components: [MenuRow, ButtonsRow]
				});
				
			} else if (selection === 'eco') {
				const UtilEmbed = new EmbedBuilder()
					.setAuthor({ name: '»	Painel De Comandos - Max™ | Economia', iconURL: message.author.displayAvatarURL() })
					.setDescription('> » Meus comandos de economia(7): \n \`\`\`M+: bal, pay, bet, coinflip, daily, bank, cooldowns\`\`\`')
					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
					.setColor('#cb272f')
					.setTimestamp()

				await i.update({
					embeds: [UtilEmbed],
					components: [MenuRow, ButtonsRow]
				});
			}
		});
	}
}