import DiscordJS, { Intents, Interaction } from "discord.js"
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on("ready", ()=>{
    console.log("the bot is ready")
    
    const guildId="921380008805679185"
    const guild=client.guilds.cache.get(guildId)
    let commands
    
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }
    
    commands?.create({
        name:"ping",
        description: "replies with pong"
    })
})

client.on("interactionCreate",async (interaction) => {
    if (!interaction.isCommand()){
        return
    }
    const{ commandName, options } = interaction

    if(commandName === "ping"){
        interaction.reply({
            content: "pong",
            ephemeral: true
        })
    }
})

client.login(process.env.TOKEN)