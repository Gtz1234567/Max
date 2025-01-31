const path = require('node:path');
const getAllFiles = require('../Utils/getAllFiles');

async function loadEvents(client) {
	const eventFolders = getAllFiles(path.join(__dirname, '../Events'), true);

	for (const eventFolder of eventFolders) {
		const eventFiles = getAllFiles(eventFolder);
		eventFiles.sort((a, b) => a > b)

		const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

		client.on(eventName, async (arg) => {
			for (const eventFile of eventFiles) {
				const eventFunction = require(eventFile);
				await eventFunction(client, arg);
			}
		});
	}
}

module.exports = loadEvents