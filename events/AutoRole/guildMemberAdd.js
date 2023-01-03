const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const chalk = require("chalk")

module.exports = {
    name: "guildMemberAdd",

    async execute(client, member) {
        let role = await db.get(`${member.guild.id}_auto.AutoRole`)

        if (!role) {
            return;
        } else {
            member.roles.add(role).then(() => {
                console.log(`${chalk.blueBright(`[AUTO ROLE]`)} ${chalk.magentaBright(`${member.user.tag} entrou em [ ${member.guild.name} ]`)}`)
               
                /*
                    setTimeout(() => {
                        console.clear()
                    }, 10000);
                    */
            })
        }
    }
}