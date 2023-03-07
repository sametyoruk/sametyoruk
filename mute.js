const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const client = global.client
const {iki,üç,dört,beş,log} = require("../../ayarlar.json")
const ms = require("ms")
const moment = require("moment")
const db = require("quick.db")

module.exports = {
	name: 'mute',
	description: 'Kullanıcıyı Süreli Susturur',
	category: "mod",
    aliases: ["sustur", "zaman-aşımı"],
	async execute(message, client, args) {
      
        if(!message.member.roles.cache.has(iki) & !message.member.roles.cache.has(üç) & !message.member.roles.cache.has(dört) & !message.member.roles.cache.has(beş) & !message.member.permissions.has("MODERATE_MEMBERS")) {
        message.reply(`:x: Bu Komutu Kullanmak için **Üyeleri Yönet** Yetkisine Sahip Olman Gerekiyor !`).then(a => setTimeout(function() {a.delete()}, 5000))
        var asd = new MessageEmbed()
        .setColor("BLACK")
        .setDescription(`!! **${message.member}** Adlı kullanıcı ${message.channel} Adlı Kanalda \`Mute\` Komutunu Kullanmaya Çalıştı`)
        client.channels.cache.get(log).send({embeds: [asd]})
         } else {
        var kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!kisi) return message.reply(`:x: Lütfen Bir Kullanıcı Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))

     //   var args = args[1]
	//	if(!args) return message.channel.send(`bişi belir taq`)
       if(!args[1]) return message.reply(`:x: Lütfen Bir Süre Belirtin ( \`1m\` | \`1h\` | \`1d\` | \`1w\` )`).then(a => setTimeout(function() {a.delete()}, 5000))

        var süre = ms(args[1])
        if(!süre || süre == undefined) return message.reply(`:x: Lütfen Geçerli Bir Süre Belirtin ( \`1m\` | \`1h\` | \`1d\` | \`1w\` )`).then(a => setTimeout(function() {a.delete()}, 5000))

		
			if(message.member.roles.highest.position <= kisi.roles.highest.position & message.author.id !== message.guild.ownerId) return message.reply(`:x: Maalesef Bu Kullanıcıyı Susuturamazsınız !`).then(a => setTimeout(function() {a.delete()}, 5000))
			
var sebep = args.slice(2).join(" ")
if(!sebep) sebep = `Belirtilmedi`

kisi.timeout(süre,sebep);
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
						.setAuthor({ name: `${client.user.username} / Mute`, iconURL: client.user.displayAvatarURL({dynamic: true}), url: ''})
		.setDescription(`**${kisi.user.username}** Adlı Kullanıcı  \`${sebep}\` Sebebiyle **${ms(süre)}** Boyunca Susuturuldu ! (Ceza No: \`#${cezano}\`)`)
        .setTimestamp()
						.setFooter({ text: `Susuturan: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}) 
	
message.reply({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 6000))
db.push(`sabıka-mute_${message.guild.id}_${kisi.id}`, `\`${r}\`| <@${message.author.id}> => **${ms(süre)}** Mute (${sebep}) \`#${cezano}\``)

var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(`! **${kisi.user.username}** Adlı Kullanıcı **${ms(süre)}** Süresince \`${sebep}\` Sebebiyle **${message.author.username}** Adlı Yetkili Tarafından Susturuldu! (Ceza No: \`#${cezano}\`)`)
client.channels.cache.get(log).send({embeds: [asd]})
}}}