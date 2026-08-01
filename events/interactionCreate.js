import { Events } from "discord.js";

export default (client) => {

    client.on(Events.InteractionCreate, async (interaction) => {

        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {

            await command.execute(interaction);

        } catch (error) {

            console.error(error);

            if (interaction.replied || interaction.deferred) {

                await interaction.followUp({
                    content: "Something went wrong.",
                    ephemeral: true,
                });

            } else {

                await interaction.reply({
                    content: "Something went wrong.",
                    ephemeral: true,
                });

            }

        }

    });

};