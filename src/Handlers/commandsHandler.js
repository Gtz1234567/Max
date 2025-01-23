const fs = require("fs");
const path = require('path');

async function loadCommands(client) {
    const commandDir = path.join(__dirname, '../Commands');

    try {
        const commandFolders = await fs.promises.readdir(commandDir);

        for (const folder of commandFolders) {
            const commandFiles = await fs.promises
                .readdir(`${commandDir}/${folder}`)
                .catch(() => {
                    console.warn(`Subpasta ${folder} está vazia ou não existe.`);
                    return [];
                });

            for (const file of commandFiles) {
                const command = require(`${commandDir}/${folder}/${file}`);

                if (!command.name || !command.run) {
                    console.warn(`Comando inválido em ${file}.`);
                    continue;
                }

                client.commands.set(command.name, command);

                if (command.aliases) {
                    if (!Array.isArray(command.aliases)) {
                        console.warn(`Aliases em ${command.name} não são um array.`);
                        continue;
                    }

                    for (const alias of command.aliases) {
                        if (client.commands.has(alias)) {
                            console.warn(`Alias duplicado: ${alias}`);
                            continue;
                        }
                        client.aliases.set(alias, command);
                    }
                }
            }
        }

        console.log(`Comandos carregados: ${client.commands.size}`);
    } catch (error) {
        console.error(`Erro ao carregar comandos: ${error.message}`);
    }
}

module.exports = loadCommands;
