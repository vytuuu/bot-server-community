const { token } = require("./config");
const fs = require("fs");
const { GatewayIntentBits, Client, Collection, InteractionType } = require('discord.js')
const Discord = require("discord.js")
const config = require("./config")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const chalk = require('chalk');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

client.login(token).catch(() => {
  console.log(`${chalk.greenBright(`[SYSTEM]`)} ${chalk.redBright(`TOKEN NÃO CONFIGURADO.`)}`)
})
client.config = require('./config')
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync(`./commands/prefix/`);

fs.readdirSync('./commands/prefix/').forEach(local => {
  const comandos = fs.readdirSync(`./commands/prefix/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of comandos) {
    let puxar = require(`./commands/prefix/${local}/${file}`)

    if (puxar.name) {
      client.commands.set(puxar.name, puxar)
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
  }
});

fs.readdirSync('./events/').forEach(local => {
  const eventos = fs.readdirSync(`./events/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of eventos) {
    let events = require(`./events/${local}/${file}`)
    if (events.once) {
      client.once(events.name, (...args) => events.execute(client, ...args))
    } else {
      client.on(events.name, (...args) => events.execute(client, ...args))
    }
  }
})



const SlashsArray = []
fs.readdirSync('./commands/slash/').forEach(local => {
  const scomandos = fs.readdirSync(`./commands/slash/${local}`).filter(arquivo => arquivo.endsWith('.js'))

  for (let file of scomandos) {
    const slashcommand = require(`./commands/slash/${local}/${file}`)

    if (slashcommand.name) {
      client.slashCommands.set(slashcommand.name, slashcommand);
      SlashsArray.push(slashcommand)
    }
  }
})


client.on("ready", async () => {
  await client.application.commands.set(SlashsArray).then(() => {
    console.log(`${chalk.whiteBright(`[SLASH COMMANDS]`)} ${chalk.blackBright(`Comandos Carregados!`)}`)
  })
})

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
})
process.on("unhandledRejection", (reason, promise) => {
  console.log(`${chalk.redBright("[ERRO DETECTADO]")}`, promise, `${chalk.redBright(reason.message)}`)
})
