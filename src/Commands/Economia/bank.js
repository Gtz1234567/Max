const {
    Discord,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js');

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: 'bank',
    aliases: ['banco'],
    
    category: '「 Economia 」',
    usage: 'bank',
    permissions: ['Nenhuma.'],
    description: 'Exibir seu saldo na carteira e no banco.',
    
    run: async (client, message) => {
        const userdb = await User.findOne({
            _id: message.author.id
        });
        
        const bank = userdb.bank_type
        
        if (!userdb.bank) {
            const accountButton = new ButtonBuilder()
                .setLabel('Conta Bancária')
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('account');

            const accountRow = new ActionRowBuilder()
            	.addComponents(accountButton);

            const AccountMessage = await message.reply({
                content: 'Você ainda não possui uma conta bancária. Clique no botão abaixo para obter uma.',
                components: [accountRow],
            });

            const filter = (interaction) => {
                return interaction.message.id === AccountMessage.id
            };

            const AccountCollector = AccountMessage.createMessageComponentCollector({
                filter,
                componentType: ComponentType.Button,
                time: 120000,
            });

            AccountCollector.on('collect', async (interaction) => {
                if (interaction.user.id !== message.author.id) {
                    interaction.reply({
                        content: 'Você não é o usuário que utilizou o comando. :D',
                        ephemeral: true
                    });
                    return;
                }
                
                if (interaction.customId === 'account') {
					const linkNubank = 'https://i.postimg.cc/bN7BMWsz/933610086176272445.png';
					const linkSantander = 'https://i.postimg.cc/28bt0rjc/980816711391510548.png';
                    const linkBradesco = 'https://i.postimg.cc/CM6tCz0n/848313010262114365.png';
                    
                    const BanksManuEmbed = new EmbedBuilder()
        				.setAuthor({ name: '»	CONTAS BANCÁRIAS', iconURL: message.author.displayAvatarURL() })
            			.setDescription(`
> Selecione abaixo em qual banco deseja criar uma conta.
						`)
            			.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            			.setColor('#cb272f')
            			.setTimestamp();
                    
                    const BradescoOption = new StringSelectMenuOptionBuilder()
                    	.setLabel('Bradesco')
						.setValue('bradesco')
						.setDescription('Banco Bradesco')
                    	.setEmoji('1328072096567267420');
                    
                    const SantanderOption = new StringSelectMenuOptionBuilder()
                    	.setLabel('Santander')
						.setValue('santander')
						.setDescription('Banco Santander')
                    	.setEmoji('1328072029089304688');
                    
                    const NubankOption = new StringSelectMenuOptionBuilder()
                    	.setLabel('Nubank')
						.setValue('nubank')
						.setDescription('Nubank')
                    	.setEmoji('1328071949980536865');
                    
                    const BanksMenu = new StringSelectMenuBuilder()
                    	.setCustomId('banks')
                        .setMinValues(1)
                        .setMaxValues(1)
                        .setPlaceholder('Selecione uma banco')
                        .addOptions(BradescoOption, SantanderOption, NubankOption);
                    
                    const BanksMenuRow = new ActionRowBuilder()
                    	.addComponents(BanksMenu)
                    
                    const BanksMenuMessage = await interaction.update({ 
                        content: '',
                        embeds: [BanksManuEmbed],
                        components: [BanksMenuRow],
                        ephemeral: false
                    });
                    
                    const filter = (interaction) => {
                        return interaction.message.id === AccountMessage.id
                    };
                    
                    const BanksMenuCollector = BanksMenuMessage.createMessageComponentCollector({
                        filter,
                        componentType: ComponentType.StringSelect,
                        time: 120000,
                    });
                    
                    BanksMenuCollector.on('collect', async (interaction) => {
                        if (interaction.customId !== 'banks') return;
                        
                        const select = interaction.values[0];
                        
                        if (select === 'nubank') {
                            const NubankEmbed = new EmbedBuilder()
        						.setAuthor({ name: '»	NUBANK', iconURL: message.author.displayAvatarURL() })
            					.setDescription(`
> Você selecionou a opção Nubank. Veja abaixo os benefícios para este banco:

- **50% de desconto** em taxas de transferências (Reduzida de \`2%\` para\`1%\`)
- Limite de saque de **50000 Maxiums** por dia.
- **\`15%\` de cashback em compras acima de 1000 Maxiums**

- Taxa para abrir conta: **\`5000 Maxiums\`**
								`)
            					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            					.setColor('#cb272f')
                            	.setThumbnail(linkNubank)
            					.setTimestamp();
                            
                            const NubankButton = new ButtonBuilder()
                                .setLabel('Escolher: Nubank')
                                .setStyle(ButtonStyle.Primary)
                                .setCustomId('nubankbutton')
                            	.setEmoji('1328071949980536865');
                            
                            const NubankRow = new ActionRowBuilder()
                            	.addComponents(NubankButton)
                            
                            const NubankResponse = await interaction.update({
                                embeds: [NubankEmbed],
                                components: [BanksMenuRow, NubankRow]
                            });
                            
                            const NubankCollector = NubankResponse.createMessageComponentCollector({
                                filter: (i) => i.customId === 'nubankbutton',
                                componentType: ComponentType.Button,
                                time: 120000
                            });
                            
                            NubankCollector.on('collect', async (i) => {
                                if (i.customId === 'nubankbutton') {
                                    if (userdb.maxiums < 5000) {
                                        await i.reply({
                                            content: 'Você não tem dinheiro suficiente para criar uma conta no banco.',
                                            ephemeral: true
                                        });
                                        return;
                                    }
                                    
                                	await i.update({ 
                                        content: 'Criando conta Nubank... Por favor aguarde.',
                                        embeds: [],
                                        components: [], 
                                        ephemeral: true 
                                    }).then((m) => {
                                        setTimeout(async () => {
                                            m.edit({ 
                                                content: `Conta da Nubank criada com sucesso. Parabéns!`
                                            });
                                            
                                            await User.updateOne({
                                                _id: message.author.id
                                            }, {
                                                maxiums: Math.floor(userdb.maxiums - 5000),
                                                bank: true,
                                                bank_type: 'Nubank',
                                                bank_img: linkNubank
                                            });
                                        }, 5000);
                                    });
                                }
                            });
                        } else if (select === 'santander') {
                            const SantanderEmbed = new EmbedBuilder()
        						.setAuthor({ name: '»	SANTANDER', iconURL: message.author.displayAvatarURL() })
            					.setDescription(`
> Você selecionou a opção Santander. Veja abaixo os benefícios para este banco:

- **25% de desconto** em taxas de transferências (Reduzida de \`2%\` para\`1.5%\`)
- Limite de saque de **20000 Maxiums** por dia.
- **\`5%\` de cashback em compras acima de 1000 Maxiums**

- Taxa para abrir conta: **\`2500 Maxiums\`**
								`)
            					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            					.setColor('#cb272f')
                            	.setThumbnail(linkSantander)
            					.setTimestamp();
                            
                            const SantanderButton = new ButtonBuilder()
                                .setLabel('Escolher: Santander')
                                .setStyle(ButtonStyle.Primary)
                                .setCustomId('santanderbutton')
                            	.setEmoji('1328072029089304688');
                            
                            const SantanderRow = new ActionRowBuilder()
                            	.addComponents(SantanderButton)
                            
                            const SantanderResponse = await interaction.update({
                                embeds: [SantanderEmbed],
                                components: [BanksMenuRow, SantanderRow]
                            });
                            
                            const SantanderCollector = SantanderResponse.createMessageComponentCollector({
                                filter: (i) => i.customId === 'santanderbutton',
                                componentType: ComponentType.Button,
                                time: 120000
                            });
                            
                            SantanderCollector.on('collect', async (i) => {
                                if (i.customId === 'santanderbutton') {
                                	if (userdb.maxiums < 2500) {
                                        await i.reply({
                                            content: 'Você não tem dinheiro suficiente para criar uma conta no banco.',
                                            ephemeral: true
                                        });
                                        return;
                                    }
                                    
                                	await i.update({ 
                                        content: 'Criando conta Santander... Por favor aguarde.',
                                        embeds: [],
                                        components: [],
                                        ephemeral: true 
                                    }).then((m) => {
                                        setTimeout(async () => {
                                            m.edit({ 
                                                content: `Conta da Santander criada com sucesso. Parabéns!`
                                            });
                                            
                                            await User.updateOne({
                                                _id: message.author.id
                                            }, {
                                                maxiums: Math.floor(userdb.maxiums - 2500),
                                                bank: true,
                                                bank_type: 'Sanander',
                                                bank_img: linkSantander
                                            });
                                        }, 5000);
                                    });
                                }
                            });
                        } else if (select === 'bradesco') {
                            const BradescoEmbed = new EmbedBuilder()
        						.setAuthor({ name: '»	BRADESCO', iconURL: message.author.displayAvatarURL() })
            					.setDescription(`
> Você selecionou a opção Bradesco. Veja abaixo os benefícios para este banco:

- **10% de desconto** em taxas de transferências (Reduzida de \`2%\` para\`1.8%\`)
- Limite de saque de **5000 Maxiums** por dia.
- **0% de cashback**

- Taxa para abrir conta: **\`1500 Maxiums\`**
								`)
            					.setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            					.setColor('#cb272f')
                            	.setThumbnail(linkBradesco)
            					.setTimestamp();
                            
                            const BradescoButton = new ButtonBuilder()
                                .setLabel('Escolher: Bradesco')
                                .setStyle(ButtonStyle.Primary)
                                .setCustomId('bradescobutton')
                            	.setEmoji('1328072096567267420');
                            
                            const BradescoRow = new ActionRowBuilder()
                            	.addComponents(BradescoButton)
                            
                            const BradescoResponse = await interaction.update({
                                embeds: [BradescoEmbed],
                                components: [BanksMenuRow, BradescoRow]
                            });
                            
                            const BradescoCollector = BradescoResponse.createMessageComponentCollector({
                                filter: (i) => i.customId === 'bradescobutton',
                                componentType: ComponentType.Button,
                                time: 120000
                            });
                            
                            BradescoCollector.on('collect', async (i) => {
                                if (i.customId === 'bradescobutton') {
                                	if (userdb.maxiums < 1500) {
                                        await i.reply({
                                            content: 'Você não tem dinheiro suficiente para criar uma conta no banco.',
                                            ephemeral: true
                                        });
                                        return;
                                    }
                                    
                                	await i.update({ 
                                        content: 'Criando conta Bradesco... Por favor aguarde.', 
                                        embeds: [], 
                                        components: [], 
                                        ephemeral: true
                                    }).then((m) => {
                                        setTimeout(async () => {
                                            m.edit({ 
                                                content: `Conta Bradesco criada com sucesso. Parabéns!`
                                            });
                                            
                                            await User.updateOne({
                                                _id: message.author.id
                                            }, {
                                                maxiums: Math.floor(userdb.maxiums - 1500),
                                                bank: true,
                                                bank_type: 'Nubank',
                                                bank_img: linkBradesco
                                            });
                                        }, 5000);
                                    });
                                }
                            });
                        }
                    })
                }
            });
            
            return;
        }
        
        const BankEmbed = new EmbedBuilder()
        	.setAuthor({ name: '»	BANCO', iconURL: message.author.displayAvatarURL() })
            .setDescription(`
> **Seu banco:** \`${bank}\`

**Maxiums(Carteira):** \`${userdb.maxiums}\`
**Maxiums(Banco):** \`${userdb.maxiums_bank}\`

> Selecione algum dos botões abaixo para realizar alguma ação em sua conta bancária.
			`)
            .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
            .setColor('#cb272f')
        	.setThumbnail(userdb.bank_img)
            .setTimestamp();
        
        const DepositButton = new ButtonBuilder()
        	.setLabel('Depositar')
        	.setStyle(ButtonStyle.Primary)
        	.setCustomId('dep')
        
        const WithdrawButton = new ButtonBuilder()
        	.setLabel('Sacar')
        	.setStyle(ButtonStyle.Primary)
        	.setCustomId('wit')
        
        const BankRow = new ActionRowBuilder()
        	.addComponents(DepositButton, WithdrawButton)
        
        const BankMessage = await message.reply({
            content: '',
            embeds: [BankEmbed],
            components: [BankRow]
        });
        
        const filter = (interaction) => {
        	return interaction.message.id === BankMessage.id;
        };

        const BankCollector = BankMessage.createMessageComponentCollector({
            filter,
            componentType: ComponentType.Button,
            time: 30000,
        });
        
        BankCollector.on('collect', async (interaction) => {
            const selection = interaction.customId;
            
            if (interaction.user.id !== message.author.id) {
                interaction.reply({
                    content: 'Você não é o usuário que utilizou o comando. :D',
                    ephemeral: true
                });
                return;
            }
            
            if (selection === 'dep') {
                const DepModal = new ModalBuilder()
                	.setTitle('Depósito')
                	.setCustomId('dep-modal')
                
                const AmountInput = new TextInputBuilder()
                	.setLabel('Quantos Maxiums deseja depositar?')
                	.setStyle(TextInputStyle.Short)
                	.setPlaceholder('Ex. 24500')
                	.setCustomId('amount')
                
                const AmountRow = new ActionRowBuilder()
                	.addComponents(AmountInput)
                
                DepModal.addComponents(AmountRow)
                
                await interaction.showModal(DepModal)
            } else if (selection === 'wit') {
                const WitModal = new ModalBuilder()
                	.setTitle('Saque')
                	.setCustomId('wit-modal')
                
                const AmountInput = new TextInputBuilder()
                	.setLabel('Quantos Maxiums deseja sacar?')
                	.setStyle(TextInputStyle.Short)
                	.setPlaceholder('Ex. 24500')
                	.setCustomId('amount')
                
                const AmountRow = new ActionRowBuilder()
                	.addComponents(AmountInput)
                
                WitModal.addComponents(AmountRow)
                
                await interaction.showModal(WitModal)
            }
        });
        
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isModalSubmit()) return;
            
            if (interaction.customId === 'dep-modal') {
                const amount = interaction.fields.getTextInputValue('amount');
                const depositAmount = parseInt(amount, 10);
                
                if (isNaN(depositAmount) || depositAmount <= 0) {
                    await interaction.reply({
                        content: 'Por favor, insira um valor válido para depositar.',
                        ephemeral: true
                    });
                    return;
                }
                
                if (userdb.maxiums < depositAmount) {
                    await interaction.reply({
                        content: 'Você não tem essa quantia de Maxiums para depositar.',
                        ephemeral: true
                    });
                    return;
                }
                
                await User.updateOne({ 
                    _id: message.author.id
                }, { 
                    maxiums: userdb.maxiums - depositAmount,
                    maxiums_bank: userdb.maxiums_bank + depositAmount
                });
                
                const NewBankEmbed = new EmbedBuilder()
                    .setAuthor({ name: '»	DEPÓSITO CONCLUÍDO!', iconURL: message.author.displayAvatarURL() })
                    .setDescription(`
**Você concluiu um depósito de ${depositAmount} Maxiums!**

> **Seu banco:** \`${bank}\`

**Maxiums(Carteira):** \`${Math.floor(userdb.maxiums - depositAmount)}\`
**Maxiums(Banco):** \`${Math.floor(userdb.maxiums_bank + depositAmount)}\`
					`)
                    .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                    .setColor('#cb272f')
        			.setThumbnail(userdb.bank_img)
                    .setTimestamp();
                
                await interaction.update({
                    embeds: [NewBankEmbed],
                    components: []
                });
                
                BankCollector.stop('Done');
            } else if (interaction.customId === 'wit-modal') {
                const amount = interaction.fields.getTextInputValue('amount');
                const witAmount = parseInt(amount, 10);
                
                if (isNaN(witAmount) || witAmount <= 0) {
                    await interaction.reply({
                        content: 'Por favor, insira um valor válido para depositar.',
                        ephemeral: true
                    });
                    return;
                }
                
                if (userdb.maxiums_bank < witAmount) {
                    await interaction.reply({
                        content: 'Você não tem essa quantia de Maxiums para sacar.',
                        ephemeral: true
                    });
                    return;
                }
                
                await User.updateOne({ 
                    _id: message.author.id
                }, { 
                    maxiums: userdb.maxiums + witAmount,
                    maxiums_bank: userdb.maxiums_bank - witAmount
                });
                
                const NewBankEmbed = new EmbedBuilder()
                    .setAuthor({ name: '»	SAQUE CONCLUÍDO!', iconURL: message.author.displayAvatarURL() })
                    .setDescription(`
**Você concluiu um saque de ${witAmount} Maxiums!**

> **Seu banco:** \`${bank}\`

**Maxiums(Carteira):** \`${Math.floor(userdb.maxiums + witAmount)}\`
**Maxiums(Banco):** \`${Math.floor(userdb.maxiums_bank - witAmount)}\`
                    `)
                    .setFooter({ text: '»	Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
                    .setColor('#cb272f')
        			.setThumbnail(userdb.bank_img)
                    .setTimestamp();
                
                await interaction.update({
                    embeds: [NewBankEmbed],
                    components: []
                });
                
                BankCollector.stop('Done');
            }
        });
    }
}