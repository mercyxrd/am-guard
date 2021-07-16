const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Küfür Engel Sistem', message.author.avatarURL({ dynamic: true }));
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Küfür Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}küfürengel aç\`**
    **\`${ayarlar.prefix}küfürengel kapat\`**
    
    <a:mesaj:839475182330314762> **\`.küfürengel aç\` komutunu kullanarak sunucunuzda \`Küfür\` kullanımını engelleyebilirsiniz.**
    
    <a:mesaj:839475182330314762> **\`.küfürengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda Küfür kullanımını engellemiyicektir.**
    
    <a:aias_kare:839475702565961748> **Küfür Engel Sistemi :** ${data.kufurEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}
if(args[0] == 'aç') {
    if(data && data.kufurEngel === true) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Küfür engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Küfür engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {kufurEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(data && data.kufurEngel == false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Küfür engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Küfür engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {kufurEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["küfür"],
permLevel: 0
};

exports.help = { 
name: 'küfürengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};