const Discord = require("discord.js")


module.exports = {
    name: "configurar",
    description: "Configurar Sistemas",

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
                        .setDescription(`Clique no botão de acordo com oque você deseja configurar.`)
                        .setColor("Gold")
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("membro_novo")
                                .setLabel("Sistema de boas vindas")
                                .setStyle(2)
                                .setEmoji("🏠"),
                            new Discord.ButtonBuilder()
                                .setCustomId("auto_role")
                                .setLabel("Sistema de AutoRole")
                                .setStyle(2)
                                .setEmoji("🌵"),
                            new Discord.ButtonBuilder()
                                .setCustomId("sistema_verificação")
                                .setLabel("Sistema de Verificação")
                                .setStyle(2)
                                .setEmoji("🏆"),
                        )
                ], ephemeral: true
            })
        }
    }
}