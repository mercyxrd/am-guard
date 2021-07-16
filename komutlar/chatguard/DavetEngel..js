const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Davet Engel Sistem', message.author.avatarURL({ dynamic: true }));
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Davet Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}davetengel aç\`**
    **\`${ayarlar.prefix}davetengel kapat\`**
    
    <a:mesaj:839475182330314762> **\`.davetengel aç\` komutunu kullanarak sunucunuzda \`Davet Link\` kullanımını önleyebilirsiniz yani başka sunucuların davet linki paylaşmasına izin verilmiyicektir.**
    
    <a:mesaj:839475182330314762> **\`.davetengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda davet linklerini engellemiyicektir.**
    
    <a:aias_kare:839475702565961748> **Davet Engel Sistemi :** ${data.davetEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}
if(args[0] == 'aç') {
    if(data && data.davetEngel == true) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Davet engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Davet engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {davetEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.davetEngel == false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Davet engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Davet engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {davetEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["davet", "davetengel"],
permLevel: 0
};

exports.help = { 
name: 'reklamengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};