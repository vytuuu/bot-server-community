const { ChannelType } = require('discord.js')
const { prefix } = require('../../config')
const config = require("../../config")
const Discord = require("discord.js")

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
     
        try {
            if (message.author.bot) return;
            if (message.channel.type === ChannelType.DM) return;
            if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
            if (!message.content.startsWith(prefix)) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const commandName = args.shift().toLowerCase()
            const command = client.commands.get(commandName) || client.commands.find(c => c.aliases?.includes(commandName))

            if (!command) return;

            if (command.ownerOnly) {
                if (message.author.id !== client.config.ownerID) {
                    return;
                }
            }

            command.run(client, message, args)
        } catch (error) {
            message.channel.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setFooter({ text: "Erro Detectado" })
                        .setColor("Red")
                        .setDescription(`\`\`\`js\n${err}\n\`\`\``)
                ]
            })
        }

    }
}