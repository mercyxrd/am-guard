const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const database = require("../../database/korumalar");
exports.run = async (receivedMessage, message, args) => {  
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
const data = await database.findOne({guildID: message.guild.id});
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için sunucu sahibi olmalısın.`)).then(x=>x.delete({timeout:5000}))
if(data.Jailservere == false) return message.channel.send(embed.setDescription(`Jail rolü ayarlanmadığı için işleme devam edemiyorum.\n\`.jailserver ayarla [@server]\``)).then(x=>x.delete({timeout:20000}));
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Server Koruma Sistem Bilgisi\`\`\`
**\`${ayarlar.prefix}serverkoruma aç\`**
**\`${ayarlar.prefix}serverkoruma kapat\`**
    
<a:mesaj:839475182330314762> **\`.serverkoruma aç\` komutunu kullanarak sunucunuzda \`server Koruma\` ile ilgili tüm işlemleri koruyabilirsiniz..**
    
<a:mesaj:839475182330314762> **\`.serverkoruma kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda server koruma ile ilgili tüm işlerime izin verebilirsiniz..**
    
<a:aias_kare:839475702565961748> **Server Koruma Sistemi :** ${data.serverKoruma ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}

if(args[0] == 'aç') {
    if(data && data.serverKoruma == true) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> server koruma sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> server koruma sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {serverKoruma: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.serverKoruma == false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> server koruma sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Server koruma sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {serverKoruma: false}, {upsert: true});
}
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["serverkoruma", "server-koruma", "serverguard","server-guard"],
permLevel: 0
};

exports.help = { 
name: 'serverkoruma', 
description: 'serverkoruma',
usage: 'serverkoruma',
kategori: 'serverguard'
};