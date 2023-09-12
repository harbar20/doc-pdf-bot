import { Collection } from "discord.js";
import { Command } from "../types";
import convert from "./convert";

//Aggregating all the commands
const commandsArr: Command[] = [convert];

//Creating the Collection
let commands: Collection<string, Command> = new Collection();
for (let command of commandsArr) {
  commands.set(command.data.name, command);
}

export { commands, commandsArr };
