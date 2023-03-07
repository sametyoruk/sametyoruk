const {MessageEmbed, MessageActionRow, MessageButton, MessageCollector} = require("discord.js");
const client = global.client
const {üç,log} = require("../../ayarlar.json")
module.exports = {
	name: 'sil',
	description: 'İsta',
	category: "yetkil,",
    aliases: ["clear"],
	execute(message, client, args) {

  if(!message.member.permissions.has("MANAGE_MESSAGES") & !message.member.roles.cache.has(üç) & !message.member.permissions.has("ADMINISTRATOR") & message.author.id !== message.guild.ownerId) {

	if(!sayı) sayı = "0"
	message.reply(":x: Yetkin Yetersiz !")

var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(` ${message.member} Adlı Kullanıcı ${message.channel} Kanalında \`Sil\` Komutunu Kullanmaya Çalıştı`)
client.channels.cache.get(log).send({embeds: [asd]})
} else {
var sayı = args[0]
if(!sayı || isNaN(sayı)) return message.reply(":x: Lütfen Silmek İstediğiniz Mesaj Sayısını Giriniz").then(a => setTimeout(function() {a.delete()}, 5000))
if(sayı > 100) return message.reply(":x: 100 den fazla mesajı tek seferde silemem").then(a => setTimeout(function() {a.delete()}, 5000))
	
message.channel.bulkDelete(sayı, true)

const embed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`:white_check_mark: \`${sayı}\` Adet Mesaj Başarıyla Silindi !
`)
message.reply({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 5000))


var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(`${message.member} Adlı Yetkili ${message.channel} isimli Kanaldan \`${sayı}\` Mesaj Sildi !`)
client.channels.cache.get(log).send({embeds: [asd]})

}}}