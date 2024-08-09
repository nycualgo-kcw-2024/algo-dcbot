import {
  Client,
  Collection,
  ClientOptions,
} from 'discord.js';

import {Command} from './command'

export function isExtendedClient(client: Client): client is ExtendedClient{
  return (client as ExtendedClient).commands !== undefined;
}

export class ExtendedClient extends Client{
  public commands: Collection<string, Command>;
  constructor(
    opts: ClientOptions, 
    cmds = new Collection<string, Command>()
  ){
    super(opts);
    this.commands = cmds;
  }
};