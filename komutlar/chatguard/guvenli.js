const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const db = require("../../database/whitelist.js")
exports.run = async (receivedMessage, message, args) => {  
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
if(message.member !== message.guild.owner) return message.channel.send(embed.setDescription(`Bu komutu kullanabilmek için sunucu sahibi olmalısın.`)).then(x=>x.delete({timeout:5000}))
var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

const Database = await db.findOne({ ServerID: message.guild.id });

if(!member && !role && !channel) return message.channel.send(embed.setDescription(
`:x: Örnek kullanım: **.güvenli ekle/kaldır id/etiket (rol veya kanal veya kullanıcı)**
Güvenli kişi listesi : ${Database.WhiteListMembers ? Database.WhiteListMembers.map(id => `<@${id}>`).join('\n') : 'Güvenlide hiç üye yok.'}
Güvenli rol listesi : ${Database.WhiteListRoles ? Database.WhiteListRoles.map(id => `<@&${id}>`).join('\n') : 'Güvenlide hiç rol yok.'}
Güvenli kanal listesi : ${Database.WhiteListChannels ? Database.WhiteListChannels.map(id => `<#${id}>`).join('\n') : 'Güvenlide hiç kanal yok.'}
`))
if(member) 
{   
    const data = await db.findOne({ ServerID: message.guild.id });
    if (data && data.WhiteListMembers.includes(member.user.id)) 
    {
        await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { WhiteListMembers: member.id } } );
        message.channel.send(embed.setDescription(`${member} kişisi güvenli listeden başarıyla kaldırıldı!`)).then(x=>x.delete({timeout:20000}))
        return
    }
    await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { WhiteListMembers: member.user.id } }, { upsert: true });
    message.channel.send(embed.setDescription(`${member} üyesi başarılı bir şekilde güvenli listeye eklendi!`)).then(x=>x.delete({timeout:20000}))
}
if(role)
{
    const data = await db.findOne({ServerID: message.guild.id});
    if(data && data.WhiteListRoles.includes(role.id)) 
    {
        await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { WhiteListRoles: role.id } } );
        message.channel.send(embed.setDescription(`<@&${role.id}> rolü güvenli listeden başarıyla kaldırıldı!`)).then(x=>x.delete({timeout:20000}))
        return
    }
    await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { WhiteListRoles: role.id } }, { upsert: true });
    message.channel.send(embed.setDescription(`<@&${role.id}> rolü başarılı bir şekilde güvenli listeye eklendi!`)).then(x=>x.delete({timeout:20000}))
}
if(channel)
{
    const data = await db.findOne({ ServerID: message.guild.id });
    if(data && data.WhiteListChannels.includes(channel.id)) 
    {
        await db.findOneAndUpdate({ ServerID: message.guild.id }, { $pull: { WhiteListChannels: channel.id }});
        message.channel.send(embed.setDescription(`<#${channel.id}> kanalı güvenli listeden başarıyla kaldırıldı!`)).then(x=>x.delete({timeout:20000}));
        return
    }
    await db.findOneAndUpdate({ ServerID: message.guild.id }, { $push: { WhiteListChannels: channel.id } }, { upsert: true });
    message.channel.send(embed.setDescription(`<#${channel.id}> kanalı başarılı bir şekilde güvenli listeye eklendi!`)).then(x=>x.delete({timeout:20000}));
}
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["güvenli", "guvenli","whitelist"],
permLevel: 0
};

exports.help = { 
name: 'güvenli', 
description: 'güvenli.',
usage: 'güvenli',
kategori: 'admin'
};