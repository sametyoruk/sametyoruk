const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const client = global.client
const {üç, hapis, booster,log} = require("../../ayarlar.json")
const fs = require("fs")
const ms = require("ms")
const moment = require("moment");
const db = require("quick.db")

module.exports = {
	name: 'jail',
	description: 'Kullanıcıyı Hapse Atar',
	category: "mod",
    aliases: ["hapis"],
	async execute(message, client, args) {

        if(!message.member.roles.cache.has(üç) & !message.member.permissions.has("BAN_MEMBERS")) {
        message.reply(`:x: Bu Komutu Kullanmak için **Üyeleri Hapse At** Yetkisine Sahip Olman Gerekiyor !`).then(a => setTimeout(function() {a.delete()}, 5000))
        var asd = new MessageEmbed()
        .setColor("BLACK")
        .setDescription(`!! **${message.member}** Adlı kullanıcı ${message.channel} Adlı Kanalda \`Jail\` Komutunu Kullanmaya Çalıştı`)
        client.channels.cache.get(log).send({embeds: [asd]})
         } else {
        var kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0])
if(!kisi) return message.reply(`:x: Lütfen Bir Kullanıcı Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))

if(!args[1]) return message.reply(`:x: Lütfen Bir Süre Belirtin ( \`1m\` | \`1h\` | \`1d\` | \`1w\` )`).then(a => setTimeout(function() {a.delete()}, 5000))
var süre = ms(args[1])
        if(süre == undefined) return message.reply(`:x: Lütfen Geçerli Bir Süre Belirtin ( \`1m\` | \`1h\` | \`1d\` | \`1w\` )`).then(a => setTimeout(function() {a.delete()}, 5000))


if(kisi.roles.cache.has(hapis)) return message.reply(`:x: Kullanıcı Zaten Hapiste ?!?`).then(a => setTimeout(function() {a.delete()}, 5000))

        if(message.member.roles.highest.position <= kisi.roles.highest.position) return message.reply(`:x: Maalesef Bu Kullanıcıyı Hapse Atamazsınız !`).then(a => setTimeout(function() {a.delete()}, 5000))

        if(args[2]) sebep = args.slice(2).join(" ")
        if(!args[2]) sebep = `Belirtilmedi`

        var cezano = db.fetch(`cezano_${kisi.id}`)
        if(!cezano) {
                db.add(`cezano_${kisi.id}`, +1)
        } else {
                db.add(`cezano_${kisi.id}`, +1)
        }
        var cezano = db.fetch(`cezano_${kisi.id}`)
	var embed = new MessageEmbed()
	.setColor("GREEN")
						.setAuthor({ name: `${client.user.username} & Jail`, iconURL: client.user.displayAvatarURL({dynamic: true}), url: ''})
		.setDescription(`**${kisi.user.username}** Adlı Kullanıcı \`${sebep}\` Sebebiyle ${ms(süre)} Süresince Başarıyla Hapse Gönderildi ! (Ceza No: \`#${cezano}\`)`)
        .setTimestamp()
						.setFooter({ text: `Cezalandıran: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}) 
	
message.reply({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 6000))

var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(`!! **${kisi.user.username}** Adlı Kullanıcı \`${sebep}\` Sebebiyle **${ms(süre)}** Süresince **${message.author.username}** Adlı Yetkili Tarafından Jaile Gönderildi ! (Ceza No: \`#${cezano}\`)`)
client.channels.cache.get(log).send({embeds: [asd]})

var now = new Date()
        var r = moment(now).format("DD.MM.YY")

var roller = kisi.roles.cache.map(a => a.id)
 var rolller = roller.filter(a => a.id !== booster & a.id !== hapis)
 db.set(`jail-rol_${message.guild.id}_${kisi.id}`, rolller)
  kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )

  if(kisi.voice.channel) {
        kisi.voice.disconnect();
  }
db.push(`sabıka-jail_${message.guild.id}_${kisi.id}`, `\`${r}\`| <@${message.author.id}> => **${ms(süre)}** Jail (${sebep}) \`#${cezano}\``)
 
  setTimeout(function() {
 kisi.roles.add(hapis)
  }, 3000)
  
    setTimeout(function() { 
      var e = db.fetch(`jail-rol_${message.guild.id}_${kisi.id}`)
    if (!e) return;

     kisi.roles.add(e)
    setTimeout(function() {
kisi.roles.remove(hapis)
    }, 3000)  
      db.delete(`jail-rol_${message.guild.id}_${kisi.id}`)

    }, süre)
    }}}