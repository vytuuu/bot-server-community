const Discord = require("discord.js")
const config = require("../../../config")

module.exports = {
    name: "ping",
    description: "Veja a latência do bot",

    run: async (client, message) => {

        message.channel.send({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`📶 Calculando Latência...`)
            ]
        }).then((msg) => {
            setTimeout(() => {
                msg.edit({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor(config.cores.cor_padrão)
                            .setDescription(`📡 Meu ping está em **${client.ws.ping}ms**`)
                    ]
                })
            }, 2000);
        })

    }
}