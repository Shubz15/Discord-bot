import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import User from "../models/User.js";

export default {

    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Shows your profile"),

    async execute(interaction) {

        const user = await User.findOne({
            discordId: interaction.user.id,
        });

        if (!user) {
            return interaction.reply({
                content: "❌ User not found!",
                ephemeral: true,
            });
        }

        // ✅ Create the Embed HERE
        const embed = new EmbedBuilder()
            .setTitle("👤 User Profile")
            .setColor("Blue")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                {
                    name: "Username",
                    value: user.username,
                    inline: true,
                },
                {
                    name: "Level",
                    value: `${user.level}`,
                    inline: true,
                },
                {
                    name: "XP",
                    value: `${user.xp}`,
                    inline: true,
                },
                {
                    name: "Coins",
                    value: `${user.coins}`,
                    inline: true,
                }
            )
            .setFooter({
                text: "Discord Bot",
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
        });

    },

};