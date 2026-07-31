import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

client.on("messageCreate", (message)=>{
      if(message.author.bot) return ;
      message.reply({
            content:"hii from bot"
      })
});

client.on("interactionCreate",(intraction)=>{

})

client.login(process.env.DISCORD_TOKEN);