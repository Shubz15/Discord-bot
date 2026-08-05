import { SlashCommandBuilder } from "discord.js";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

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

        await interaction.deferReply();

        const originalUrl = interaction.options.getString("url");

        // Validate URL
        try {
            new URL(originalUrl);
        } catch (err) {
            return interaction.editReply("Please enter a valid URL.");
        }

        // Check if URL already exists
        let existingUrl = await Url.findOne({
            originalUrl,
            discordId: interaction.user.id,
        });

        if (existingUrl) {

            return interaction.editReply(
                `Short URL already exists:\nhttp://localhost:3000/${existingUrl.shortId}`
            );

        }

        // Generate short id
        const shortId = nanoid(6);

        // Save to MongoDB
        const newUrl = await Url.create({

            discordId: interaction.user.id,

            originalUrl,

            shortId,

            clicks: 0,

        });

        await interaction.editReply(

            `Short URL Created Successfully.\n\n` +
            `Original URL:\n${newUrl.originalUrl}\n\n` +
            `Short URL:\nhttp://localhost:3000/${newUrl.shortId}`

        );

    },

};