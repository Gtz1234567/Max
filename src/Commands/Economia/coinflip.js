const { EmbedBuilder } = require('discord.js');

const User = require('../../Database/Schemas/Economia/user.js');

module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    
    category: '「 Economia 」',
    usage: 'coinflip [valor]',
    permissions: ['Nenhuma.'],
    description: 'Apostar no jogo Cara Ou Coroa.',

    run: async (client, message, args) => {
        const userdb = await User.findOne({
            _id: message.author.id
        });
        
        if (userdb.cooldownc > Date.now()) {
            message.reply({
                content: `Você ja usou o comando de \`coinflip\`! Volte em <t:${parseInt(userdb.cooldownc / 1000)}:R>`
            })
            return;
        }
        
        const saldo = await User.findOne({
            _id: message.author.id
        });

        let valor = message.content.split(' ')[1];
        const arg2 = message.content.split(' ')[2];

        valor = parseInt(valor);

        if (isNaN(valor)) {
            message.reply({ content: "Você precisa colocar um valor válido." });
            return;
        }

        if (!arg2) {
            message.reply({ content: "Você precisa colocar `cara` ou `coroa`." });
            return;
        }

        if (valor <= 0) {
            message.reply({ content: "Coloque um valor inteiro e positivo." });
            return;
        }

        if (saldo.maxiums < valor) {
            message.reply({ content: "Você não tem saldo suficiente para apostar no coinflip." });
            return;
        }

        if (!(arg2.toLowerCase() === "cara" || arg2.toLowerCase() === "coroa")) {
            message.reply({
                content: "Escreva apenas `cara` ou `coroa`."
            });
            return;
        }
        
        if (valor > 6000) {
            message.reply({
                content: "Você só pode apostar ate \`6000 Maxiums\`."
            })
            return;
        }
        
        const chanceDeGanhar = 0.2;
        const ganhou = Math.random() < chanceDeGanhar;
        
        await User.updateOne({_id: message.author.id}, {
          $set: {
            "cooldownc": Date.now() + 300000
          },
        })
        
        if (ganhou) {
            const novoSaldo = saldo.maxiums + valor;

            await User.updateOne(
                { _id: message.author.id },
                { maxiums: novoSaldo }
            );

            message.reply({
                content: `${message.author}, você escolheu ${arg2.toLowerCase()} e acertou! Você ganhou ${valor} moedas.`
            });
        } else {
            const novoSaldo = saldo.maxiums - valor;

            await User.updateOne(
                { _id: message.author.id },
                { maxiums: novoSaldo }
            );

            const ladoSorteado = arg2.toLowerCase() === "cara" ? "coroa" : "cara";

            message.reply({
                content: `${message.author}, você escolheu ${arg2.toLowerCase()} e errou. O lado sorteado foi **${ladoSorteado}**. Você perdeu ${valor} moedas.`
            });
        }
    }
};