const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "guildMemberAdd",

    async execute(client, member) {
        let channel = await db.get(`${member.guild.id}_canal.boas_vindas`)
        let imagem = await db.get(`${member.guild.id}_imagem.boas_vindas`)

        if (!channel) {
            return;
        } else if (!imagem) {
            return;
        } else {
            let canal = member.guild.channels.cache.get(channel)
            try {
                canal.send({
                    content: `${member.user}`,
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setAuthor({ name: `👤 ` + member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                            .setColor("Random")
                            .setImage(imagem)
                            .setDescription(`🏠 Seja Bem vindo(a) **${member.user.username}**!

> 📚 **leia nossas diretrizes, para evitar ser punido(a) em nosso servidor.**

💘 **${member.user.tag},** Sabia que você é o **${member.guild.memberCount}º** membro aqui no servidor?`)
                            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
                            .setFooter({ text: `ID do usuário: ` + member.user.id })
                    ]
                })
            } catch {
                return;
            }
        }
    }
}