const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Link Engel Sistem', message.author.avatarURL({ dynamic: true }));
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Link Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}linkengel aç\`**
    **\`${ayarlar.prefix}linkengel kapat\`**
    
    <a:mesaj:839475182330314762> **\`.linkengel aç\` komutunu kullanarak sunucunuzda \`Link\` kullanımını engelleyebilirsiniz Youtube , Facebook , v.b site linklerini engellemetedir.**
    
    <a:mesaj:839475182330314762> **\`.linkengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda Link kullanımını engellemiyicektir.**
    
    <a:aias_kare:839475702565961748> **Link Engel Sistemi :** ${data.LinkEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}
if(args[0] == 'aç') {
    if(data && data.LinkEngel === true) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Link engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Link engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {LinkEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.LinkEngel === false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Link engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Link engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {LinkEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["link"],
permLevel: 0
};

exports.help = { 
name: 'linkengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};