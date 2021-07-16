const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('../../ayarlar.json');
const {MessageButton } = require("discord-buttons")
exports.run = async (receivedMessage, message, args) => {  
    let embed = new MessageEmbed().setColor(ayarlar.embedrenk).setAuthor('Bot Davet', message.author.avatarURL({ dynamic: true }));
    var davet = new MessageButton()
    .setID("Davet")
    .setLabel("Botu Davet Et!")
    .setStyle("gray")
    embed.setDescription(`
**Merhabalar! Bize destek olmak istediğiniz için teşekkür ederiz! Guard botumuzu davet etmek için aşağıdaki butonu kullanabilirsiniz!**`)

let mesaj = message.channel.send({buttons: [davet], embed: embed})
var filter = (button) => button.clicker.user.id === message.author.id;
let collector = await mesaj.createButtonCollector(filter)
collector.on("collect", async(button)=> {

})
}
//[buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=834926351269625897&scope=bot&permissions=8)
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["invite", "botdavet", "invites"],
permLevel: 0
};

exports.help = { 
name: 'davetlink', 
description: 'eval.',
usage: 'evals',
kategori: 'kullanıcı'
};