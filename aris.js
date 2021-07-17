const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("ms");
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
const { Client, MessageAttachment } = require('discord.js');
const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const database = require("./database/korumalar")
const escapeStringRegexp = require('escape-string-regexp')
const emojiRegex = require("emoji-regex")
const channels = require("./database/modlog")
const db = require("./database/whitelist");
const { resolve } = require("path");
require('discord-buttons')(client)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
} 
// Sunucu Davet Koruma.

client.on('message', async(message) => {
const s = await channels.findOne({guildID: message.guild.id})
const kanal = message.guild.channels.cache.get(s.channel)
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk).setAuthor('Engellenen Mesajlar', message.author.avatarURL({ dynamic: true }));
const data = await database.findOne({guildID: message.guild.id});
if (!data) return
if(message.author.bot) return;
const Database = await db.findOne({ ServerID: message.guild.id });
if(Database.WhiteListMembers.includes(message.member.id) || Database.WhiteListChannels.includes(message.channel.id) || message.member.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return; 

  if(data.davetEngel == true){

   let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
   if (link.test(message.content)){
   if(message.deletable) message.delete({ timeout: 0010 })
   message.reply("**bu sunucuda \`davet link\` atamazsın** <a:Aris_Red:839475545544458271>").then(a => a.delete({timeout: 5000})).catch((err) => {  })
   kanal.send(embed.setDescription(`Davet içeren bir mesaj atıldı! 
Davet mesajı atan : ${message.author} 
Atılan mesaj : ${message}`))
  }}
  // Yapıldı
  if(data.kufurEngel === true) {
   let fulls = ["orspu","sktmn","allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc","abaza","abazan","ag","a\u011fz\u0131na s\u0131\u00e7ay\u0131m","o\231	","fuck","shit","ahmak","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n","amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim","am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu","am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amk","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","amm","ammak","ammna","amn","amna","amnda","amndaki","amngtn","amnn","amona","amq","ams\u0131z","amsiz","amsz","amteri","amugaa","amu\u011fa","amuna","ana","anaaann","anal","analarn","anam","anamla","anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim","anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim","anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annenin","annesiz","anuna","aq","a.q","a.q.","aq.","atkafas\u0131","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r","azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na","bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","bastard","b\u0131z\u0131r","bitch","biting","boner","bosalmak","bo\u015falmak","cenabet","cibiliyetsiz","cibilliyetini","cibilliyetsiz","cif","cikar","cim","\u00e7\u00fck","dalaks\u0131z","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f","domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck","eben","ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","embesil","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibi\u015f","gibmek","gibtiler","goddamn","godo\u015f","godumun","gotelek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131","g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc","g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren","hasiktir","hassikome","hassiktir","has siktir","hassittir","haysiyetsiz","hayvan herif","ho\u015faf\u0131","h\u00f6d\u00fck","hsktr","huur","\u0131bnel\u0131k","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","imansz","ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kafasiz","kahpe","kahpenin","kahpenin feryad\u0131","kaka","kaltak","kanc\u0131k","kancik","kappe","karhane","ka\u015far","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","keva\u015fe","kevvase","koca g\u00f6t","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun","koduumun","koyarm","koyay\u0131m","koyiim","koyiiym","koyim","koyum","koyyim","krar","kukudaym","laciye boyad\u0131m","libo\u015f","madafaka","malafat","malak","mcik","meme","memelerini","mezveleli","minaamc\u0131k","mincikliyim","mna","monakkoluyum","motherfucker","mudik","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu","orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun","orospunun evlad\u0131","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","\u00f6k\u00fcz","\u00f6\u015fex","patlak zar","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin evlad\u0131","pezevenk","pezo","pic","pici","picler","pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","pipi","pipi\u015f","pisliktir","porno","pussy","pu\u015ft","pu\u015fttur","rahminde","revizyonist","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","serefsiz","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sie","sik","sikdi","sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f","siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokar\u0131m","sokarim","sokarm","sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","soxum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz","\u015f\u0131ll\u0131k","taaklarn","taaklarna","tarrakimin","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toplarm","topsun","toto\u015f","vajina","vajinan\u0131","veled","veledizina","veled i zina","verdiimin","weled","weledizina","whore","xikeyim","yaaraaa","yalama","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarraa","yarramm","yarra\u011f\u0131m\u0131","yarrmin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yavak","yav\u015f","yav\u015fak","yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zibidi","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini"];
   const fullRegex = new RegExp(`\\b(${fulls.map(x => escapeStringRegexp(x.trim())).join('|')})\\b`, "i");
   if(fulls.length && fullRegex.test(message.content)) {
    if(message.deletable) message.delete({ timeout: 0010 })
    message.reply("**bu sunucuda \`küfür\` edemezsin** <a:Aris_Red:839475545544458271>").then(a => a.delete({timeout: 5000})).catch((err) => {  })
    kanal.send(embed.setDescription(`Küfür içeren bir mesaj atıldı! 
Küfür mesajı atan : ${message.author} 
Atılan mesaj : ${message}`))
  }}
  // Yapıldı
   if(data.LinkEngel === true) {
   let link = /(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;  
   if (link.test(message.content)){
   if(message.deletable) message.delete({ timeout: 0010 })
 message.reply("**bu sunucuda \`link\` atamazsın** <a:Aris_Red:839475545544458271>").then(a => a.delete({timeout: 5000})).catch((err) => {  })
 kanal.send(embed.setDescription(`Link içeren bir mesaj atıldı! 
 Link mesajı atan : ${message.author} 
 Atılan mesaj : ${message}`))
 }}
  
 if(data.EtiketEngel === true) {
 if(message.mentions.users.size >= 15) {
  if(message.deletable) message.delete({ timeout: 0010 })
  message.reply("**bu kadar fazla insanı \`etiketleyip\` rahatsız edemezsin **<a:Aris_Red:839475545544458271>").then(a => a.delete({timeout: 5000})).catch((err) => {  })
  kanal.send(embed.setDescription(`Etiket içeren bir mesaj atıldı! 
Etiket mesajı atan : ${message.author} 
Atılan mesaj : ${message}`))
}}
if(data.CapslockEngel === true) {
  let matched = message.content.replace(/[^A-Z]/g, "").length
  let yuzde = percentage(matched, message.content.length)
  if (Math.round(yuzde) > 50) {
    if(message.deletable) message.delete({ timeout: 0010 })

    message.reply("**bu sunucuda \`Büyük Harf\` kullanamazsın** <a:Aris_Red:839475545544458271>").then(a => a.delete({timeout: 5000})).catch((err) => {  })
    kanal.send(embed.setDescription(`Büyük Harf içeren bir mesaj atıldı! 
Büyük Harf mesajı atan : ${message.author} 
Atılan mesaj : ${message}`)) 
  }}

  if (Database && Database.FiltredWords.some(Word => ` ${message.content.toLowerCase()} `.includes(` ${Word} `)) === true) {
    if (message && message.deletable) message.delete({ timeout: 0150 }).catch(() => {});
    message.reply('Filtrelenmiş kelime içeren mesajlar kullanman yasak !').then(x => x.delete({timeout: 3000}))
    kanal.send(embed.setDescription(`Filtreli kelime atıldı!
    Filtrelenmiş mesaj atan : ${message.author} 
    Atılan mesaj : ${message}`)) 
  }
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////// KANAL KORUMA ///////////////////////////////
//Kanal Oluşturma
client.on("channelCreate", async channel => {
const config = require("./ayarlar.json")
const data = await database.findOne({guildID: channel.guild.id});
if (!data) return
const s = await channels.findOne({guildID: channel.guild.id})
const kanal = channel.guild.channels.cache.get(s.channel)
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const Database = await db.findOne({ ServerID: channel.guild.id });
let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
const m = channel.guild.members.cache.get(entry.executor.id)
if (data.KanalKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
channel.delete({reason: "Hanzo Guard System"});
const rol = data.JailRole
m.roles.set(rol)
ytKapat(channel.guild.id)
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından kanal oluşturuldu! Oluşturan kişi jaile atıldı ve kanal silindi.`)).catch(); } else { channel.guild.owner.send(embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından kanal oluşturuldu! Oluşturan kişi jaile atıldı ve kanal silindi.`)).catch(err => {}); };
})
//Kanal düzenleme
client.on("channelUpdate", async (oldChannel, newChannel) => {
const config = require("./ayarlar.json")
const data = await database.findOne({guildID: oldChannel.guild.id});
if (!data) return
const s = await channels.findOne({guildID: oldChannel.guild.id})
const kanal = oldChannel.guild.channels.cache.get(s.channel)
let embed = new MessageEmbed().setFooter(`Hanzo Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const Database = await db.findOne({ ServerID: oldChannel.guild.id });

let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
const m = oldChannel.guild.members.cache.get(entry.executor.id)
if (data.KanalKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
ytKapat(oldChannel.guild.id)
m.roles.set(rol)
  if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if (newChannel.type === "category") {
    newChannel.edit({
      name: oldChannel.name,
    });
  } else if (newChannel.type === "text") {
    newChannel.edit({
      name: oldChannel.name,
      topic: oldChannel.topic,
      nsfw: oldChannel.nsfw,
      rateLimitPerUser: oldChannel.rateLimitPerUser
    });
  } else if (newChannel.type === "voice") {
    newChannel.edit({
      name: oldChannel.name,
      bitrate: oldChannel.bitrate,
      userLimit: oldChannel.userLimit,
    });
  };
  oldChannel.permissionOverwrites.forEach(perm => {
    let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
      thisPermOverwrites[p] = true;
    });
    perm.deny.toArray().forEach(p => {
      thisPermOverwrites[p] = false;
    });
    newChannel.createOverwrite(perm.id, thisPermOverwrites);
  });
  if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından kanal düzenlendi! Oluşturan kişi jaile atıldı ve kanal eski haline getirildi.`)).catch(); } else { channel.guild.owner.send(embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından kanal düzenlendi! Oluşturan kişi jaile atıldı ve kanal eski haline getirildi.`)).catch(err => {}); };
});

//Kanal silinince açma 
client.on("channelDelete", async channel => {
const config = require("./ayarlar.json")
const data = await database.findOne({guildID: channel.guild.id});
if (!data) return
const s = await channels.findOne({guildID: channel.guild.id})
const kanal = channel.guild.channels.cache.get(s.channel)
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const Database = await db.findOne({ ServerID: channel.guild.id });
let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
const m = channel.guild.members.cache.get(entry.executor.id)
if (data.KanalKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(channel.guild.id)
await channel.clone({ reason: "Hanzo Guard System" }).then(async kanal => {
if (channel.parentID != null) await kanal.setParent(channel.parentID);
await kanal.setPosition(channel.position);
if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  });
  if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${channel.name}** kanalı silindi! Silen kişi jaile atıldı ve kanal tekrar açıldı.`)).catch(); } else { channel.guild.owner.send(embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${channel.name}** kanalı silindi! Silen kişi jaile atıldı ve kanal tekrar açıldı.`)).catch(err => {}); };
});
///////////////////////////// KANAL KORUMA ///////////////////////////////

///////////////////////////// ROL KORUMA ///////////////////////////////

//ROL SİLME
client.on("roleDelete", async role => {
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Hanzo Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: role.guild.id});
if (!data) return
const s = await channels.findOne({guildID: role.guild.id})
const kanal = role.guild.channels.cache.get(s.channel)
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
const m = role.guild.members.cache.get(entry.executor.id)
const Database = await db.findOne({ ServerID: role.guild.id });
if (data.RolKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(role.guild.id)
let yeniRol = await role.guild.roles.create({
data: {
name: role.name,
color: role.hexColor,
hoist: role.hoist,
position: role.position,
permissions: role.permissions,
mentionable: role.mentionable
},
reason: "Rol Silindiği İçin Tekrar Oluşturuldu! - Cartel Guard System!"
});
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${role.name}** rolü silindi! Silen kişi jaile atıldı ve rol tekrar açıldı.`)).catch(); } else { role.guild.owner.send(embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${role.name}** rolü silindi! Silen kişi jaile atıldı ve rol tekrar açıldı.`)).catch(err => {}); };
})
//ROL OLUŞTURMA
client.on("roleCreate", async role => {
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: role.guild.id});
if (!data) return
const s = await channels.findOne({guildID: role.guild.id})
const kanal = role.guild.channels.cache.get(s.channel)
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
const m = role.guild.members.cache.get(entry.executor.id)
const Database = await db.findOne({ ServerID: role.guild.id });
if (data.RolKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(role.guild.id)
role.delete({ reason: "İzinsiz Açılan Rol Silindi! - Cartel Guard System!" });
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${role.name}** rolü açıldı! Açan kişi jaile atıldı ve rol silindi.`)).catch(); } else { role.guild.owner.send(embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${role.name}** rolü açıldı! Açan kişi jaile atıldı ve rol silindi.`)).catch(err => {}); };
})
//ROL DÜZENLEME
client.on("roleUpdate", async (oldRole, newRole) => {
const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: newRole.guild.id});
if (!data) return
const s = await channels.findOne({guildID: newRole.guild.id})
const kanal = newRole.guild.channels.cache.get(s.channel)
let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
const m = newRole.guild.members.cache.get(entry.executor.id)
const Database = await db.findOne({ ServerID: newRole.guild.id });
if (data.RolKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(newRole.guild.id)
if (yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
newRole.setPermissions(oldRole.permissions);
newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
};
newRole.edit({
name: oldRole.name,
color: oldRole.hexColor,
hoist: oldRole.hoist,
permissions: oldRole.permissions,
mentionable: oldRole.mentionable
});
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${oldRole.name}** rolü düzenlendi! Düzenleyen kişi jaile atıldı ve rol alındı.`)).catch(); } else { role.guild.owner.send(embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından **${oldRole.name}** rolü verildi! Düzenleyen kişi jaile atıldı ve rol alındı.`)).catch(err => {}); };
});
//Yetki Verme 
client.on("guildMemberUpdate", async (oldMember, newMember) => {
const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: newMember.guild.id});
if (!data) return
const s = await channels.findOne({guildID: newMember.guild.id})
const kanal = newMember.guild.channels.cache.get(s.channel)
const Database = await db.findOne({ ServerID: newMember.guild.id });
if (newMember.roles.cache.size > oldMember.roles.cache.size) {
let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
const m = newMember.guild.members.cache.get(entry.executor.id)
if (data.RolKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
if (yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
const rol = data.JailRole
m.roles.set(rol)
ytKapat(newMember.guild.id)
newMember.roles.set(oldMember.roles.cache.map(r => r.id));
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${newMember} (${newMember.id}) üyesine ${entry.executor} (${entry.executor.id}) tarafından sağ tık yetki verildi! Veren kişi jaile ayıldı ve verilen kişiden rol geri alındı.`)).catch(); } else { role.guild.owner.send(embed.setDescription(`${newMember} (${newMember.id}) üyesine ${entry.executor} (${entry.executor.id}) tarafından sağ tık yetki verildi! Veren kişi jaile atıldı ve verilen kişiden rol geri alındı.`)).catch(err => {}); };
};
};
});
///////////////////////////// ROL KORUMA ///////////////////////////////

