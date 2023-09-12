import { SlashCommandAttachmentOption, SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const convert: Command = {
    data: new SlashCommandBuilder()
        .addAttachmentOption(
            new SlashCommandAttachmentOption()
                .setRequired(true)
                .setName("file")
                .setDescription("File to convert to PDF")
        )
        .setName("convert")
        .setDescription("Convert file from one type to another"),
    async execute(interaction, options, client) {
        const attachment = options[0];
        console.log(attachment);
        await interaction.reply({
            files: ["/Users/harbar20/Github/doc-pdf-bot/test.pdf"],
        });
    },
};

export default convert;

const builder = new SlashCommandBuilder();
