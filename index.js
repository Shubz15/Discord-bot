import express from "express";
import "dotenv/config";
import { Client, Collection, GatewayIntentBits } from "discord.js";

import connectDB from "./config/database.js";

import readyEvent from "./events/ready.js";
import messageEvent from "./events/messageCreate.js";
import interactionEvent from "./events/interactionCreate.js";

import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const app = express();

app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express Server Running on Port ${PORT}`);
});

client.login(process.env.DISCORD_TOKEN);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();

await connectDB();

// Load Commands
const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);

    const command = await import(pathToFileURL(filePath).href);

    client.commands.set(command.default.data.name, command.default);

    console.log("Loaded Command:", command.default.data.name);

}

readyEvent(client);
messageEvent(client);
interactionEvent(client);

client.login(process.env.DISCORD_TOKEN);