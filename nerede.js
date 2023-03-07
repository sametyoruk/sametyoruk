const {MessageEmbed, MessageActionRow, MessageButton, MessageCollector} = require("discord.js");
const client = global.client
const {bir,sahip} = require("../../ayarlar.json")
module.exports = {
	name: 'nerede',
	description: 'İsta',
	category: "yetkil,",
    aliases: ["sestemi"],
	execute(message, client, args) {

  if(!message.member.roles.cache.has(bir) & !message.member.permissions.has("ADMINISTRATOR") & message.author.id !== message.guild.ownerId & message.author.id !== sahip) return;

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!member) return message.reply(`:x: Lütfen Bir Kullanıcı Belirtin !`).then(a => setTimeout(function() {a.delete()}, 5000))
 
let kanal = member.voice.channel
    if(!kanal) return message.reply(`${member} (\`${member.id}\`) Adlı Kullanıcı Herhangi Bir Ses Kanalında Bulunmuyor !`).then((e) => setTimeout(() => { e.delete(); }, 5000));
let microphone = member.voice.selfMute ? "<:evergarden_kapalimic:1066775610086662215> (\`Kapalı\`)" : "<:evergarden_acikmic:1066775603740680313> (\`Açık\`)";

let headphones = member.voice.selfDeaf ? "<:evergarden_kapalikulaklik:1066775600964063252> (\`Kapalı\`)" : "<:evergarden_acikkulaklik:1066775608232787978>  (\`Açık\`)";

let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join(", ")

const button = new MessageActionRow()
.addComponents(
	new MessageButton()
	.setCustomId("bagla")
	.setLabel("Bağlanmak İçin Tıkla")
	.setStyle("SUCCESS")
)

var embed = new MessageEmbed()
.setColor("BLACK")
.setDescription(`${member} kullanıcısı <#${kanal.id}> (\`${kanal.id}\`) kanalında bulunmakta.

> **Mikrofon Durumu:** 
${microphone}

> **Kulaklık Durumu:** 
${headphones}

> **Odadaki Kullanıcılar: **
${sestekiler}`)

message.reply({ embeds: [embed], components: [button]}).then(async function(mesaj) {
    mesaj.createMessageComponentCollector(user => user.clicker.id == message.author.id).on("collect", async (button) => {

 await button.deferUpdate();
                    if(button.customId == "bagla") {
                       
                        if(button.user.id !== message.member.id) return;
                        
                        if(!message.member.voice.channel) return message.reply({content: ":x: Ses Kanalında Bulunman Gerek !", ephemeral: true})
                        if(message.member.voice.channel.id == kanal.id) return message.reply({content: ":x: Aynı Sestesiniz !", ephemeral: true})
                        
                        message.member.voice.setChannel(kanal);
                        mesaj.reply(`:white_check_mark: Başarıyla <#${kisi.voice.channel.id}> İsimli Ses Kanalına Bağlandınız !`).then(a => setTimeout(function() {a.delete}, 5000))
                        
                  
                    }
                })
            })
        }
    }
    