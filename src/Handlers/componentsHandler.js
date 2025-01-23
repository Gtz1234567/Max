const fs = require("fs");
const path = require("path");

async function loadComponents(client) {
    try {
        const baseDir = path.resolve(__dirname, "../Components");

        const loadDir = dir => {
            fs.readdirSync(dir).forEach(item => {
                const fullPath = path.join(dir, item);

                if (fs.statSync(fullPath).isDirectory()) {
                    loadDir(fullPath);
                } else if (item.endsWith(".js")) {
                    const component = require(fullPath);
                    if (component) client.components.set(component.id, component);
                }
            });
        };

        loadDir(baseDir);
        console.log(`Components carregados: ${client.components.size}`);
    } catch (error) {
        console.error("Erro ao carregar os componentes:", error);
    }
}

module.exports = loadComponents;