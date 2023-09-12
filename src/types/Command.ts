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
        client: Client
    ) => Promise<void>;
};

export default Command;
