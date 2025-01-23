const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {

    name: "perfil",

    run: async (client, message) => {
        const userdb = User.findOne({ 
            _id: message.author.id 
        });

        const createEmbed = () => {

            return new EmbedBuilder()

                .setAuthor({ name: `Perfil`, iconURL: message.author.displayAvatarURL() })

                .setFooter({ text: '© Max™ - Todos os direitos reservados.', iconURL: client.user.displayAvatarURL() })

                .setTitle("Perfil")

                .setThumbnail(message.author.displayAvatarURL())

                .setDescription(`

**Apelido:** \`${userdb.nickname}\`

**Descrição:** \`${userdb.desc}\`

**Carteira:** \`${userdb.maxiums}\`

**Banco:** \`${userdb.maxiums_bank}\`

                `)

                .setColor("Red");

        };

        const embed = createEmbed();

        const menu = new StringSelectMenuBuilder()

            .setCustomId("perfil")

            .setPlaceholder("Editar perfil")

            .addOptions(

                {

                    label: "Apelido",

                    description: "Mudar seu apelido do perfil.",

                    value: "apelido",

                },

                {

                    label: "Descrição",

                    description: "Editar sua descrição do perfil.",

                    value: "desc",

                }

            );

        const select = new ActionRowBuilder().addComponents(menu);

        const msg = await message.reply({

            embeds: [embed],

            components: [select],

        });

        const collector = msg.createMessageComponentCollector({

            componentType: ComponentType.StringSelect,

            time: 120000,

        });

        collector.on("collect", async (interaction) => {

            if (interaction.user.id !== message.author.id) {

                return interaction.reply({

                    content: "Você não pode interagir com este menu!",

                    ephemeral: true,

                });

            }

            const escolha = interaction.values[0];

            if (escolha === "apelido" || escolha === "desc") {

                const modal = new ModalBuilder()

                    .setCustomId(`modal_${escolha}`)

                    .setTitle(`Editar ${escolha === "apelido" ? "Apelido" : "Descrição"}`);

                const input = new TextInputBuilder()

                    .setCustomId(`${escolha}_input`)

                    .setLabel(`Digite o novo ${escolha === "apelido" ? "apelido" : "descrição"}:`)

                    .setStyle(TextInputStyle.Short)

                    .setPlaceholder(`Novo ${escolha === "apelido" ? "apelido" : "descrição"} aqui...`)

                    .setMinLength(1)

                    .setMaxLength(escolha === "apelido" ? 15 : 55)

                    .setRequired(true);

                const actionRow = new ActionRowBuilder().addComponents(input);

                modal.addComponents(actionRow);

                await interaction.showModal(modal);

            }

        });

        client.on("interactionCreate", async (interaction) => {

            if (!interaction.isModalSubmit()) return;

            const modalId = interaction.customId;

            if (modalId === "modal_apelido") {

                const newApelido = interaction.fields.getTextInputValue("apelido_input");

                await User.updateOne({

    _id: message.author.id

}, {

    nickname: newApelido

});

                await userdb.save();

                // Atualizar o embed

                const updatedEmbed = createEmbed();

                await msg.edit({ embeds: [updatedEmbed] });

                await interaction.reply({

                    content: `Seu apelido foi atualizado para: \`${newApelido}\``,

                    ephemeral: true,

                });

            } else if (modalId === "modal_desc") {

                const newDesc = interaction.fields.getTextInputValue("desc_input");

                await User.updateOne({
    _id: message.author.id
}, {
    nickname: newDesc
})

                await userdb.save();

                // Atualizar o embed

                const updatedEmbed = createEmbed();

                await msg.edit({ embeds: [updatedEmbed] });

                await interaction.reply({

                    content: `Sua descrição foi atualizada para: \`${newDesc}\``,

                    ephemeral: true,

                });

            }

        });

        
    },

};