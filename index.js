const {
  Client,
  GatewayIntentBits,
  ChannelType,
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ================= ONLINE
client.once('ready', () => {
  console.log('🔥 BOT ONLINE');
});

// ================= CRIAR ESTRUTURA
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!setup') {

    await message.reply('⚙️ Criando canais...');

    try {

      // ================= BOAS VINDAS
      const cat1 = await message.guild.channels.create({
        name: '📌 BOAS-VINDAS',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({ name: '👋・boas-vindas', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '📢・avisos', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '📜・termos', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '📥・como-adquirir', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '💜・seja-da-equipe', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '✅・verificacao', type: ChannelType.GuildText, parent: cat1.id });

      // ================= GERAL
      const cat2 = await message.guild.channels.create({
        name: '💬 GERAL',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({ name: '💬・geral', type: ChannelType.GuildText, parent: cat2.id });

      // ================= ANDROID
      const cat3 = await message.guild.channels.create({
        name: '📱 FFH4X ANDROID',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({ name: '🏅・apk-mod-android', type: ChannelType.GuildText, parent: cat3.id });
      await message.guild.channels.create({ name: '🏅・contas-ghost-ff', type: ChannelType.GuildText, parent: cat3.id });
      await message.guild.channels.create({ name: '🏅・holograma-android', type: ChannelType.GuildText, parent: cat3.id });
      await message.guild.channels.create({ name: '🏅・drip-cliente', type: ChannelType.GuildText, parent: cat3.id });

      // ================= IOS
      const cat4 = await message.guild.channels.create({
        name: '🍎 FFH4X IOS',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({ name: '🏅・iphone-rage', type: ChannelType.GuildText, parent: cat4.id });
      await message.guild.channels.create({ name: '🏅・iphone-safe', type: ChannelType.GuildText, parent: cat4.id });
      await message.guild.channels.create({ name: '🏅・bypass-full', type: ChannelType.GuildText, parent: cat4.id });
      await message.guild.channels.create({ name: '🏅・hs-wifi', type: ChannelType.GuildText, parent: cat4.id });

      // ================= SUPORTE
      const cat5 = await message.guild.channels.create({
        name: '🎟️ SUPORTE',
        type: ChannelType.GuildCategory
      });

      const canalSuporte = await message.guild.channels.create({
        name: '💬・suporte',
        type: ChannelType.GuildText,
        parent: cat5.id
      });

      await message.guild.channels.create({ name: '🔊 Atendimento 1', type: ChannelType.GuildVoice, parent: cat5.id });
      await message.guild.channels.create({ name: '🔊 Atendimento 2', type: ChannelType.GuildVoice, parent: cat5.id });

      // ================= DOWNLOADS
      const cat6 = await message.guild.channels.create({
        name: '📥 DOWNLOADS',
        type: ChannelType.GuildCategory
      });

      await message.guild.channels.create({ name: '✅・download-android', type: ChannelType.GuildText, parent: cat6.id });
      await message.guild.channels.create({ name: '✅・download-ios', type: ChannelType.GuildText, parent: cat6.id });
      await message.guild.channels.create({ name: '✅・download-wifi', type: ChannelType.GuildText, parent: cat6.id });
      await message.guild.channels.create({ name: '✅・download-drip', type: ChannelType.GuildText, parent: cat6.id });

      // ================= PAINEL SUPORTE (MENU)
      const embed = new EmbedBuilder()
        .setTitle('📋 Painel de Atendimento')
        .setDescription(`
🎫 Regras Tickets

• Atendimento: 08:00 às 00:00
• Seja objetivo
• Tempo: 1 hora
• Sem discussões
        `)
        .setColor('#8A2BE2');

      const menu = new StringSelectMenuBuilder()
        .setCustomId('menu_ticket')
        .setPlaceholder('Escolha o tipo')
        .addOptions([
          { label: 'Suporte', value: 'suporte' },
          { label: 'Reembolso', value: 'reembolso' },
          { label: 'Instalação', value: 'instalacao' },
          { label: 'Dúvidas', value: 'duvidas' }
        ]);

      canalSuporte.send({
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(menu)]
      });

      message.channel.send('✅ Estrutura criada com ticket!');

    } catch (err) {
      console.error(err);
      message.channel.send('❌ Erro ao criar');
    }

  }

});

// ================= CRIAR TICKET
client.on('interactionCreate', async (interaction) => {

  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'menu_ticket') {

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel] }
      ]
    });

    canal.send(`🎟️ Ticket criado por ${interaction.user}`);

    interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

});

client.login(process.env.TOKEN);
