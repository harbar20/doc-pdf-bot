import { Collection } from "discord.js";
import { Command } from "../types";
import convertCommand from "./convert";

//Aggregating all the commands
const commandsArr: Command[] = [convertCommand];

//Creating the Collection
let commands: Collection<string, Command> = new Collection();
for (let command of commandsArr) {
    commands.set(command.data.name, command);
}

export { commands, commandsArr };
