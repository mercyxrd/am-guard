const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
    const data = await database.findOne({guildID: message.guild.id});
const muteembed = new Discord.MessageEmbed()
.setColor(ayarlar.embedrenk)
.setAuthor('Chat Guard', 'https://cdn.discordapp.com/avatars/834926351269625897/b2a2dd6ed2a7fb9920876c16cf8df1c5.png?size=1024')
//.setFooter(ayarlar.durum)
.setDescription(`\`\`\`Chat Guard Komut Listesi\`\`\`
» ${ayarlar.prefix}capslock [aç] - [kapat]
» ${ayarlar.prefix}davet [aç] - [kapat]
» ${ayarlar.prefix}link [aç] - [kapat]
» ${ayarlar.prefix}küfür [aç] - [kapat]
» ${ayarlar.prefix}etiketengel [aç] - [kapat]
» ${ayarlar.prefix}güvenli [kişi] - [rol] - [kanal]
» ${ayarlar.prefix}filtre [ekle] [kelime] - [kaldır] [kelime]


<a:aias_kare:839475702565961748> **Kısayoldan tüm \`chatkoruma\` sistemini aktif etmek için \`.chatguard aç\` komutunu kullanabilirsiniz hepsini kapatmak istiyorsanız \`.chatguard kapat\` ile kapatabilirsiniz.** 

`)
.addField('Davet Engel', data && data.davetEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı", true)
.addField('Link Engel', data && data.LinkEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı", true)
.addField('Küfür Engel', data && data.kufurEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı", true)
.addField('Etiket Engel', data && data.EtiketEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı", true)
.addField('Capslock Engel', data && data.CapslockEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı", true)
.addField('Tüm Sistemler', data && data.CapslockEngel && data.davetEngel && data.kufurEngel && data.LinkEngel && data.EtiketEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı", true)

.setTimestamp()
//.setImage('https://cdn.discordapp.com/attachments/758512666813005869/822451324528361562/standard.gif')

if(!args[0]) 
{message.channel.send(muteembed)
}

if(args[0] == 'aç') {
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(data) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Tüm sistemler zaten **aktif!**`))
message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Tüm sistemler başarıyla **aktif** edildi!`))
await database.findOneAndUpdate({guildID: message.guild.id}, {davetEngel: true, kufurEngel: true, CapslockEngel: true, LinkEngel: true, EtiketEngel: true}, {upsert: true});
}
if(args[0] == 'kapat') {
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
    if(!data) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Tüm sistemler zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Tüm sistemler başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {davetEngel: false, kufurEngel: false, CapslockEngel: false, LinkEngel: false, EtiketEngel: false}, {upsert: true});
}

}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["yardım", "help"],
permLevel: 0
};

exports.help = { 
name: 'chatguard', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};