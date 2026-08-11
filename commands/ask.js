import { SlashCommandBuilder } from "discord.js";
import { askGemini } from "../services/gemini.service.js";

export default {

    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask Gemini a question")
        .addStringOption(option =>
            option
                .setName("question")
                .setDescription("Enter your question")
                .setRequired(true)
        ),

    async execute(interaction) {

        await interaction.deferReply();

        try {

            const question = interaction.options.getString("question");

            const answer = await askGemini(question);

            await interaction.editReply(answer);

        } catch (error) {

            console.error("Gemini Error:", error);

            await interaction.editReply(
                "Unable to get a response from Gemini."
            );

        }

    }

};