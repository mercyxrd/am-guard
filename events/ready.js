const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;


module.exports = client => {
  client.user.setPresence({ activity: { name: "Aris Guard System" }, status: "dnd" });
  console.log(`${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`${client.user.username}: Şu an ` + client.channels.cache.size + ` adet kanala, ` + client.guilds.cache.size + ` adet sunucuya ve ` + client.guilds.cache.reduce((acc, currentValue) => acc + currentValue.memberCount, 0) + ` kullanıcıya hizmet veriliyor!`);
}


