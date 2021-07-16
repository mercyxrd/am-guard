const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const channels = require("../../database/modlog")
exports.run = async (receivedMessage, message, args) => {  
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Chat Guard', message.author.avatarURL({ dynamic: true }));
    //if(message.author.id !== message.guild.owner.user.id) return message.channel.send(embed.setDescription(`<a:aias_kare:839475702565961748> Merhaba bu komutu sadece ${message.guild.owner.user.tag} kullanabilir.`))
    let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
    if(!channel) return message.channel.send(embed.setDescription(`Bir kanal belirtmeyi unuttun!`)).then(x=>x.delete({timeout: 5000}))
    await channels.findOneAndUpdate({guildID: message.guild.id}, {$set : { channel: channel.id } }, {upsert: true});
    message.channel.send(embed.setTitle(`Başarıyla Mod Log Kanalını Ayarladınız.`)
    .setColor("RANDOM")
    .setFooter(`Aris Chat Guard Sistemi`)
    .setDescription(`Tebrikler! Başarıyla Mod Log Kanalını ${channel} olarak ayarladınız!`)
    )
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["modlog", "mlog", "logkanal"],
permLevel: 0
};

exports.help = { 
name: 'logkanal', 
description: 'log',
usage: 'logkanal',
kategori: 'kullanıcı'
};
