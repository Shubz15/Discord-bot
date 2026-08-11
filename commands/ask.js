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

            const maxLength = 1900;

            if (answer.length <= maxLength) {

                await interaction.editReply(answer);

                return;
            }

            const chunks = [];

            for (let i = 0; i < answer.length; i += maxLength) {

                chunks.push(answer.substring(i, i + maxLength));

            }

            await interaction.editReply(chunks[0]);

            for (let i = 1; i < chunks.length; i++) {

                await interaction.followUp(chunks[i]);

            }

        } catch (error) {

            console.error("Gemini Error:", error);

            if (interaction.deferred) {

                await interaction.editReply(
                    "Unable to get a response from Gemini."
                );

            }

        }

    }

};