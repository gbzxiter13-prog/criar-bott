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

// ================= LISTA DE CANAIS DE PRODUTO
const canaisProduto = [
  'apk-mod-android',
  'iphone-rage',
  'iphone-safe',
  'bypass-full',
  'hs-wifi',
  'drip-cliente',
  'contas-ghost-ff'
];

// ================= PAINEL
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!painel') {

    // ❌ BLOQUEIA FORA DOS CANAIS
    if (!canaisProduto.includes(message.channel.name)) {
      return message.reply('❌ Esse comando só funciona nos canais de produto');
    }

    const canal = message.channel.name;

    let nomeProduto = 'FFH4X ANDROID';

    if (canal.includes('iphone-rage')) nomeProduto = 'IPHONE RAGE';
    else if (canal.includes('iphone-safe')) nomeProduto = 'IPHONE SAFE';
    else if (canal.includes('bypass')) nomeProduto = 'BYPASS FULL';
    else if (canal.includes('wifi')) nomeProduto = 'HS WIFI';
    else if (canal.includes('drip')) nomeProduto = 'DRIP CLIENTE';
    else if (canal.includes('ghost')) nomeProduto = 'CONTA GHOST';

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

    message.channel.send({
      embeds: [embed],
      components: [new ActionRowBuilder().addComponents(botao)]
    });
  }

});

// ================= INTERAÇÕES
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

    // 🔒 BLOQUEIA DUPLICADO
    const existente = interaction.guild.channels.cache.find(c =>
      c.name === `ticket-${interaction.user.username}`
    );

    if (existente) {
      return interaction.reply({
        content: `❌ Você já tem um ticket: ${existente}`,
        ephemeral: true
      });
    }

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
