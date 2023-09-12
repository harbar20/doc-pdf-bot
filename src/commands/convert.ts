import { SlashCommandBuilder } from "discord.js";
import { Command } from "../types";

const convert: Command = {
    data: new SlashCommandBuilder()
        .setName("convert")
        .setDescription("Convert file from one type to another"),
    async execute(interaction, options, client) {
        await interaction.reply("Test test 123");
    },
};

export default convert;

const builder = new SlashCommandBuilder();
