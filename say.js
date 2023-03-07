const {MessageEmbed, MessageActionRow, MessageButton, MessageCollector} = require("discord.js");
const client = global.client
const {bir,sahip} = require("../../ayarlar.json")
module.exports = {
	name: 'say',
	description: 'İsta',
	category: "yetkil,",
    aliases: ["anlık", "istatistik"],
	execute(message, client) {

  if(!message.member.roles.cache.has(bir) & !message.member.permissions.has("ADMINISTRATOR") & message.author.id !== message.guild.ownerId & message.author.id !== sahip) return;

  var toplamuye = message.guild.members.cache.size
  var online = message.guild.members.cache.filter(a => a.presence?.status == "online").size + message.guild.members.cache.filter(a => a.presence?.status == "idle").size + message.guild.members.cache.filter(a => a.presence?.status == "dnd").size
var bot = message.guild.members.cache.filter(a => a.user.bot == true).size
var sesli = message.guild.members.cache.filter(x => x.voice.channel).size
var seslibot = message.guild.members.cache.filter(x => x.voice.channel).filter(a => a.user.bot == true).size
var taglı = message.guild.members.cache.filter(a => a.user.username.includes("ȣ") || a.user.username.includes("cérly") || a.user.username.includes("Cérly")).size
let boost = message.guild.premiumSubscriptionCount;

if(message.guild.premiumTier == "NONE") seviye = `0. Seviye`
if(message.guild.premiumTier == "TIER_1") seviye = `1. Seviye`
if(message.guild.premiumTier == "TIER_2") seviye = `2. Seviye`
if(message.guild.premiumTier == "TIER_3") seviye = `3. Seviye`
var yetkili = message.guild.members.cache.filter(a => a.roles.cache.has(bir)).size
const embed = new MessageEmbed()
.setColor("RANDOM")
.setDescription(`
<:rine_ok:1066036698577907773> Sunucumuzda anlık **${toplamuye}** üye bulunmakta (**${online}** Aktif)
<:rine_ok:1066036698577907773> Sunucumuzda anlık **${sesli}** üye seste bulunmakta (**${seslibot}** Bot)
<:rine_ok:1066036698577907773> Toplam **${yetkili}** yetkili bulunmakta
<:rine_ok:1066036698577907773> Sunucumuza **${boost}** adet boost basılmış (**${seviye}**)
`)
message.reply({embeds: [embed]})
}}