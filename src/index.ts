import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { commands } from "./commands";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    //Getting info from the message if it's not a live link
    const commandName = interaction.commandName;
    const options = interaction.options;

    //Getting the actual command
    const command = commands.get(commandName);
    if (!command) return;

    //Running the command
    await command.execute(interaction, options, client);
  }
});

client.login(process.env.TOKEN);
