import {REST, Routes} from 'discord.js';

import {config} from '../config';
import {logger} from '../logger';

function isArray<T>(data: unknown): data is Array<T>{
  return (data as Array<T>).length !== undefined;
}

export async function registerCommands(commands: Array<string>): Promise<number>{
  const rest = new REST().setToken(config.token);
  try{
    const data = await rest.put(
      Routes.applicationCommands(config.clientId),
      {body: commands},
    );
    if(!isArray(data)) throw Error('Type error');
    return data.length;
  }catch(err: unknown){
    let message;
    if(err instanceof Error) message = err.message;
    else message = String(message);
    logger.error(`While executing "registerCommands", ${message}`);
    return -1;
  }
}