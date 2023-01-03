const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "interactionCreate",

    async execute(client, interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === "sistema_verificação") {
                const modal = new Discord.ModalBuilder()
                    .setCustomId('myModal1')
                    .setTitle('Preencha abaixo');

                const b_1 = new Discord.TextInputBuilder()
                    .setCustomId('id_cargo')
                    .setLabel("Digite o id do cargo.")
                    .setStyle(Discord.TextInputStyle.Short);

                const kkk = new Discord.ActionRowBuilder().addComponents(b_1);
                modal.addComponents(kkk);
                await interaction.showModal(modal);
            }
        }


        if (interaction.customId === 'myModal1') {
            if (!interaction.isModalSubmit()) return;
            const role_id = interaction.fields.getTextInputValue('id_cargo');
            try {
                const role = interaction.guild.roles.cache.get(role_id);

                if (role === undefined) {
                    return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`<:error:1053024015595352084> | Cargo invalído.`)
                                .setColor("Red")
                        ], ephemeral: true
                    });
                } else {
                    await db.set(`${interaction.guild.id}_role`, { verify: `${role.id}` }).then(() => {
                        return interaction.reply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setDescription(`<:check:1053023846229344388> | Cargo para verificção setado com sucesso!\nCargo: ${role}`)
                                    .setColor("Green")
                            ], ephemeral: true
                        });
                    })
                }
            } catch {
                return interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setDescription(`<:error:1053024015595352084> | Cargo invalído.`)
                            .setColor("Red")
                    ], ephemeral: true
                });
            }
        }

    }
}