import { SlashCommandBuilder } from "discord.js";

export default {

    data: new SlashCommandBuilder()
        .setName("create")
        .setDescription("Create a short URL")
        .addStringOption(option =>
            option
                .setName("url")
                .setDescription("Enter a long URL")
                .setRequired(true)
        ),

    async execute(interaction) {

        const url = interaction.options.getString("url");

        await interaction.reply(
            `Generating short URL for:\n${url}`
        );

    },

};