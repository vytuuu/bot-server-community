const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "interactionCreate",

    async execute(client, interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "Verificar") {
                let role = await db.get(`${interaction.guild.id}_role.verify`);
                let cargo = interaction.guild.roles.cache.get(role)

                if (!role) {
                    return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`<:error:1053024015595352084> | Cargo não configurado.`)
                                .setColor("Red")
                        ], ephemeral: true
                    });
                } else if (cargo === undefined) {
                    return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`<:error:1053024015595352084> | Cargo configurado é invalído.`)
                                .setColor("Red")
                        ], ephemeral: true
                    });
                } else {

                    interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false, ViewChannel: true })
                    interaction.channel.permissionOverwrites.edit(interaction.user, { SendMessages: true })
                    interaction.channel.permissionOverwrites.edit(cargo.id, { ViewChannel: false })

                    const { Captcha } = require("captcha-canvas")

                    const captcha = new Captcha()
                    captcha.async = false
                    captcha.addDecoy()
                    captcha.drawTrace()
                    captcha.drawCaptcha()

                    const attachment = new Discord.AttachmentBuilder(captcha.png, "captcha.png")

                    interaction.reply({
                        content: `<a:loading:1053023784057192488> | **${interaction.user.tag},** Para se verificar digite oque você vê.`,
                        files: [attachment],
                        ephemeral: true
                    }).catch(() => {
                        interaction.reply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(`<:error:1053024015595352084> | Sua DM está bloqueada.`)
                                    .setColor("Red")
                            ], ephemeral: true
                        })
                    })


                    const coletor = interaction.channel.createMessageCollector({
                        filter: i => i.author.id === interaction.user.id,
                        max: 1,
                    })

                    coletor.on("collect", async (mensagem) => {
                        if (!mensagem.content.startsWith(captcha.text)) {
                            mensagem.delete()
                            interaction.channel.permissionOverwrites.delete(interaction.user);

                            coletor.stop()
                            interaction.editReply({
                                content: ``,
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor("Red")
                                        .setDescription(`<:error:1053024015595352084> | Captcha digitado incorretamente.\nObs: Atenção com as maiúsculas e minúsculas`)
                                ],
                                files: []
                            }).then(() => {
                                setTimeout(() => {
                                    interaction.deleteReply()
                                }, 7000);
                            })
                        } else {
                            await mensagem.member.roles.add(cargo).then(async () => {
                                mensagem.delete()
                                interaction.channel.permissionOverwrites.delete(interaction.user);

                                interaction.editReply({
                                    content: ``,
                                    embeds: [
                                        new Discord.EmbedBuilder()
                                            .setColor("Green")
                                            .setDescription(`<:check:1053023846229344388> | Você foi verificado no servidor com sucesso!`)
                                    ],
                                    files: []
                                }).then(() => {
                                    setTimeout(() => {
                                        interaction.deleteReply()
                                    }, 3000);
                                })
                            })
                        }
                    })
                }
            }
        }





    }
}