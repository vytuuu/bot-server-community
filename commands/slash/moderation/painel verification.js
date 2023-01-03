const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "painel",
    description: "Enviar painel de verificação.",
    options: [
        {
            name: "verificação",
            description: "Enviar painel de verificação.",
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Selecione um canal.",
                    type: Discord.ApplicationCommandOptionType.Channel,
                },
            ],
        },
    ],

    run: async (client, interaction) => {
        let channel = interaction.options.getChannel("channel") || interaction.channel;
        let role = await db.get(`${interaction.guild.id}_role.verify`);

        if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`<:error:1053024015595352084> | Você não pussui permissão.`)
                ], ephemeral: true
            })
        } else if (!role) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`<:error:1053024015595352084> | Cargo não configurado.`)
                        .setColor("Red")
                ], ephemeral: true
            });
        } else if (Discord.ChannelType.GuildText !== channel.type) {
            return interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`<:error:1053024015595352084> | Selecione um canal de texto.`)
                ], ephemeral: true
            })
        } else {

            channel.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setDescription(`<:check:1053023846229344388> | Clique no botão abaixo para se verificar no servidor.`)
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("Verificar")
                                .setLabel("Verificar-se")
                                .setStyle(Discord.ButtonStyle.Success)
                        )
                ]
            }).then(() => {
                interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor("Green")
                            .setDescription(`<:check:1053023846229344388> | Painel enviado com sucesso!`)
                    ], ephemeral: true
                })
            })





        }
    }
}