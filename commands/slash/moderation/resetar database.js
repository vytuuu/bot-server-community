const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "resetar",
    description: "Resetar DataBase",
    options: [
        {
            name: "database",
            description: "Resetar DataBase",
            type: Discord.ApplicationCommandOptionType.Subcommand,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`:x: | Você não possui permissão para executar este comando.`)
                ], ephemeral: true
            })
        } else {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Yellow")
                        .setDescription(`Tem certeza que deseja resetar a database?, **essa ação é irreversível!**`)
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("sim_quero")
                                .setEmoji("✅")
                                .setLabel("Confirmar")
                                .setStyle(Discord.ButtonStyle.Success),
                            new Discord.ButtonBuilder()
                                .setCustomId("recusei")
                                .setEmoji("❌")
                                .setLabel("Cancelar")
                                .setStyle(Discord.ButtonStyle.Danger)
                        )
                ], ephemeral: true
            })

            const coletor = interaction.channel.createMessageComponentCollector({ time: 60000 })

            coletor.on('collect', async reponse => {
                if (reponse.customId === "sim_quero") {

                    db.deleteAll().then(() => {
                        interaction.editReply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(`A database foi formatada com sucesso.`)
                                    .setColor("Green")
                            ], components: []
                        }).then(() => {
                            setTimeout(() => {
                                interaction.deleteReply()
                            }, 7000)
                        })
                    })

                } else if (reponse.customId === "recusei") {
                    interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`Ação Cancelada com sucesso.`)
                                .setColor("Red")
                        ], components: []
                    }).then(() => {
                        setTimeout(() => {
                            interaction.deleteReply()
                        }, 7000)
                    })
                    
                }

                coletor.on('end', () => { })
            })

        }
    }
}