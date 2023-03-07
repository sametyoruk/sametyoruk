const { prefix } = require("../ayarlar.json")
const db = require("quick.db");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { sahip } = require("../ayarlar.json")
const moment = require("moment")
module.exports = client => {

client.on("messageCreate", async message => {

    if(!message.guild) return;
  var sure = db.fetch(`afk-sure_${message.guild.id}_${message.author.id}`)
  var display = db.fetch(`afk-isim_${message.guild.id}_${message.author.id}`)
  
 if (!sure) return;
  if (!display) return;
  var zmn = moment(sure).format("DD/MM/YYYY hh:mm:ss")
  var kisi = message.guild.members.cache.get(message.author.id)
  const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} & Afk`, client.user.avatarURL({dynamic: true }))
  .setTimestamp()
  .setFooter(`${message.author.tag} Artık Afk Değil`)
  .setDescription(`${message.author} Afk Modundan Çıktı \`${zmn}\` Tarihinde Afk Moduna Girmişti !`)
  message.channel.send({embeds: [embed]})

  kisi.setNickname(`${display}`)
  
  db.delete(`afk-sure_${message.guild.id}_${message.author.id}`)
  db.delete(`afk-isim_${message.guild.id}_${message.author.id}`)
  db.delete(`afk-sebep_${message.guild.id}_${message.author.id}`)
  
})

client.on("messageCreate", async message => {
    if(!message.guild) return;
  var now = Date.now()

  var kisi = message.mentions.members.first()
  if (!kisi) return;
  
    var a = db.fetch(`afk-sure_${message.guild.id}_${kisi.id}`)
    if(!a) return;
  
  var c = db.fetch(`afk-sebep_${message.guild.id}_${kisi.id}`)
  if (!c) return;
  
  if (message.author.id !== client.user.id) {
    var zmn = moment(a).format("DD/MM/YYYY hh:mm:ss")
    const embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username} & Afk`, client.user.avatarURL({dynamic: true }))
  .setTimestamp()
  .setFooter(`${kisi.user.tag} Afk`)
  .setDescription(`${kisi} \`${c}\` Sebebi ile \`${zmn}\` Tarihinde Afk Moduna Girdi !`)
  message.channel.send({embeds: [embed]}).then(a => setTimeout(function() {a.delete}, 5000))
  }
})
}