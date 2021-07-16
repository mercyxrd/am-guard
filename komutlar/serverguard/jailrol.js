const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const database = require("../../database/korumalar");
exports.run = async (receivedMessage, message, args) => {  
let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Hanzo Guard', message.author.avatarURL({ dynamic: true }));
const data = await database.findOne({guildID: message.guild.id});
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için sunucu sahibi olmalısın.`)).then(x=>x.delete({timeout:5000}))
if(!args[0]) {
    message.channel.send(embed.setDescription(`\`\`\`Jail Rol Bilgisi\`\`\`
**\`${ayarlar.prefix}jailrol ayarla\`**
    
<a:mesaj:839475182330314762> **\`.jailrol ayarla [rol]\` komutunu kullanarak sunucunuzda \`Jail Rolünü\` ayarlayabilir ve guard sistemlerini aktif edebilirsiniz..**
    
    
<a:aias_kare:839475702565961748> **Jail Rolü :** ${data.JailRole ? data.JailRole.map(id => `<@&${id}>`).join('\n') : 'Jail Rolü Ayarlanmamış.'} `))}

if(args[0] == 'ayarla') {
    const data = await database.findOne({guildID: message.guild.id});
    var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> jail rolü başarıyla <@&${role.id}> olarak belirlendi!`))
    await database.findOneAndUpdate({ guildID: message.guild.id }, { $push: { JailRole: role.id } }, { upsert: true });

} 
if(args[0] == 'sil') {
    const data = await database.findOne({guildID: message.guild.id});
    var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    message.channel.send(embed.setDescription(`<a:aias_Tik:839475584518062112> <@&${role.id}> jail rolü silindi!`))
    await database.findOneAndUpdate({ guildID: message.guild.id }, { $pull: { JailRole: role.id } }, { upsert: true });

} 
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["jailrol", "jail-rol", "jailrole","jail-role"],
permLevel: 0
};

exports.help = { 
name: 'jailrol', 
description: 'jailrol',
usage: 'jailrol',
kategori: 'serverguard'
};