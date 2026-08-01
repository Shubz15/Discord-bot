import "dotenv/config";
import { REST, Routes } from "discord.js";

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
];

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

try {

    console.log("Registering Commands...");

    await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
    );

    console.log("Commands Registered");

} catch (err) {

    console.log(err);

}