const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "interactionCreate",

    async execute(client, interaction) {

        if (interaction.isButton()) {
            if (interaction.customId === "membro_novo") {

                const modal = new Discord.ModalBuilder()
                    .setCustomId('modal_bem_vindo')
                    .setTitle('Preencha abaixo.');

                const canal_membro = new Discord.TextInputBuilder()
                    .setCustomId('canal_membro')
                    .setLabel("Digite o id do canal")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                const imagem = new Discord.TextInputBuilder()
                    .setCustomId('imagem_membro')
                    .setLabel("Cole a url da imagem.")
                    .setRequired(true)
                    .setStyle(Discord.TextInputStyle.Short)

                const canal_membros = new Discord.ActionRowBuilder().addComponents(canal_membro)
                const imagem_membro = new Discord.ActionRowBuilder().addComponents(imagem)

                modal.addComponents(canal_membros, imagem_membro)
                await interaction.showModal(modal)

            }
        }


        if (interaction.customId === 'modal_bem_vindo') {
            if (!interaction.isModalSubmit()) return
            try {
                const canal_membro = interaction.fields.getTextInputValue('canal_membro')
                const imagem = interaction.fields.getTextInputValue('imagem_membro')
                let canal = interaction.guild.channels.cache.get(canal_membro)

                if (canal === undefined) {
                    return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Red")
                                .setDescription(`:x: | Canal invalído.`)
                        ], ephemeral: true
                    })
                } else if (Discord.ChannelType.GuildText !== canal.type) {
                    return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Red")
                                .setDescription(`:x: | Digite um canal de texto valído.`)
                        ], ephemeral: true
                    })
                } else {

                    let embed = new Discord.EmbedBuilder()
                        .setColor("Green")
                        .setImage(imagem)

                    await db.set(`${interaction.guild.id}_canal`, { boas_vindas: `${canal.id}` }).then(() => { embed.addFields({ name: `💬 Canal de boas vindas:`, value: `${canal}` }) })
                    await db.set(`${interaction.guild.id}_imagem`, { boas_vindas: `${imagem}` })
                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                }
            } catch (erro) {
                return interaction.reply({
                    embed: [
                        new Discord.EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`<:error:1053024015595352084> | Ocorreu um erro.\n\`\`\`js\n${erro}\n\`\`\``)
                    ], ephemeral: true
                })

            }
        }
    }
}