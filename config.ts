import dotenv from 'dotenv';

dotenv.config();

export const config = {
  token: process.env.DC_TOKEN!,
  clientId: process.env.DC_CLIENTID!,
  adminId: process.env.ADMIN_ID ?? '',
  nickname: '橘ありす',
	playing: 'アイドルマスター シンデレラガールズ U149',
	defaultRole: process.env.DEFAULT_ROLE ?? '',
  urls: {
    author: 'https://konchin.com',
    icon: 'https://secure.gravatar.com/avatar/c35f2cb664f366e3e3365b9c22216834?d=identicon&s=512',
    help: '',
    git: 'https://git.konchin.com/discord-bot/Tanikaze-Amane',
    issue: 'https://git.konchin.com/discord-bot/Tanikaze-Amane/issues'
  },
  logger: {
    logFile: 'test.log',
  },
};
