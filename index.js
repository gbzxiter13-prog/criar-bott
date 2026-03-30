const {
  Client,
  GatewayIntentBits,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  PermissionsBitField
} = require('discord.js');

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

// ================= SETUP
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!setup') {

    await message.reply('⚙️ Criando servidor completo...');

    try {

      // ================= BOAS VINDAS
      const cat1 = await message.guild.channels.create({ name: '📌 BOAS-VINDAS', type: ChannelType.GuildCategory });
      await message.guild.channels.create({ name: '👋・boas-vindas', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '📢・avisos', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '📜・termos', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '📥・como-adquirir', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '💜・seja-da-equipe', type: ChannelType.GuildText, parent: cat1.id });
      await message.guild.channels.create({ name: '✅・verificacao', type: ChannelType.GuildText, parent: cat1.id });

      // ================= GERAL
      const cat2 = await message.guild.channels.create({ name: '💬 GERAL', type: ChannelType.GuildCategory });
      await message.guild.channels.create({ name: '💬・geral', type: ChannelType.GuildText, parent: cat2.id });

      // ================= ANDROID
      const cat3 = await message.guild.channels.create({ name: '📱 FFH4X ANDROID', type: ChannelType.GuildCategory });
      const apk = await message.guild.channels.create({ name: '🏅・apk-mod-android', type: ChannelType.GuildText, parent: cat3.id });
      await message.guild.channels.create({ name: '🏅・contas-ghost-ff', type: ChannelType.GuildText, parent: cat3.id });
      await message.guild.channels.create({ name: '🏅・holograma-android', type: ChannelType.GuildText, parent: cat3.id });
      await message.guild.channels.create({ name: '🏅・drip-cliente', type: ChannelType.GuildText, parent: cat3.id });

      // ================= IOS
      const cat4 = await message.guild.channels.create({ name: '🍎 FFH4X IOS', type: ChannelType.GuildCategory });
      const rage = await message.guild.channels.create({ name: '🏅・iphone-rage', type: ChannelType.GuildText, parent: cat4.id });
      const safe = await message.guild.channels.create({ name: '🏅・iphone-safe', type: ChannelType.GuildText, parent: cat4.id });
      const bypass = await message.guild.channels.create({ name: '🏅・bypass-full', type: ChannelType.GuildText, parent: cat4.id });
      const wifi = await message.guild.channels.create({ name: '🏅・hs-wifi', type: ChannelType.GuildText, parent: cat4.id });

      // ================= SUPORTE
      const cat5 = await message.guild.channels.create({ name: '🎟️ SUPORTE', type: ChannelType.GuildCategory });
      const suporte = await message.guild.channels.create({ name: '💬・suporte', type: ChannelType.GuildText, parent: cat5.id });
      await message.guild.channels.create({ name: '🔊 Atendimento 1', type: ChannelType.GuildVoice, parent: cat5.id });
      await message.guild.channels.create({ name: '🔊 Atendimento 2', type: ChannelType.GuildVoice, parent: cat5.id });

      // ================= DOWNLOADS
      const cat6 = await message.guild.channels.create({ name: '📥 DOWNLOADS', type: ChannelType.GuildCategory });
      await message.guild.channels.create({ name: '✅・download-android', type: ChannelType.GuildText, parent: cat6.id });
      await message.guild.channels.create({ name: '✅・download-ios', type: ChannelType.GuildText, parent: cat6.id });
      await message.guild.channels.create({ name: '✅・download-wifi', type: ChannelType.GuildText, parent: cat6.id });
      await message.guild.channels.create({ name: '✅・download-drip', type: ChannelType.GuildText, parent: cat6.id });

      // ================= FUNÇÃO PAINEL COMPLETO
      async function painel(canal, nome) {

        const embed = new EmbedBuilder()
          .setTitle(`🔥😈 Adquira seu Painel ${nome} 😈🔥`)
          .setDescription(`
🔥😈 Adquira Já seu Painel ${nome} 😈🔥

🔥 ${nome}!

Se você quer qualidade e resultado, esse painel é pra você.

💎 Experiência diferenciada e máxima eficiência

🔥 O que tem:
• Aimbot Full
• ESPs Full
• Configurável
• Head / Neck / Chest

💥 Diferenciais
• Funciona em todos dispositivos 🚀
• Suporte + Tutorial

🎮 Ideal para:
• Rank
• CS
• Jogar AP

📥 Você recebe:
• Key no privado
• Acesso a downloads

🚨 Pode haver risco de blacklist

📦 Entrega rápida
📲 Suporte antes da compra

😈🔥 Garanta o seu agora!
          `)
          .setImage('https://i.ytimg.com/vi/51ptIy41tr0/hq720.jpg')
          .setColor('#8A2BE2');

        const botao = new ButtonBuilder()
          .setCustomId('comprar')
          .setLabel('Comprar agora')
          .setStyle(ButtonStyle.Success);

        canal.send({
          embeds: [embed],
          components: [new ActionRowBuilder().addComponents(botao)]
        });
      }

      // ================= PAINEIS
      await painel(apk, 'FFH4X ANDROID');
      await painel(rage, 'IPHONE RAGE');
      await painel(safe, 'IPHONE SAFE');
      await painel(bypass, 'BYPASS FULL');
      await painel(wifi, 'HS WIFI');

      // ================= SUPORTE
      const embedSup = new EmbedBuilder()
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
        .addOptions([
          { label: 'Suporte', value: 'suporte' },
          { label: 'Reembolso', value: 'reembolso' },
          { label: 'Instalação', value: 'instalacao' },
          { label: 'Dúvidas', value: 'duvidas' }
        ]);

      suporte.send({
        embeds: [embedSup],
        components: [new ActionRowBuilder().addComponents(menu)]
      });

      message.channel.send('✅ SERVIDOR COMPLETO PRONTO!');

    } catch (e) {
      console.log(e);
      message.channel.send('❌ Erro');
    }
  }
});

// ================= INTERAÇÕES
client.on('interactionCreate', async (interaction) => {

  if (interaction.isButton()) {

    const menu = new StringSelectMenuBuilder()
      .setCustomId('plano')
      .setPlaceholder('📦 Escolha seu plano')
      .addOptions([
        { label: '1 DIA', value: '17.90' },
        { label: '7 DIAS', value: '25.90' },
        { label: '10 DIAS', value: '35.90' }
      ]);

    return interaction.reply({
      content: '📦 Escolha seu plano:',
      components: [new ActionRowBuilder().addComponents(menu)],
      ephemeral: true
    });
  }

  if (interaction.isStringSelectMenu() && interaction.customId === 'plano') {

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel] }
      ]
    });

    canal.send(`
💰 Pagamento via PIX
💵 Valor: R$${interaction.values[0]}

📲 Chave PIX:
O dono vai enviar aqui
    `);

    interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

  if (interaction.customId === 'menu_ticket') {

    const canal = await interaction.guild.channels.create({
      name: `suporte-${interaction.user.username}`,
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
