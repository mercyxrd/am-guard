const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ayarlar = require('../../ayarlar.json');
const db = require("../../database/whitelist")
exports.run = async (receivedMessage, message, args) => {
const Database = await db.findOne({ ServerID: message.guild.id });      
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
if(message.member !== message.guild.owner) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için sunucu sahibi olmalısın.`)).then(x=>x.delete({timeout:5000}))
if(!args[0]) return message.channel.send(embed.setDescription(`.filtre ekle [kelime] veya .filtre kaldır [kelime] yazmalısın.\n\nFiltreli kelimeler : ${Database.FiltredWords ? Database.FiltredWords.join() : 'Filtre\'de hiç kelime yok.'}`)).then(x=>x.delete({timeout:20000}))
if(args[0] == "ekle" || args[0] == "add")
{
    const Database = await db.findOne({ ServerID: message.guild.id });    
    if (Database && Database.FiltredWords.includes(args[1]) === true) return message.channel.send(embed.setDescription('**'+args[1]+'**, Bu kelime zaten filtreli kelimelerde var.')).then(x=>x.delete({timeout:20000}))
    
    await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { FiltredWords: args[1] } }, { upsert: true });
    return message.channel.send(embed.setDescription('**'+args[1]+'**, Başarıyla filtreli kelimelere eklendi.')).then(x=>x.delete({timeout:20000}))
}
if(args[0] == "kaldır" || args[0] == "remove") 
{
    const Database = await db.findOne({ ServerID: message.guild.id });    
    if (!Database || Database.FiltredWords.includes(args[1]) !== true) return message.channel.send(embed.setDescription('**'+args[1]+'**, Bu kelime zaten filtreli kelime değil.')).then(x=>x.delete({timeout:20000}))
   
    await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { FiltredWords: args[1] }});
    return message.channel.send(embed.setDescription('**'+args[1]+'**, Başarıyla filtreli kelimelerden kaldırıldı.')).then(x=>x.delete({timeout:20000}))
}
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["filtre", "filter"],
permLevel: 0
};

exports.help = { 
name: 'filtre', 
description: 'filtre',
usage: 'filtre',
kategori: 'filtre'
};