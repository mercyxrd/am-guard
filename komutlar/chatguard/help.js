const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

var chat = new MessageButton()
.setID("chat")
.setLabel("💂 Chat Guard")
.setStyle("gray")

var server = new MessageButton()
.setID("server")
.setLabel("💂🏽‍♀️ Server Guard")
.setStyle("gray")

var iptal = new MessageButton()
.setID("iptal")
.setLabel("❌")
.setStyle("gray")

const row = new MessageActionRow()
.addComponent(chat)
.addComponent(server)
.addComponent(iptal);


embed.setDescription(`${message.guild.name} sunucusunda **CARTEL** botunun yardım menüsüne hoş geldiniz!
<a:mesaj:839475182330314762> Chat Guard komutlarını ve ayarlamalarını görmek için 1. butona basın.
<a:mesaj:839475182330314762> Server Guard komutlarını ve ayarlamalarını görmek için 2. butona basın.
<a:mesaj:839475182330314762> Yardım menüsünü kapatmak için 3. butona basın.`)

let msg = await message.channel.send({ buttons : [chat, server, iptal], embed: embed})
var filter = (button) => button.clicker.user.id === message.author.id;
let collector = await msg.createButtonCollector(filter)
collector.on("collect", async (button) => {
if(button.id === "chat") {
const embeds = new MessageEmbed()
.setDescription(`
\`\`\`Chat Guard Komut Listesi\`\`\`
» ${ayarlar.prefix}capslock [aç] - [kapat]
» ${ayarlar.prefix}davet [aç] - [kapat]
» ${ayarlar.prefix}link [aç] - [kapat]
» ${ayarlar.prefix}küfür [aç] - [kapat]
» ${ayarlar.prefix}etiketengel [aç] - [kapat]
» ${ayarlar.prefix}güvenli [kişi] - [rol] - [kanal]
» ${ayarlar.prefix}filtre [ekle] [kelime] - [kaldır] [kelime]


<a:aias_kare:839475702565961748> **Kısayoldan tüm \`chatkoruma\` sistemini aktif etmek için \`.chatguard aç\` komutunu kullanabilirsiniz hepsini kapatmak istiyorsanız \`.chatguard kapat\` ile kapatabilirsiniz.** 

`)
.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))
.setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
msg.edit({
embed: embeds,
components : row
})}
if(button.id === "server") {
const embeds = new MessageEmbed()
.setDescription(`
\`\`\`Server Guard Komut Listesi\`\`\`
» ${ayarlar.prefix}bankoruma [aç] - [kapat]
» ${ayarlar.prefix}kanalkoruma [aç] - [kapat]
» ${ayarlar.prefix}rolkoruma [aç] - [kapat]
» ${ayarlar.prefix}serverkoruma [aç] - [kapat]
» ${ayarlar.prefix}jailrol [@rol]
    
`)
.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))
.setAuthor(member.user.username, member.user.avatarURL({ dynamic: true, size: 2048 }))
msg.edit({
embed: embeds,
components : row
})}
if(button.id === "iptal") {
msg.delete();
}
})
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["yardım", "help"],
permLevel: 0
};

exports.help = { 
name: 'yardım', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};
