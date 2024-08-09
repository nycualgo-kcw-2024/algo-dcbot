import {logger} from '../logger';
import {ExtendedClient} from '../classes/extendedclient';

export async function sendReadyDM(client: ExtendedClient, adminId: string): Promise<void>{
  try{
    await (await client.users.fetch(adminId)).send(`service up at ${new Date()}`);
    logger.log('Service up message sent');
  }catch(err: unknown){
    logger.warning('sendReadyDM failed.');
  }
}