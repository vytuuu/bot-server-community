const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();


module.exports = {
    name: "interactionCreate",

    async execute(client, interaction) {

        if (interaction.isButton()) {
            if (interaction.customId === "auto_role") {

                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setDescription(`Digite o id do cargo.`)
                            .setColor("Blue")
                    ], ephemeral: true
                })


                const coletor = interaction.channel.createMessageCollector({
                    filter: i => i.author.id === interaction.user.id,
                    max: 1,
                })

                coletor.on('collect', async (mensagem) => {
                    try {
                        let mention_role = mensagem.content
                        let cargo = interaction.guild.roles.cache.get(mention_role)

                        if (cargo === undefined) {
                            interaction.editReply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setDescription(`❌ | Cargo inválido.`)
                                        .setColor("Red")
                                ],
                            }).then(() => { mensagem.delete() })
                        } else {

                            await db.set(`${mensagem.guild.id}_auto`, { AutoRole: `${mention_role}` })

                            interaction.editReply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setDescription(`\\✔️ | O Cargo <@&${mention_role}> foi adicionado ao AutoRole com sucesso.`)
                                        .setColor("Green")
                                ]
                            }).then(() => { mensagem.delete() })
                        }
                    } catch {
                        interaction.editReply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(`❌ | Cargo inválido.`)
                                    .setColor("Red")
                            ]
                        }).then(() => { mensagem.delete() })
                    }
                })
            }
        }
    }
}