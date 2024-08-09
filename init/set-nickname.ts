import {Guild} from 'discord.js';

import {ExtendedClient} from '../classes/extendedclient';
import {config} from '../config';
import {logger} from '../logger';

export async function setNickname(client: ExtendedClient): Promise<void>{
  await client.guilds.cache.forEach(async (guild: Guild): Promise<void> => {
    try{
      // console.log(guild.members);
      const self = await guild.members.fetch({user: config.clientId, force: true});
      if(!self) throw Error('self not exist');
      await self.setNickname(config.nickname);
      logger.log(`Nickname had changed in guild: ${guild.name}`); 
    }catch(err: unknown){
      let message;
      if(err instanceof Error) message = err.message;
      else message = String(message);
      logger.error(`While executing setNickname, ${message}`);
    }
  });
}
