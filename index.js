import "dotenv/config";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import connectDB from "./config/database.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

await connectDB();

import readyEvent from "./events/ready.js";
import messageEvent from "./events/messageCreate.js";
import interactionEvent from "./events/interactionCreate.js";

readyEvent(client);
messageEvent(client);
interactionEvent(client);

client.login(process.env.DISCORD_TOKEN);