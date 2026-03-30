const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  ChannelType,
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

// ================= PAINEL
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!painel') {

    const canal = message.channel.name;

    let nomeProduto = 'FFH4X ANDROID';

    if (canal.includes('iphone-rage')) nomeProduto = 'IPHONE RAGE';
    if (canal.includes('iphone-safe')) nomeProduto = 'IPHONE SAFE';
    if (canal.includes('apk')) nomeProduto = 'FFH4X ANDROID';

    const embed = new EmbedBuilder()
      .setTitle(`🔥😈 Painel ${nomeProduto} 😈🔥`)
      .setDescription(`
🔥😈 Adquira Já seu Painel ${nomeProduto} 😈🔥

🔥 ${nomeProduto}!

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

    message.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(botao)]
    });
  }

});

// ================= BOTÃO
client.on('interactionCreate', async (interaction) => {

  // BOTÃO → ESCOLHER PLANO
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

  // ================= CRIAR TICKET
  if (interaction.isStringSelectMenu() && interaction.customId === 'plano') {

    const valor = interaction.values[0];
    const produto = interaction.channel.name;

    const canal = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel] }
      ]
    });

    const embed = new EmbedBuilder()
      .setTitle('💰 Pagamento via PIX')
      .setDescription(`
👤 Cliente: ${interaction.user}
📦 Produto: ${produto}

💵 Valor: R$${valor}

📲 Chave PIX:
O dono vai enviar aqui

Aguarde confirmação.
      `)
      .setColor('#8A2BE2');

    canal.send({
      content: `${interaction.user}`,
      embeds: [embed]
    });

    interaction.reply({
      content: `✅ Ticket criado: ${canal}`,
      ephemeral: true
    });
  }

});

client.login(process.env.TOKEN);
