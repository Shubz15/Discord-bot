import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import Url from "../models/Url.js";

export default {

    data: new SlashCommandBuilder()
        .setName("myurls")
        .setDescription("Shows all URLs created by you"),

    async execute(interaction) {

        await interaction.deferReply();

        const urls = await Url.find({
            discordId: interaction.user.id
        }).sort({
            createdAt: -1
        });

        if (urls.length === 0) {

            return interaction.editReply(
                "You have not created any short URLs yet."
            );

        }

        const embed = new EmbedBuilder()
            .setTitle("My URLs")
            .setColor("Blue");

        urls.forEach((url, index) => {

            embed.addFields({
                name: `${index + 1}. ${url.shortId}`,
                value:
                    `Original URL: ${url.originalUrl}\n` +
                    `Short URL: http://localhost:3000/${url.shortId}\n` +
                    `Clicks: ${url.clicks}`,
                inline: false
            });

        });

        await interaction.editReply({
            embeds: [embed]
        });

    }

};