import {CommandInteraction} from 'discord.js';
import {Command} from '../../classes/command';

class Ping extends Command{
  get name(){return "ping";}
  get description(){return "Reply with the RTT of this bot.";}
  async execute(interaction: CommandInteraction): Promise<void>{
    const sent = await interaction.reply({
      content: "Pinging...",
      ephemeral: true,
      fetchReply: true, 
    });
    await interaction.editReply(`Roundtrip latency: ${
      sent.createdTimestamp - interaction.createdTimestamp
    }ms`);
  }
};

export const command = new Ping();
