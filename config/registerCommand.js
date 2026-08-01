import "dotenv/config";
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, "../commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);

    const command = await import(pathToFileURL(filePath).href);

    if (command.default.data && command.default.execute) {

        commands.push(command.default.data.toJSON());

        console.log("Loaded Command:", command.default.data.name);

    } else {

        console.log(file + " is missing data or execute.");

    }

}

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

try {

    console.log("Registering Commands...");

    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        {
            body: commands,
        }
    );

    console.log("Commands Registered Successfully.");

} catch (error) {

    console.log(error);

}