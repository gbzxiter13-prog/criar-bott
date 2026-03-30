const { 
  Client, 
  GatewayIntentBits, 
  ChannelType 
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const DONO_ID = '1440029251725295626';

client.once('ready', () => {
  console.log(`🔥 Bot online como ${client.user.tag}`);
});

// ================= SETUP ESTÉTICO
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;
  if (message.author.id !== DONO_ID) return;

  if (message.content === '!GOGOGO') {

    message.reply('⚙️ Criando servidor estilizado...');

    // ================= CATEGORIA PRINCIPAL
    const cat1 = await message.guild.channels.create({
      name: '━━━ 🌑 𝑺𝑬𝑹𝑽𝑬𝑹 🌑 ━━━',
      type: ChannelType.GuildCategory
    });

    await message.guild.channels.create({
      name: '📜・regras',
      type: ChannelType.GuildText,
      parent: cat1.id
    });

    await message.guild.channels.create({
      name: '📢・avisos',
      type: ChannelType.GuildText,
      parent: cat1.id
    });

    // ================= COMUNIDADE
    const cat2 = await message.guild.channels.create({
      name: '━━━ 💬 𝑪𝑶𝑴𝑼𝑵𝑰𝑫𝑨𝑫𝑬 💬 ━━━',
      type: ChannelType.GuildCategory
    });

    await message.guild.channels.create({
      name: '💬・chat-geral',
      type: ChannelType.GuildText,
      parent: cat2.id
    });

    await message.guild.channels.create({
      name: '😂・memes',
      type: ChannelType.GuildText,
      parent: cat2.id
    });

    // ================= SUPORTE
    const cat3 = await message.guild.channels.create({
      name: '━━━ 🎟️ 𝑺𝑼𝑷𝑶𝑹𝑻𝑬 🎟️ ━━━',
      type: ChannelType.GuildCategory
    });

    await message.guild.channels.create({
      name: '🎫・abrir-ticket',
      type: ChannelType.GuildText,
      parent: cat3.id
    });

    // ================= VOZ
    const cat4 = await message.guild.channels.create({
      name: '━━━ 🔊 𝑪𝑨𝑳𝑳𝑺 🔊 ━━━',
      type: ChannelType.GuildCategory
    });

    await message.guild.channels.create({
      name: '🔊・Geral',
      type: ChannelType.GuildVoice,
      parent: cat4.id
    });

    await message.guild.channels.create({
      name: '🎮・Squad',
      type: ChannelType.GuildVoice,
      parent: cat4.id
    });

    message.channel.send('✅ Servidor criado no estilo das imagens!');
  }

});

client.login(process.env.TOKEN);
