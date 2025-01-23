const { 
    EmbedBuilder, 
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder,
    ButtonBuilder, 
    ButtonStyle,
    ComponentType
} = require("discord.js");

const os = require('os');

module.exports = {
    name: "botinfo",
    aliases: ["bi"],
    
    category: '「 Bot 」',
    usage: 'botinfo',
    permissions: ['Nenhuma.'],
    description: 'Exibir minhas informações.',
    
   	run: async (client, message) => {
        const uptime = Math.trunc((Date.now() - client.uptime) / 1000)
        const BIEmbed = new EmbedBuilder()
            .setAuthor({name: "Informações", iconURL: message.author.displayAvatarURL()})
            .setTitle("Max™ - Informações Gerais")
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            .setDescription(`
Olá ${message.author}! Veja abaixo minhas informações gerais. Selecione alguma opção no menu abaixo para ver outros tipos de informações.

> • *Nome:* **${client.user.username}**
> • *Criado em:* **<t:${Math.floor(client.user.createdTimestamp / 1000)}>**
> • *Servidor oficial:* **[Santuário Do Max™](https://discord.gg/)**
		    `)
            .setColor("#c52027")
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setTimestamp()
       
        const GeneralOption = new StringSelectMenuOptionBuilder()
        	.setLabel('Informações Gerais')
			.setValue('gen')
		    .setDescription('Mostra minhas informações gerais.');
       
        const DevelopmentOption = new StringSelectMenuOptionBuilder()
        	.setLabel('Desenvolvimento')
			.setValue('devm')
			.setDescription('Mostrar informações sobre meu desenvolvimento.');
       
        const StatsOption = new StringSelectMenuOptionBuilder()
        	.setLabel('Estatísticas')
			.setValue('stats')
			.setDescription('Mostrar informações sobre minhas estatísticas.');
        
        const DevsOption = new StringSelectMenuOptionBuilder()
        	.setLabel('Desenvolvedores')
			.setValue('devs')
			.setDescription('Mostrar informações sobre mius desenvolvedores.');
       
        const BIMenu = new StringSelectMenuBuilder()
       	    .setCustomId('bi')
		    .setMinValues(1)
		    .setMaxValues(1)
		    .setPlaceholder('Selecione uma categoria...')
		    .addOptions(GeneralOption, DevelopmentOption, StatsOption, DevsOption);

        const MenuRow = new ActionRowBuilder()
            .addComponents(BIMenu);
        
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

        const BIResponse = await message.reply({
        	embeds: [BIEmbed],
        	components: [MenuRow, ButtonsRow]
        });
        
        const BICollector = BIResponse.createMessageComponentCollector({
            componentType: ComponentType.StringSelect
        });
        
        BICollector.on('collect', async (interaction) => {
            if (interaction.user.id !== message.author.id) {
                interaction.reply({
                    content: 'Calma ai... Essa interação não é sua.',
                    ephemeral: true
                });
                return;
            }
            
            const selection = interaction.values[0];
            
            if (selection === 'gen') {
                interaction.update({
                    embeds:[BIEmbed],
                    components: [MenuRow, ButtonsRow]
                });
            } else if (selection === 'devm') {
                const usage = process.cpuUsage();
                const totalCPUTime = os.cpus().length * os.uptime() * 1000;
                const usedCPUTime = (usage.user + usage.system) / 1000;
                const cpuPercentage = (usedCPUTime / totalCPUTime) * 100;
                
                const memoryUsage = process.memoryUsage();
                const rss = (memoryUsage.rss / 1024 / 1024).toFixed(2);
                const heapUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
                const heapTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);
                
                const DevmEmbed = new EmbedBuilder()
                    .setAuthor({name: "Informações", iconURL: message.author.displayAvatarURL()})
                    .setTitle("Max™ - Desenvolvimento")
                    .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                    .setDescription(`
> • *Linguagem:* **Javascript**
> • *Software:* **Node.js**
> • *Livraria:* **Discord.js**
> • *Banco De Dados:* **Mongo Database**
> • *Hospedagem:* **[Gratian.pro](https://painel.gratian.pro)**

> • *Versão do Node.js:* **23.6.0**
> • *Versão do Discord.js:* **14.7.3**
> • *Versão do MongoDB:* **6.12.0**
> • *Versão do Mongoose:* **8.9.5**

> • *Carga do CPU:* **${cpuPercentage.toFixed(2)}%**
> • *Uso de RAM:* **${rss} MB**
> • *Uso de Memória:* **${heapTotal} MB**
                    `)
                    .setColor("#c52027")
                    .setThumbnail(`${client.user.displayAvatarURL()}`)
                    .setTimestamp()
                
                interaction.update({
                    embeds:[DevmEmbed],
                    components: [MenuRow, ButtonsRow]
                });
            } else if (selection === 'stats') {
                let totalNormalEmojis = 0;
                let totalAnimatedEmojis = 0;

                client.guilds.cache.forEach(guild => {
                  const emojis = guild.emojis.cache;
                  totalNormalEmojis += emojis.filter(emoji => !emoji.animated).size;
                  totalAnimatedEmojis += emojis.filter(emoji => emoji.animated).size;
                });
                
                const StatsEmbed = new EmbedBuilder()
                    .setAuthor({name: "Informações", iconURL: message.author.displayAvatarURL()})
                    .setTitle("Max™ - Estatísticas")
                    .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                    .setDescription(`
> • **Geral:**
• *Servers:* **${client.guilds.cache.size}**
• *Channels:* **${client.channels.cache.size}**
• *Users:* **${client.users.cache.size}**

> • **Emojis:**
• *Emojis*: **${totalNormalEmojis + totalAnimatedEmojis}**
• *Normal:* **${totalNormalEmojis}**
• *Animated:* **${totalAnimatedEmojis}**

> • **Client:**
• *Commands:* **${client.commands.size}**
• *Ping:* **${client.ws.ping} MS**
• *Online:* **<t:${Math.floor(Math.trunc(Date.now() - client.uptime) / 1000)}:R>**
                    `)
                    .setColor("#c52027")
                    .setThumbnail(`${client.user.displayAvatarURL()}`)
                    .setTimestamp()
                
                interaction.update({
                    embeds:[StatsEmbed],
                    components: [MenuRow, ButtonsRow]
                });
            } else if (selection === 'devs') {
                const dev1 = await client.users.fetch(client.config.devs[0]);
                const dev2 = await client.users.fetch(client.config.devs[1]);
                
                const Dev1Embed = new EmbedBuilder()
                	.setTitle(`${dev1.globalName}`)
                	.setDescription(`
> • *Usuário:* <@${dev1.id}>
> • *Nome:* **${dev1.username}**
> • *ID:* **${dev1.id}**
> • *Criação Da Conta:* **<t:${Math.floor(dev1.createdAt / 1000)}>**
                    `)
                	.setThumbnail(dev1.displayAvatarURL())
                	.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                	.setTimestamp()
                	.setColor('#c52027')
                
                const Dev2Embed = new EmbedBuilder()
                	.setTitle(`${dev2.globalName}`)
                	.setDescription(`
> • *Usuário:* <@${dev2.id}>
> • *Nome:* **${dev2.username}**
> • *ID:* **${dev2.id}**
> • *Criação Da Conta:* **<t:${Math.floor(dev2.createdAt / 1000)}>**
                    `)
                	.setThumbnail(dev2.displayAvatarURL())
                	.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                	.setTimestamp()
                	.setColor('#c52027')
                
                interaction.update({
                    embeds:[Dev1Embed, Dev2Embed],
                    components: [MenuRow, ButtonsRow]
                });
            }
        })
	}
}