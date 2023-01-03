const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`${chalk.greenBright(`[SYSTEM]`)} ${chalk.yellowBright(`${client.user.tag} Está online.`)}`)
        console.log(`${chalk.greenBright(`[SYSTEM]`)} ${chalk.yellowBright(`DataBase conectada.`)}`)

        let status = [
            `Sollar Store`,
        ],
            i = 0
        setInterval(() => {
            client.user.setActivity(`${status[i++ % status.length]}`, {
                type: 2,
            })
        }, 15000)
        client.user.setStatus('idle')
    }
}