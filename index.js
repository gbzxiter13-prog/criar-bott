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

// ================= SETUP COMPLETO
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!setup') {

    await message.reply('⚙️ Criando servidor completo...');

    try {

      // ================= ANDROID
      const catAndroid = await message.guild.channels.create({
        name: '📱 FFH4X ANDROID',
        type: ChannelType.GuildCategory
      });

      const apk = await message.guild.channels.create({
        name: '🏅・apk-mod-android',
        type: ChannelType.GuildText,
        parent: catAndroid.id
      });

      // ================= IOS
      const catIOS = await message.guild.channels.create({
        name: '🍎 FFH4X IOS',
        type: ChannelType.GuildCategory
      });

      const rage = await message.guild.channels.create({
        name: '🏅・iphone-rage',
        type: ChannelType.GuildText,
        parent: catIOS.id
      });

      const safe = await message.guild.channels.create({
        name: '🏅・iphone-safe',
        type: ChannelType.GuildText,
        parent: catIOS.id
      });

      const bypass = await message.guild.channels.create({
        name: '🏅・bypass-full',
        type: ChannelType.GuildText,
        parent: catIOS.id
      });

      const wifi = await message.guild.channels.create({
        name: '🏅・hs-wifi',
        type: ChannelType.GuildText,
        parent: catIOS.id
      });

      // ================= SUPORTE
      const catSup = await message.guild.channels.create({
        name: '🎟️ SUPORTE',
        type: ChannelType.GuildCategory
      });

      const suporte = await message.guild.channels.create({
        name: '💬・suporte',
        type: ChannelType.GuildText,
        parent: catSup.id
      });

      // ================= FUNÇÃO PAINEL VENDA
      async function painelVenda(canal, nomeProduto) {

        const embed = new EmbedBuilder()
          .setTitle(`🔥😈 Painel ${nomeProduto} 😈🔥`)
          .setDescription(`
🔥😈 Adquira Já seu Painel ${nomeProduto} 😈🔥

💎 Experiência diferenciada

📥 Entrega via ticket
📲 Suporte disponível

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

      // ================= PAINEIS AUTOMATICOS
      await painelVenda(apk, 'FFH4X ANDROID');
      await painelVenda(rage, 'IPHONE RAGE');
      await painelVenda(safe, 'IPHONE SAFE');
      await painelVenda(bypass, 'BYPASS FULL');
      await painelVenda(wifi, 'HS WIFI');

      // ================= PAINEL SUPORTE
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
        .setPlaceholder('Escolha o tipo')
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

      message.channel.send('✅ SERVIDOR COMPLETO CRIADO!');

    } catch (err) {
      console.error(err);
      message.channel.send('❌ Erro ao criar');
    }

  }

});

// ================= INTERAÇÕES
client.on('interactionCreate', async (interaction) => {

  // BOTÃO COMPRA
  if (interaction.isButton() && interaction.customId === 'comprar') {

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

  // CRIAR TICKET VENDA
  if (interaction.isStringSelectMenu() && interaction.customId === 'plano') {

    const valor = interaction.values[0];

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel] }
      ]
    });

    canal.send(`
👤 Cliente: ${interaction.user}
💰 Valor: R$${valor}

📲 Chave PIX:
O dono vai enviar aqui
    `);

    interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

  // TICKET SUPORTE
  if (interaction.isStringSelectMenu() && interaction.customId === 'menu_ticket') {

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
