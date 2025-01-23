const {
    Discord,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType
} = require('discord.js')

module.exports = {
    name: 'roleinfo',
    aliases: ['role-info', 'cargoinfo', 'cargo-info', 'cargo', 'ri'],
    
    category: '「 Utilidades 」',
    usage: 'roleinfo [cargo]',
    permissions: ['Nenhuma.'],
    description: 'Exibir informações sobre o cargo mencionado.',
    
    run: async (client, message) => {
        const role = message.guild.roles.cache.find(x => x.id === message.content.split(' ')[1]) || message.mentions.roles.first() || message.guild.roles.cache.find(x => x.id === message.content.split(' ')[1])
        
        if (!role) {
            message.reply('Você precisa mencionar ou inserir o ID de um cargo.');
            return;
        }
        
        const RIEmbed = new EmbedBuilder()
            .setAuthor({ name: `Informações`, iconURL: message.author.displayAvatarURL() })
            .setFooter({ text: '» Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
        	.setTitle(`Cargo: ${role.name}`)
            .setDescription(`
• *Menção:* <@&${role.id}> (\`${role.id}\`)
• Membros: \`${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size}\`

• Criado em: <t:${Math.floor(role.createdTimestamp / 1000)}>
• Exibir Separadamente: \`${role.hoist ? 'Sim' : 'Não'}\`
`)
        	.setThumbnail(message.author.displayAvatarURL())
        	.setColor('#c52027')
        	.setTimestamp()
        
        const PermsButton = new ButtonBuilder()
            .setCustomId('perms')
            .setLabel('Permissões')
            .setStyle(ButtonStyle.Secondary);
        
        const Row = new ActionRowBuilder()
            .addComponents(PermsButton);
        
        const ri = await message.reply({
            embeds: [RIEmbed],
            components: [Row]
        });
        
        const collector = ri.createMessageComponentCollector({
            ComponentType: ComponentType.Button,
            time: 120000
        });
        
        collector.on('collect', async (interaction) => {
            const selection = interaction.customId;

            if (interaction.user.id !== message.author.id) {
                return interaction.reply({
                    content: 'Ei, você não é o usuário que utilizou o comando.',
                    ephemeral: true,
                });
            }

            if (selection === 'perms') {
                const permissionMap = {
                    "CreateInstantInvite": "Criar Convite Instantâneo",
                    "AddReactions": "Adicionar Reações",
                    "Stream": "Transmitir",
                    "ViewChannel": "Ver Canal",
                    "SendMessages": "Enviar Mensagens",
                    "EmbedLinks": "Incorporar Links",
                    "AttachFiles": "Anexar Arquivos",
                    "ReadMessageHistory": "Ler Histórico de Mensagens",
                    "MentionEveryone": "Mencionar @everyone",
                    "UseExternalEmojis": "Usar Emojis Externos",
                    "Connect": "Conectar",
                    "Speak": "Falar",
                    "UseVAD": "Usar Detecção de Atividade de Voz",
                    "ChangeNickname": "Alterar Apelido",
                    "UseApplicationCommands": "Usar Comandos de Aplicação",
                    "RequestToSpeak": "Solicitar para Falar",
                    "CreatePublicThreads": "Criar Tópicos Públicos",
                    "CreatePrivateThreads": "Criar Tópicos Privados",
                    "UseExternalStickers": "Usar Figurinhas Externas",
                    "SendMessagesInThreads": "Enviar Mensagens em Tópicos",
                    "UseEmbeddedActivities": "Usar Atividades Incorporadas",
                    "UseSoundboard": "Usar Mesa de Som",
                    "CreateGuildExpressions": "Criar Expressões do Servidor",
                    "CreateEvents": "Criar Eventos",
                    "UseExternalSounds": "Usar Sons Externos",
                    "SendVoiceMessages": "Enviar Mensagens de Voz",
                    "SendPolls": "Enviar Enquetes",
                    "UseExternalApps": "Usar Aplicativos Externos",
                    "KickMembers": "Expulsar Membros",
                    "BanMembers": "Banir Membros",
                    "ManageChannels": "Gerenciar Canais",
                    "ManageGuild": "Gerenciar Servidor",
                    "ViewAuditLog": "Visualizar Log de Auditoria",
                    "PrioritySpeaker": "Prioridade de Fala",
                    "SendTTSMessages": "Enviar Mensagens TTS",
                    "ManageMessages": "Gerenciar Mensagens",
                    "MuteMembers": "Silenciar Membros",
                    "DeafenMembers": "Ensurdecer Membros",
                    "MoveMembers": "Mover Membros",
                    "ManageNicknames": "Gerenciar Apelidos",
                    "ManageRoles": "Gerenciar Cargos",
                    "ManageWebhooks": "Gerenciar Webhooks",
                    "ManageEmojisAndStickers": "Gerenciar Emojis e Figurinhas",
                    "ManageGuildExpressions": "Gerenciar Expressões do Servidor",
                    "ManageThreads": "Gerenciar Tópicos",
                    "ModerateMembers": "Moderar Membros",
                    "ViewCreatorMonetizationAnalytics": "Visualizar Análises de Monetização do Criador",
                    "ManageEvents": "Gerenciar Eventos",
                    "ViewGuildInsights": "Visualizar Insights do Servidor"
                };

                const permissions = role.permissions.toArray();

                const translatedPermissions = permissions
                    .map((perm) => permissionMap[perm] || perm)
                    .join('\n');

                const RIEmbed2 = new EmbedBuilder()
                    .setAuthor({ name: `Info - ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
                    .setTitle('Permissões')
                    .setFooter({
                        text: '» Max™ - Todos os direitos reservados.',
                        iconURL: client.user.displayAvatarURL(),
                    })
                    .setDescription(`\`\`\`${translatedPermissions}\`\`\``)
                    .setColor("#c52027")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp();

                const BackButton = new ButtonBuilder()
                    .setCustomId('back')
                    .setLabel('Voltar')
                    .setStyle(ButtonStyle.Secondary);

                const Row2 = new ActionRowBuilder()
                    .addComponents(BackButton);

                const response = await interaction.update({
                    embeds: [RIEmbed2],
                    components: [Row2]
                });
                
                const collector2 = response.createMessageComponentCollector({
                    ComponentType: ComponentType.Button,
                    time: 120000
                });
                
                collector2.on('collect', (i) => {
                    if (i.customId === 'back') {
                        i.update({
                            embeds: [RIEmbed],
                            components: [Row]
                        })
                    }
                })
            }
        });

    }
}