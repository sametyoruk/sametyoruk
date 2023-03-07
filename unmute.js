const { MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const client = global.client
const {iki,üç,dört,beş,log} = require("../../ayarlar.json")
const ms = require("ms")
module.exports = {
	name: 'unmute',
	description: 'Kullanıcının Mutesini Kaldırır',
	category: "mod",
    aliases: ["susturma-kaldır", "zamanaşımı-kaldır"],
	async execute(message, client, args) {

       if(!message.member.roles.cache.has(iki) & !message.member.roles.cache.has(üç) & !message.member.roles.cache.has(dört) & !message.member.roles.cache.has(beş) & !message.member.permissions.has("MODERATE_MEMBERS")) {

	 message.reply(`:x: Bu Komutu Kullanmak için **Üyeleri Yönet** Yetkisine Sahip Olman Gerekiyor !`).then(a => setTimeout(function() {a.delete()}, 5000))
	   var asd = new MessageEmbed()
	   .setColor("BLACK")
	   .setDescription(`!! **${message.member}** Adlı kullanıcı ${message.channel} Adlı Kanalda \`UnMute\` Komutunu Kullanmaya Çalıştı`)
	   client.channels.cache.get(log).send({embeds: [asd]})
		} else {
        var kisi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!kisi) return message.reply(`:x: Lütfen Bir Kullanıcı Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))

var sebep = args.slice(1).join(" ")
if(!sebep) sebep = `Belirtilmedi`

kisi.timeout(1,sebep);

	var embed = new MessageEmbed()
	.setColor("GREEN")
						.setAuthor({ name: `${client.user.username} / UnMute`, iconURL: client.user.displayAvatarURL({dynamic: true}), url: ''})
		.setDescription(`**${kisi.user.username}** Adlı Kullanıcının Mutesi  \`${sebep}\` Sebebiyle Başarıyla Kaldırıldı !`)
        .setTimestamp()
						.setFooter({ text: `Kaldıran: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}) 
	
message.reply({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 6000))

var asd = new MessageEmbed()
.setColor("BLACK")
.setDescription(`**!!** **${kisi.user.username}** Adlı Kullanıcının Mutesi \`${sebep}\` Sebebiyle **${message.author.username}** Adlı Yetkili Tarafından Kaldırıldı !`)
client.channels.cache.get(log).send({embeds: [asd]})
   }}}