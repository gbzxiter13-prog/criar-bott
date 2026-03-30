const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log('🔥 BOT ONLINE');
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  // 🔥 LOG PRA VER SE CHEGA
  console.log('Mensagem:', message.content);

  if (message.content === '!setup') {

    await message.reply('CRIANDO CANAL...');

    await message.guild.channels.create({
      name: 'canal-teste',
      type: ChannelType.GuildText
    });

  }

});

client.login(process.env.TOKEN);
