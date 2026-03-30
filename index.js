const { 
  Client, 
  GatewayIntentBits, 
  ChannelType,
  EmbedBuilder
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

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (message.content === '!setup') {

    await message.reply('⚙️ Criando canais com mensagens...');

    try {

      // ================= CATEGORIA
      const cat = await message.guild.channels.create({
        name: '📌 INFORMAÇÕES',
        type: ChannelType.GuildCategory
      });

      // ================= AVISOS
      const avisos = await message.guild.channels.create({
        name: '📢・avisos',
        type: ChannelType.GuildText,
        parent: cat.id
      });

      await avisos.send({
        content: '@everyone',
        embeds: [
          new EmbedBuilder()
            .setDescription(`
equipe, @sadxz・|ᵍᵇᶻ ˣⁱᵗ  @『MG』 D4RK 🖤

ATENÇÃO, nosso sistema de ticket está com problema e pode criar vários tickets.

👉 Ao abrir, aguarde aparecer o canal correto abaixo.
👉 Caso bugue, procure o ticket certo.

💎 Recomendo o canal:
🏅 drip-cliente (com desconto)
            `)
            .setColor('#8A2BE2')
        ]
      });

      // ================= TERMOS
      const termos = await message.guild.channels.create({
        name: '📘・termos',
        type: ChannelType.GuildText,
        parent: cat.id
      });

      await termos.send({
        embeds: [
          new EmbedBuilder()
            .setTitle('📘 TERMOS | GBZSTAR')
            .setDescription(`
Mesmo que o cliente não leia, ao comprar concorda com tudo.

🚫 **Compartilhamento**
Proibido compartilhar produtos. Banimento sem reembolso.

📥 **Contas LV15/20**
Garantia de 10 minutos para testar.

💰 **Reembolso**
Não fazemos trocas ou reembolsos.

📦 **Entregas**
Até 48h (normalmente minutos).

👤 **Suporte**
Disponível para ajudar.

📜 **Alterações**
Os termos podem mudar a qualquer momento.

Obrigado.
GBZ STAR
            `)
            .setColor('#8A2BE2')
        ]
      });

      // ================= CHAT
      const chat = await message.guild.channels.create({
        name: '💬・geral',
        type: ChannelType.GuildText
      });

      await chat.send({
        embeds: [
          new EmbedBuilder()
            .setDescription(`
em andamento...

opaaaaa  
salveeeee  
e ae 😈🔥
            `)
            .setColor('#8A2BE2')
        ]
      });

      message.channel.send('✅ Canais criados com mensagens!');

    } catch (err) {
      console.error(err);
      message.channel.send('❌ Erro ao criar');
    }

  }

});

client.login(process.env.TOKEN);
