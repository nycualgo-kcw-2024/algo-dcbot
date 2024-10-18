import discord, {
  GuildMember, PartialGuildMember
} from 'discord.js';

import {logger} from '../logger';
import {config} from '../config';

function isMember(
  member: GuildMember | PartialGuildMember
): member is GuildMember {
  return member.partial === false;
}

export async function handleMemberAdd(
  member: GuildMember
): Promise<void>{
  try{
    if(config.clientId === member.id) return;
    if(member.partial)
      member = await member.fetch();
    if(!isMember(member))
      throw Error('type mismatch: member.partial');

    await member.guild.members.addRole({
      role: config.defaultRole,
      user: member
    });
    logger.log(`${member} has been given role.`);
  }catch(err: unknown){
    let message;
    if(err instanceof Error) message = err.message;
    else message = String(message);
    logger.error(`While executing "handle-autorole", ${message}`);
  }
}
