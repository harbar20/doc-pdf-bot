import {
    Attachment,
    Client,
    CommandInteractionOptionResolver,
    GatewayIntentBits,
} from "discord.js";
import * as dotenv from "dotenv";
import fs from "fs";
import { commands } from "./commands";
import convert from "./convert";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const inputFiles: string[] = [];
    const outputFiles: string[] = [];
    if (message.attachments.size != 0) {
        const file = Object.values(message.attachments.toJSON())[0]?.url;

        if (!file) {
            await message.reply({
                content: ":x: File not found. Please try again.",
            });
            return;
        }

        const inputFilePath = `${message.id}.docx`;
        const outputFilePath = `${message.id}-out.pdf`;

        await convert(file, inputFilePath, outputFilePath, async () => {
            inputFiles.push(inputFilePath);
            outputFiles.push(outputFilePath);
        });

        setTimeout(async () => {
            // Sending the converted files back
            await message.reply({
                content: `Files converted!`,
                files: outputFiles,
            });

            // Deleting the files once we're done with them
            inputFiles.forEach((filePath) => {
                fs.unlinkSync(filePath);
            });
            outputFiles.forEach((filePath) => {
                fs.unlinkSync(filePath);
            });
        }, 5000);
    }
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        //Getting info from the message if it's not a live link
        const commandName = interaction.commandName;

        //Getting the actual command
        const command = commands.get(commandName);
        if (!command) return;

        //Running the command
        await command.execute(interaction, client);
    }
});

client.login(process.env.TOKEN);
