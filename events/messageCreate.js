import { Events } from "discord.js";

export default (client) => {

    client.on(Events.MessageCreate, async (message) => {

        if (message.author.bot) return;

        if (!message.guild) return;

        if (message.content.startsWith("create")) {

            const url = message.content.split("create")[1].trim();

            return message.reply({
                content: `Generating Short URL for\n${url}`,
            });

        }

        message.reply("Hiii");
    });

};