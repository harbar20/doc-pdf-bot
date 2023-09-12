import { SlashCommandAttachmentOption, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import { Command } from "../types";
import convert from "../convert";

const convertCommand: Command = {
    data: new SlashCommandBuilder()
        .addAttachmentOption(
            new SlashCommandAttachmentOption()
                .setRequired(true)
                .setName("file")
                .setDescription("File to convert to PDF")
        )
        .setName("convert")
        .setDescription("Convert file from one type to another"),
    async execute(interaction, client) {
        const attachment = interaction.options.get("file");
        const file = attachment?.attachment?.url;
        const inputFilePath = `${interaction.id}.docx`;
        const outputFilePath = `${interaction.id}-out.pdf`;

        if (!file) {
            await interaction.reply(":x: File not found. Please try again.");
            return;
        }

        await interaction.deferReply();

        convert(file, inputFilePath, outputFilePath, async () => {
            await interaction.editReply({
                files: [outputFilePath],
            });

            fs.unlinkSync(inputFilePath);
            fs.unlinkSync(outputFilePath);
        });
    },
};

export default convertCommand;

const builder = new SlashCommandBuilder();
