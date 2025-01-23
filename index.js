const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { config } = require("./config.js");

const loadCommands = require("./src/Handlers/commandsHandler.js");
const loadEvents = require("./src/Handlers/eventsHandler.js");
const loadComponents = require('./src/Handlers/componentsHandler.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction
	]
});

client.config = config;
client.commands = new Collection();
client.aliases = new Collection();
client.components = new Collection();

(async () => {
    try {
        await loadCommands(client);
        await loadEvents(client);
        await loadComponents(client);

        await client.login(config.token);
    } catch (error) {
        console.error("Erro ao iniciar o bot:", error);
    }
})();