///////////////////////////// SERVER KORUMA ///////////////////////////////
client.on("guildUpdate", async (oldGuild, newGuild) => {
let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: newGuild.id});
if (!data) return
const s = await channels.findOne({guildID: newGuild.id})
const kanal = newGuild.channels.cache.get(s.channel)
const Database = await db.findOne({ ServerID: newGuild.id });
const m = newGuild.members.cache.get(entry.executor.id)
if (data.serverKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(newGuild.id)
if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${entry.executor} **(${entry.executor.id})** tarafından sunucu güncellendi! Güncelleyen kişi jaile atıldı ve sunucu eski haline getirildi.`)).catch(err => {}); };
});
///////////////////////////// SERVER KORUMA ///////////////////////////////

///////////////////////////// BAN-KİCK KORUMA ///////////////////////////////
client.on("guildBanAdd", async (guild, user) => {
let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: guild.id});
if (!data) return
const s = await channels.findOne({guildID: guild.id})
const kanal = guild.channels.cache.get(s.channel)
const Database = await db.findOne({ ServerID: guild.id });
const m = guild.members.cache.get(entry.executor.id)
if (data.banKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(guild.id)
guild.members.unban(user.id, "Sağ Tık İle Banlandığı İçin Geri Açıldı! - Cartel Guard System!").catch(console.error);
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${user} **(${user.id})** üyesi, ${entry.executor} **(${entry.executor.id})** tarafından sunucudan sağ tık ile banlandı! Banlayan kişi jaile atıldı.`)).catch(err => {}); };
});

