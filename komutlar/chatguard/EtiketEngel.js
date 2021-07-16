const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Etiket Engel Sistem', message.author.avatarURL({ dynamic: true }));
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Etiket Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}etiketengel aç\`**
    **\`${ayarlar.prefix}etiketengel kapat\`**
    
    <a:mesaj:839475182330314762> **\`.etiketengel aç\` komutunu kullanarak sunucunuzda \`Etiket\` kullanımını engelleyebilirsiniz.**
    
    <a:mesaj:839475182330314762> **\`.etiketengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda Etiket kullanımını engellemiyicektir.**
    
    <a:aias_kare:839475702565961748> **Etiket Engel Sistemi :** ${data.EtiketEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}
if(args[0] == 'aç') {
    if(data && data.EtiketEngel == true) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Etiket engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Etiket engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {EtiketEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.EtiketEngel == true) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Etiket engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Etiket engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {EtiketEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
};

exports.help = { 
name: 'etiketengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};