import {
    Client,
    CommandInteraction,
    CommandInteractionOptionResolver,
    SlashCommandBuilder,
} from "discord.js";

type Command = {
    data: SlashCommandBuilder;
    execute: (
        interaction: CommandInteraction,
        options: any,
        client: Client
    ) => Promise<void>;
};

export default Command;
