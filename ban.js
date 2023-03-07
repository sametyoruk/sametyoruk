const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const client = global.client
const {dört, guardop,hapis, sahip,log} = require("../../ayarlar.json")
const fs = require("fs")
const moment = require("moment")
const db = require("quick.db")
module.exports = {
	name: 'ban',
	description: 'Kullanıcıyı Sunucudan Engeller',
	category: "mod",
    aliases: ["engelle", "banla"],
	async execute(message, client, args) {
                if(!message.member.roles.cache.has(dört) & !message.member.permissions.has("BAN_MEMBERS")) {
                        message.reply(`:x: Bu Komutu Kullanmak için **Üyeleri Yasakla** Yetkisine Sahip Olman Gerekiyor !`).then(a => setTimeout(function() {a.delete()}, 5000))
                        var asd = new MessageEmbed()
                        .setColor("BLACK")
                        .setDescription(`!! **${message.member}** Adlı kullanıcı ${message.channel} Adlı Kanalda \`Ban\` Komutunu Kullanmaya Çalıştı`)
                        client.channels.cache.get(log).send({embeds: [asd]})
                         } else {
 
        var kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!kisi) return message.reply(`:x: Lütfen Bir Kullanıcı Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))

var bann = await message.guild.bans.fetch()
if(bann.has(kisi.id) === true) return message.reply(`:x: Kullanıcının Zaten Sunucu Engeli Bulunmakta !`).then(a => setTimeout(function() {a.delete()}, 5000))

if(bann.has(kisi.id) === false) {
        if(message.guild.members.cache.has(kisi.id)) {
        if(message.member.roles.highest.position <= kisi.roles.highest.position && kisi.id == sahip) return message.reply(`:x: Maalesef Bu Kullanıcıyı Banlayamazsınız !`).then(a => setTimeout(function() {a.delete()}, 5000))
        if(kisi.permissions.has("ADMINISTRATOR"))  return message.reply(`:x: Maalesef Bu Kullanıcıyı Banlayamazsınız !`).then(a => setTimeout(function() {a.delete()}, 5000))        
}   

      
        var sebep = args.slice(1).join(" ")
        if(!sebep & !message.member.permissions.has("ADMINISTRATOR")) return message.reply(`:x: Lütfen Bir Sebep Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))
        if(!sebep) sebep = "Belirtilmedi"
        message.guild.members.ban(kisi, { reason: sebep});

        var now = new Date()
        var r = moment(now).format("DD.MM.YY")

        var cezano = db.fetch(`cezano_${kisi.id}`)
        if(!cezano) {
                db.add(`cezano_${kisi.id}`, +1)
        } else {
                db.add(`cezano_${kisi.id}`, +1)
        }
        var cezano = db.fetch(`cezano_${kisi.id}`)
	var embed = new MessageEmbed()
	.setColor("GREEN")
						.setAuthor({ name: `${client.user.username} & Ban`, iconURL: client.user.displayAvatarURL({dynamic: true}), url: ''})
		.setDescription(`**${kisi}** Adlı Kullanıcı \`${sebep}\` Sebebiyle Başarıyla Banlandı ! (Ceza No: \`#${cezano}\`)`)
        .setTimestamp()
						.setFooter({ text: `Banlayan: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}) 
	
message.reply({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 6000))

var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(`!! **${kisi.user.username}** Adlı Kullanıcı \`${sebep}\` Sebebiyle **${message.author.username}** Adlı Yetkili Tarafından Sunucudan Engellendi ! (Ceza No: \`#${cezano}\`)`)
client.channels.cache.get(log).send({embeds: [asd]})

db.push(`sabıka-ban_${message.guild.id}_${kisi.id}`, `\`${r}\`| <@${message.author.id}> => Ban (${sebep}) \`#${cezano}\``)
 
 setTimeout(function() {
	 db.add(`ban-sayi_${message.author.id}`, -1)
 }, 1000*60*15)
}


        
        }}}