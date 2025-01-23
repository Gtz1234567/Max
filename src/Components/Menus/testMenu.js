module.exports = {
	 id: 'menu',
	 authorOnly: true,
	 run: async(client, interaction) => {
		  switch (interaction.values[0]) {
					 case "opc1": {


			interaction.update({
				 content: "Opção 1"
			})


					 break;

		  }
				case "opc2": {
			interaction.update({
				 content: "Opção 2"
			})
		  break;

	 }
		  }
	 }
}