const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const database = require("../../database/korumalar");
exports.run = async (receivedMessage, message, args) => {  
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
const data = await database.findOne({guildID: message.guild.id});
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için sunucu sahibi olmalısın.`)).then(x=>x.delete({timeout:5000}))
if(data.JailRole == false) return message.channel.send(embed.setDescription(`Jail rolü ayarlanmadığı için işleme devam edemiyorum.\n\`.jailrol ayarla [@rol]\``)).then(x=>x.delete({timeout:20000}));
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Bot Koruma Sistem Bilgisi\`\`\`
**\`${ayarlar.prefix}botkoruma aç\`**
**\`${ayarlar.prefix}botkoruma kapat\`**
    
<a:mesaj:839475182330314762> **\`.botkoruma aç\` komutunu kullanarak sunucunuzda \`Bot Koruma\` ile ilgili tüm işlemleri koruyabilirsiniz..**
    
<a:mesaj:839475182330314762> **\`.botkoruma kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda bot koruma ile ilgili tüm işlerime izin verebilirsiniz..**
    
<a:aias_kare:839475702565961748> **Bot Koruma Sistemi :** ${data.botKoruma ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}

if(args[0] == 'aç') {
    if(data && data.botKoruma == true) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> bot koruma sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Bot koruma sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {botKoruma: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.botKoruma == false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> bot koruma sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> bot koruma sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {botKoruma: false}, {upsert: true});
}
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["botkoruma", "bot-koruma", "botguard","bot-guard"],
permLevel: 0
};

exports.help = { 
name: 'botkoruma', 
description: 'botkoruma',
usage: 'botkoruma',
kategori: 'serverguard'
};