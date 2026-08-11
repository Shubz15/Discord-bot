import { Events } from "discord.js";

export default (client) => {

    client.on(Events.InteractionCreate, async (interaction) => {

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.log("Command not found:", interaction.commandName);
            return;
        }

        try {

            await command.execute(interaction);

        } catch (error) {

            console.error("Command Error:", error);

            if (interaction.deferred) {

                await interaction.editReply(
                    "Something went wrong."
                );

            } else if (!interaction.replied) {

                await interaction.reply({
                    content: "Something went wrong.",
                    flags: 64
                });

            }

        }

    });

};