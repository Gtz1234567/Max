const mongoose = require('mongoose');

module.exports = async (client, interaction) => {
		if (interaction.isCommand()) return;
	
		if (interaction.message.createdTimestamp < (client.readyTimestamp || 0)) {
				interaction.reply({ content: `A interação expirou!`, ephemeral: true });
				return;
		}
	
		const handleInteraction = async () => {
				const [interactionId, authorId, ...args] = interaction.customId.split("-");
				const componentData = client.components.get(interactionId);
			
				if (componentData?.authorOnly && interaction.user.id !== authorId) {
						return interaction.reply({
								content: "Essa interação não é sua!", ephemeral: true
						})
				}
            
				if (componentData) {
						await componentData.run(client, interaction, args);
				}
		};
	
		if (interaction.isButton() || interaction.isAnySelectMenu() || interaction.isModalSubmit()) {
				await handleInteraction();
		}
}