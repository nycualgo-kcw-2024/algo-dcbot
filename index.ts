import {Events, GatewayIntentBits, Partials, ActivityType} from 'discord.js';

//  Global config
import {config} from './config';

//  Classes
import {ExtendedClient} from './classes/extendedclient'

//  Initialization functions
import {setNickname} from './init/set-nickname';
import {loadCommands} from './init/load-commands';
import {registerCommands} from './init/register-commands';
import {sendReadyDM} from './init/ready-dm';

//  Event-handling functions
import {handleCommands} from './events/handle-commands';
import {handleMemberAdd} from './events/handle-member-add';

//  Sub-services
import {logger} from './logger';

const client = new ExtendedClient({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
  ],
  partials:[
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ]
});

client.login(config.token);

//  Event handling
client.on(Events.InteractionCreate, handleCommands);
client.on(Events.GuildMemberAdd, handleMemberAdd);

//  Initialization
client.once(Events.ClientReady, async c => {
  logger.info(`Logged in as ${c.user.tag}`);

  if(client.user){
    client.user.setPresence({
      activities: [{
        name: config.playing,
        type: ActivityType.Playing,
      }],
      status: 'online'
    });
    logger.info('Set status done');
  }
  
  await setNickname(client);
  logger.info(`Set nickname as ${config.nickname}`);

  const commands = await loadCommands(client);
  logger.info(`${commands.length} commands loaded.`);

  const regCmdCnt = await registerCommands(commands);
  logger.info(`${regCmdCnt} commands registered.`);

  logger.info(`Ready!`);
  await sendReadyDM(client, config.adminId);
});
