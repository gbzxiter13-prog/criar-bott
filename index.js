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

const DONO_ID = process.env.DONO_ID;

// 🔥 BOT ONLINE
client.once('ready', () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

// 🔥 LOG DE MENSAGENS (pra testar)
client.on('messageCreate', (message) => {
  console.log('MSG:', message.content);
});

// ================= COMANDO SETUP
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  // 🔒 só dono usa
  if (message.author.id !== DONO_ID) return;

  if (message.content.startsWith('!miguelgay')) {

    message.reply('⚙️ Criando servidor completo...');

    try {

      // ================= BOAS VINDAS
      const cat1 = await message.guild.channels.create({
        name: '📌 BOAS-VINDAS',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({
        name: '👋・boas-vindas',
        type: ChannelType.GuildText,
        parent: cat1.id
      });

      await message.guild.channels.create({
        name: '📢・avisos',
        type: ChannelType.GuildText,
        parent: cat1.id
      });

      await message.guild.channels.create({
        name: '📜・termos',
        type: ChannelType.GuildText,
        parent: cat1.id
      });

      await message.guild.channels.create({
        name: '📥・como-adquirir',
        type: ChannelType.GuildText,
        parent: cat1.id
      });

      await message.guild.channels.create({
        name: '💜・seja-da-equipe',
        type: ChannelType.GuildText,
        parent: cat1.id
      });

      await message.guild.channels.create({
        name: '✅・verificacao',
        type: ChannelType.GuildText,
        parent: cat1.id
      });

      // ================= CHAT
      const cat2 = await message.guild.channels.create({
        name: '💬 GERAL',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({
        name: '💬・geral',
        type: ChannelType.GuildText,
        parent: cat2.id
      });

      // ================= FFH4X ANDROID
      const cat3 = await message.guild.channels.create({
        name: '📱 FFH4X ANDROID',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({
        name: '🏅・apk-mod-android',
        type: ChannelType.GuildText,
        parent: cat3.id
      });

      await message.guild.channels.create({
        name: '🏅・contas-ghost-ff',
        type: ChannelType.GuildText,
        parent: cat3.id
      });

      await message.guild.channels.create({
        name: '🏅・holograma-android',
        type: ChannelType.GuildText,
        parent: cat3.id
      });

      await message.guild.channels.create({
        name: '🏅・drip-cliente',
        type: ChannelType.GuildText,
        parent: cat3.id
      });

      // ================= FFH4X IOS
      const cat4 = await message.guild.channels.create({
        name: '🍎 FFH4X IOS',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({
        name: '🏅・iphone-rage',
        type: ChannelType.GuildText,
        parent: cat4.id
      });

      await message.guild.channels.create({
        name: '🏅・iphone-safe',
        type: ChannelType.GuildText,
        parent: cat4.id
      });

      await message.guild.channels.create({
        name: '🏅・bypass-full',
        type: ChannelType.GuildText,
        parent: cat4.id
      });

      await message.guild.channels.create({
        name: '🏅・hs-wifi',
        type: ChannelType.GuildText,
        parent: cat4.id
      });

      // ================= SUPORTE
      const cat5 = await message.guild.channels.create({
        name: '🎟️ SUPORTE',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({
        name: '💬・suporte',
        type: ChannelType.GuildText,
        parent: cat5.id
      });

      await message.guild.channels.create({
        name: '🔊 Atendimento 1',
        type: ChannelType.GuildVoice,
        parent: cat5.id
      });

      await message.guild.channels.create({
        name: '🔊 Atendimento 2',
        type: ChannelType.GuildVoice,
        parent: cat5.id
      });

      await message.guild.channels.create({
        name: '🔊 Atendimento 3',
        type: ChannelType.GuildVoice,
        parent: cat5.id
      });

      // ================= DOWNLOADS
      const cat6 = await message.guild.channels.create({
        name: '📥 DOWNLOADS',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({
        name: '✅・download-android',
        type: ChannelType.GuildText,
        parent: cat6.id
      });

      await message.guild.channels.create({
        name: '✅・download-ios',
        type: ChannelType.GuildText,
        parent: cat6.id
      });

      await message.guild.channels.create({
        name: '✅・download-wifi',
        type: ChannelType.GuildText,
        parent: cat6.id
      });

      await message.guild.channels.create({
        name: '✅・download-drip',
        type: ChannelType.GuildText,
        parent: cat6.id
      });

      message.channel.send('✅ SERVIDOR CRIADO COMPLETO!');

    } catch (err) {
      console.error(err);
      message.channel.send('❌ Erro ao criar servidor');
    }

  }

});

client.login(process.env.TOKEN);
