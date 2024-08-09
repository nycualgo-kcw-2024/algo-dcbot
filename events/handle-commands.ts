import {Interaction} from 'discord.js';

import {isExtendedClient} from '../classes/extendedclient';
import {logger} from '../logger';

export async function handleCommands(interaction: Interaction): Promise<void>{
  if(!interaction.isChatInputCommand()) return;
  if(interaction.commandName === null)
    throw logger.error('interaction.commandName not exist');
  if(!isExtendedClient(interaction.client))
    throw logger.error(`Type Error in function "handleCommands"`);

  const command = interaction.client.commands.get(interaction.commandName);
  if(!command)
    throw logger.error(`No command matching ${interaction.commandName} was found.`);

  try{
    if('execute' in command)
      await command.execute(interaction);
    else{
      logger.error(`The command (${interaction.commandName}) is missing a require "execute" function`);
      return;
    }
  }catch(err: unknown){
    if(interaction.replied || interaction.deferred)
      await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
    else
      await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    throw logger.error(`While handling "${interaction.commandName}, ${err}"`);
  }
}
