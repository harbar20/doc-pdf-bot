import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";
import { commands } from "./commands";

dotenv.config();

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN ?? "");

(async () => {
    try {
        console.log(
            `Started refreshing ${commands.size} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(process.env.APPLICATION_ID ?? ""),
            { body: commands.map((command) => command.data.toJSON()) }
        );

        console.log(`Successfully reloaded ${data} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
