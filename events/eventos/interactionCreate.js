const { InteractionType } = require("discord.js")
const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    PermissionsBitField,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SelectMenuBuilder,
    Client,
    ChannelType,
    ChannelManager,
    SelectMenuInteraction,
    AttachmentBuilder
} = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    /**
    * 
    * @param {ChatInputCommandInteraction} interaction
    * @param {SelectMenuInteraction} interaction
    */
    async execute(client, interaction) {

        if (interaction.type === InteractionType.ApplicationCommand) {
            const slashcommand = client.slashCommands.get(interaction.commandName)
            
            if (slashcommand.ownerOnly) {
                if (!client.config.ownerID.includes(interaction.user.id)) {
                    return interaction.reply({ content: "Este comando é apenas para `CEO/DEVELOPER` do bot!", ephemeral: true });
                }
            }

            if (!slashcommand) return interaction.reply(`Error`);
            interaction["member"] = interaction.guild.members.cache.get(interaction.user.id)
            slashcommand.run(client, interaction)
        }
    }
}