client.on("guildMemberRemove", async member => {
let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: member.guild.id});
if (!data) return
const s = await channels.findOne({guildID: member.guild.id})
const kanal = member.guild.channels.cache.get(s.channel)
const Database = await db.findOne({ ServerID: member.guild.id });
const m = member.guild.members.cache.get(entry.executor.id)
if (data.banKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol) 
ytKapat(member.guild.id)
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${member} **(${member.id})** üyesi, ${entry.executor} **(${entry.executor.id})** tarafından sunucudan sağ tık ile kicklendi! Kickleyen kişi jaile atıldı.`)).catch(err => {}); };
});
///////////////////////////// BAN-KİCK KORUMA ///////////////////////////////

///////////////////////////// BOT KORUMA /////////////////////////////// BOTU BANLAMIYOR!!!
client.on("guildMemberAdd", async member => {
let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
const config = require("./ayarlar.json")
let embed = new MessageEmbed().setFooter(`Cartel Chat Guard | Developed By Aris.`).setColor(ayarlar.embedrenk);
const data = await database.findOne({guildID: member.guild.id});
if (!data) return
const s = await channels.findOne({guildID: member.guild.id})
const kanal = member.guild.channels.cache.get(s.channel)
const Database = await db.findOne({ ServerID: member.guild.id });
const m = member.guild.members.cache.get(entry.executor.id)
if (data.botKoruma === false || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || Database.WhiteListMembers.includes(entry.executor.id) || config.botID.includes(entry.executor.id) || m.roles.cache.map(role => role.id).some(role => Database.WhiteListRoles.includes(role))) return;
const rol = data.JailRole
m.roles.set(rol)
ytKapat(member.guild.id)
//members.ban(member.id, "İzinsiz Eklenen Bot Başarıyla Banlandı! - Hanzo Guard System!").catch(console.error);
if (kanal) { kanal.send(`@everyone`, embed.setDescription(`${member} **(${member.id})** botu, ${entry.executor} **(${entry.executor.id})** tarafından sunucuya eklendi! Ekleyen kişi jaile atıldı ve bot banlandı.`)).catch(err => {}); };
  });
///////////////////////////// BOT KORUMA ///////////////////////////////

///////////////////////////// YT KAPATMA FONKSİYONU ///////////////////////////////
function ytKapat(sunucuID) {
let sunucu = client.guilds.cache.get(sunucuID);
if (!sunucu) return;
sunucu.roles.cache.filter(e => e.editable && (e.permissions.has("ADMINISTRATOR") || e.permissions.has("MANAGE_CHANNELS") || e.permissions.has("MANAGE_EMOJIS") || e.permissions.has("MANAGE_GUILD") || e.permissions.has("MANAGE_ROLES") || e.permissions.has("MANAGE_WEBHOOKS") || e.permissions.has("MENTION_EVERYONE") || e.permissions.has("BAN_MEMBERS") || e.permissions.has("KICK_MEMBERS"))).forEach(async r => {
await r.setPermissions(0);
});
};
///////////////////////////// YT KAPATMA FONKSİYONU ///////////////////////////////

require("./util/eventLoader")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
   if (err) console.error(err);
   files.forEach(f => {
 fs.readdir(`./komutlar/${f}/`, (err, filess) => {
   if (err) console.error(err);
   console.log(`${f} Klasöründen ${filess.length} Komut Yüklenecek;`);
   filess.forEach(fs => {
     let props = require(`./komutlar/${f}/${fs}`);
     client.commands.set(props.help.name, props);
     props.conf.aliases.forEach(alias => {
       client.aliases.set(alias, props.help.name);
     });
    });
   });
  });
 });

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

mongoose.connect('mongodb+srv://phentoss:Hg88sfi.@cluster0.rkepp.mongodb.net/hanzochatguards?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
client.login(ayarlar.token)
