import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Token and client id can be found in Discord Developer Protol.
  token: process.env.DC_TOKEN!,
  clientId: process.env.DC_CLIENTID!,
  
  // The user that the bot will DM when starts.
  adminId: process.env.ADMIN_ID ?? '',
  
  nickname: '橘ありす',
  playing: 'アイドルマスター シンデレラガールズ U149',
  logger: {
    logFile: 'test.log',
  },
  
  // The default role id to apply when new member join.
  // Can be obtained in Discord from right clicking the role.
  defaultRole: process.env.DEFAULT_ROLE ?? '',
};
