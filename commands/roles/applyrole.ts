import discord, {
  CommandInteraction, 
  CommandInteractionOptionResolver,
  SlashCommandBuilder,
  SlashCommandRoleOption,
  SlashCommandStringOption,
  InteractionResponse,
  Role, APIRole
} from 'discord.js';

import {Command} from '../../classes/command';
import {logger} from '../../logger';

type CIOR = CommandInteractionOptionResolver;

function isRole(role: Role | APIRole): role is Role {
  return role['id'] !== null;
}

class ApplyRole extends Command{
  get name(){return "applyrole";}
  get description(){return "Apply roles to every member. (Note. up to 1000 members)";}
  async execute(interaction: CommandInteraction): Promise<void>{
    try{
      let role = (interaction.options as CIOR).getRole('role');
      if(!role || !isRole(role))
        throw Error('role not exist');

      if(!interaction.guild || !interaction.guild.id || !interaction.guild.name) 
        throw Error('guild not exist');

      await interaction.reply('Start applying.');
      let counter: number = 0;
      
      const memberList = await interaction.guild.members.fetch();
      logger.debug('fetch done');

      await memberList.each(async member => {
        if (!role)
          throw Error('role not exist');
        if (!interaction.guild)
          throw Error('guild not exist');
        console.log(`${role.id}, ${member}`);

        await interaction.guild.members.addRole({
          role: role.id,
          user: member,
        });
        logger.log(`role ${role} has been added to ${member}.`);
        counter += 1;
        if (counter % 10 === 0)
          await interaction.editReply(`${counter} applied.`);
      });
      await interaction.editReply(`All ${counter} applied.`);
      logger.log(`All ${counter} applied.`);
      
    }catch(err: unknown){
      let message;
      if(err instanceof Error) message = err.message;
      else message = String(message);
      logger.error(`While executing "/applyrole", ${message}`);
      await interaction.reply({content: `While executing "/applyrole", ${message}`});
    }
  }
  override build(): SlashCommandBuilder | 
    Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">{
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addRoleOption((option: SlashCommandRoleOption) => option
        .setName('role')
        .setDescription('The role given.')
        .setRequired(true)
      )
  }
};

export const command = new ApplyRole();
