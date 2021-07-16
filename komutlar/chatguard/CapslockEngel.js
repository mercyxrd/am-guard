const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const database = require("../../database/korumalar")
const ayarlar = require('../../ayarlar.json');
exports.run = async (receivedMessage, message, args) => {  
    const data = await database.findOne({guildID: message.guild.id});
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Caps Lock Engel Sistem', message.author.avatarURL({ dynamic: true }));
if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Caps Lock Engel Sistem Bilgisi\`\`\`
    **\`${ayarlar.prefix}capslockengel aç\`**
    **\`${ayarlar.prefix}capslockengel kapat\`**
    
    <a:mesaj:839475182330314762> **\`.capslockengel aç\` komutunu kullanarak sunucunuzda \`Büyük Harf\` kullanımını engelleyebilirsiniz 1 Mesajda 10 adet büyük harf 8 adet küçük harf bulunuyorsa engellemektedir sistem bu şekilde çalışmaktadır.**
    
    <a:mesaj:839475182330314762> **\`.capslockengel kapat\` komutunu kullanarak bu sistemi kapatabilirsiniz ama bu sistemi kapatmak sunucuda \`Büyük Harf\` kullanımını engellemiyicektir.**
    
    <a:aias_kare:839475702565961748> **Caps Lock Engel Sistemi :** ${data.CapslockEngel ? "**<a:aias_Tik:839475584518062112>** Açık" : "<a:aias_Red:839475545544458271> Kapalı"}`))}
if(args[0] == 'aç') {
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
    if(data && data.CapslockEngel === true) return message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Davet engel sistemi zaten **aktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Caps Lock engel sistemi başarıyla **aktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {CapslockEngel: true}, {upsert: true});
} 
if(args[0] == 'kapat') {
    if(message.author.id !== message.guild.owner.user.id && !ayarlar.sahip) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
    if(data && data.CapslockEngel === false) return message.channel.send(embed.setDescription(`<a:aias_Red:839475545544458271> Davet engel sistemi zaten **deaktif!**`))
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> Davet engel sistemi başarıyla **deaktif** edildi!`))
    await database.findOneAndUpdate({guildID: message.guild.id}, {CapslockEngel: false}, {upsert: true});
}}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["capslock", "capslockengel"],
permLevel: 4
};

exports.help = { 
name: 'capslockengel', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};
