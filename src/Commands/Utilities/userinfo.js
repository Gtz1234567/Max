const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType
} = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['user-info', 'info-user', 'info-usuario', 'infousuario', 'usuario', 'ui'],
    
    category: '「 Utilidades 」',
    usage: 'userinfo (usuário)',
    permissions: ['Nenhuma.'],
    description: 'Exibir informações sobre si mesmo ou outro usuário.',
    
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || (await client.users.fetch(args[0]).catch(() => {})) || message.author;
        const member = await message.guild.members.fetch(user.id);
        let cargos = member.roles.cache.filter(r => r.name !== '@everyone').map(r => r).join(' ');

        if (!cargos) {
            cargos = "**Nenhum.**";
        }
        
        const UIEmbed = new EmbedBuilder()
            .setAuthor({ name: `Informações`, iconURL: message.author.displayAvatarURL() })
            .setFooter({ text: '» Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })
        	.setTitle(`Usuário: ${user.username}`)
            .setDescription(`
• *Menção:* <@${user.id}> (\`${user.id}\`)

• *Membro Do Discord Desde:* <t:${Math.floor(user.createdTimestamp / 1000)}> 
• *Membro Do Servidor Desde:* <t:${Math.floor(member.joinedTimestamp / 1000)}>
         
• *Cargos:* ${cargos}
`)
            .setColor("#c52027")
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setTimestamp();
        
        const PermsButton = new ButtonBuilder()
            .setCustomId('perms')
            .setLabel('Permissões')
            .setStyle(ButtonStyle.Secondary);
        
        const Row = new ActionRowBuilder()
            .addComponents(PermsButton);
        
        const UI = await message.reply({
            embeds: [UIEmbed],
            components: [Row]
        });
        
        const collector = UI.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 120000
        });
        
        collector.on('collect', async (i) => {
            const selection = i.customId;

            if (i.user.id !== message.author.id) {
                return i.reply({
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
                    "Seak": "Falar", // Fixed typo from "Seak" to "Speak"
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
                    "Speak": "Falar",
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

                // Get the permissions array
                const permissions = member.permissionsIn(message.channel).toArray();

                // Translate permissions
                const translatedPermissions = permissions
                    .map((perm) => permissionMap[perm] || perm)
                    .join('\n');

                const UIEmbed2 = new EmbedBuilder()
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

                // Create Back button
                const BackButton = new ButtonBuilder()
                    .setCustomId('back')
                    .setLabel('Voltar')
                    .setStyle(ButtonStyle.Secondary);

                const Row2 = new ActionRowBuilder()
                    .addComponents(BackButton);

                // Update message with permission details
                const response = await i.update({
                    embeds: [UIEmbed2],
                    components: [Row2]
                });

                // Second Collector for "Back" button
                const collector2 = response.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    time: 120000
                });

                collector2.on('collect', async (interaction) => {
                    if (interaction.customId === 'back') {
                        await interaction.update({
                            embeds: [UIEmbed],
                            components: [Row]
                        });
                    }
                });
            }
        });
    }
};