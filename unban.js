const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const client = global.client
const {dört,guardop,hapis,log} = require("../../ayarlar.json")
const fs = require("fs")
module.exports = {
	name: 'unban',
	description: 'Kullanının Sunucu Engelini Kaldırır',
	category: "mod",
    aliases: ["engel-kaldır", "ban-kaldır"],
	async execute(message, client, args) {

        if(!message.member.roles.cache.has(dört) & !message.member.permissions.has("BAN_MEMBERS")) {
			message.reply(`:x: Bu Komutu Kullanmak için **Üyeleri Yasakla** Yetkisine Sahip Olman Gerekiyor !`).then(a => setTimeout(function() {a.delete()}, 5000))
		var asd = new MessageEmbed()
		.setColor("BLACK")
		.setDescription(`!! **${message.member}** Adlı kullanıcı ${message.channel} Adlı Kanalda \`UnBan\` Komutunu Kullanmaya Çalıştı`)
		client.channels.cache.get(log).send({embeds: [asd]})
		 } else {
        var kisi = args[0]
if(!kisi && isNaN[0]) return message.reply(`:x: Lütfen Bir KullanıcıID Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))
var bann = await message.guild.bans.fetch()

if(bann.has(kisi) === false) return message.reply(`:x: Kullanıcının Zaten Sunucu Engeli Bulunmamakta !`).then(a => setTimeout(function() {a.delete()}, 5000))
var sebep = args.slice(1).join(" ")
if(!sebep & !message.member.permissions.has("ADMINISTRATOR")) return message.reply(`:x: Lütfen Bir Sebep Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))
if(!sebep) sebep = "Belirtilmedi"

        message.guild.members.unban(kisi, { reason: sebep})

	var embed = new MessageEmbed()
	.setColor("GREEN")
						.setAuthor({ name: `${client.user.username} / UnBan`, iconURL: client.user.displayAvatarURL({dynamic: true}), url: ''})
		.setDescription(`**<@${kisi}>** Adlı Kullanıcının Sunucu Engeli \`${sebep}\` Sebebiyle Başarıyla Kaldırıldı !`)
        .setTimestamp()
						.setFooter({ text: `Kaldıran: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}) 
	
message.reply({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 6000))

var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(`!! <@${kisi}> Adlı Kullanıcının Sunucu Engeli \`${sebep}\` Sebebiyle **${message.author.username}** Adlı Yetkili Tarafından Kaldırıldı !`)
client.channels.cache.get(log).send({embeds: [asd]})


}}}