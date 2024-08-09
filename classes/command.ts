import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  CommandInteraction
} from 'discord.js';

export interface Component{
  execute(interaction: unknown): Promise<void>;
  build(): unknown;
};

export abstract class Command implements Component{
  abstract get name(): string;
  abstract get description(): string;
  abstract execute(interaction: CommandInteraction): Promise<void>;
  build(): 
    SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder | 
    Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">{
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
  }
};