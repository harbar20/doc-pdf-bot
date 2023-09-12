import {
    SlashCommandAttachmentOption,
    SlashCommandBuilder,
    Attachment,
} from "discord.js";
import axios from "axios";
import fs from "fs";
import path from "node:path";
import * as unoconv from "awesome-unoconv";
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
    async execute(interaction, client) {
        const attachment = interaction.options.get("file");
        const file = attachment?.attachment?.url;
        const inputFilePath = `${interaction.id}.docx`;
        const outputFilePath = `${interaction.id}-out.pdf`;

        await interaction.deferReply();

        await axios
            .get(file ?? "", {
                responseType: "stream",
            })
            .then(async (response) => {
                // Pipe the response stream to a writable stream to save it as a local file
                await response.data.pipe(
                    fs.createWriteStream(`${interaction.id}.docx`)
                );

                // Listen for the 'close' event to know when the file has been saved
                await response.data.on("close", async () => {
                    console.log(
                        `File "${interaction.id}.docx" has been saved.`
                    );

                    await unoconv.convert(
                        path.resolve(inputFilePath),
                        path.resolve(outputFilePath)
                    );

                    await interaction.editReply({
                        files: [outputFilePath],
                    });

                    fs.unlinkSync(inputFilePath);
                    fs.unlinkSync(outputFilePath);
                });
            });
    },
};

export default convert;

const builder = new SlashCommandBuilder();
