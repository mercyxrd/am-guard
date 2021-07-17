const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const database = require("../../database/korumalar");
exports.run = async (receivedMessage, message, args) => {  
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Cartel Guard', message.author.avatarURL({ dynamic: true }));
const data = await database.findOne({guildID: message.guild.id});
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için sunucu sahibi olmalısın.`)).then(x=>x.delete({timeout:5000}))
if(data.JailBane == false) return message.channel.send(embed.setDescription(`Jail Rolü ayarlanmadığı için işleme devam edemiyorum.\n\`.jailBan ayarla [@Ban]\``)).then(x=>x.delete({timeout:20000}));
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Ban Koruma Sistem Bilgisi\`\`\`
**\`${ayarlar.prefix}bankoruma aç\`**
**\`${ayarlar.prefix}bankoruma kapat\`**
    
<a:mesaj:839475182330314762> **\`.Bankoruma aç\` komutunu kullanarak sunucunuzda \`Ban Koruma\` ile ilgili tüm işlemleri koruyabilirsiniz..**
    
<a:mesaj:839475182330314762> **\`.Bankoruma kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda Ban koruma ile ilgili tüm işlerime izin verebilirsiniz..**
    
<a:aias_kare:839475702565961748> **Ban Koruma Sistemi :** ${data.BanKoruma ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}

if(args[0] == 'aç') {
    if(data && data.banKoruma == true) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Ban koruma sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Ban koruma sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {banKoruma: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.banKoruma == false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Ban koruma sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Ban koruma sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {banKoruma: false}, {upsert: true});
}
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["bankoruma", "ban-koruma", "banguard","ban-guard"],
permLevel: 0
};

exports.help = { 
name: 'bankoruma', 
description: 'bankoruma',
usage: 'bankoruma',
kategori: 'serverguard'
};
