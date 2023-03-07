const { prefix, muteli,hapis} = require("../ayarlar.json")
const db = require("quick.db");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { sahip,registerhammer,founder,owner,ceo,kayıtsız,booster } = require("../ayarlar.json")
const moment = require("moment")
module.exports = client => {

    client.on("interactionCreate", async(interaction) => {
        var kisi = interaction.guild.members.cache.get(interaction.user.id)

        if(interaction.customId == "katılma") {
interaction.reply({content: `Sunucumuza \`${moment(kisi.joinedTimestamp).format("DD/MM/YYYY hh:mm:ss")}\` Tarihinde Katılmışsın !`, ephemeral: true})
        }

        if(interaction.customId == "kurulus") {
            interaction.reply({content: `Sunucumuz \`${moment(interaction.guild.createdAt).format("DD/MM/YYYY hh:mm:ss")}\` Tarihinde Kuruldu !`, ephemeral: true})
        }
        if(interaction.customId == "olusturulma") {
            interaction.reply({content: `Hesabın \`${moment(client.users.cache.get(interaction.user.id).createdAt).format("DD/MM/YYYY hh:mm:ss")}\` Tarihinde Oluşturulmuş !`, ephemeral: true})
        }
      
        if(interaction.customId == "geçmiş") {
            var b = db.fetch(`isimler_${interaction.guild.id}_${kisi.id}`)
            if (!b) a = "Geçmişte Herhangi Bir İsim Kaydın Yok"
            if (b) a = db.fetch(`isimler_${interaction.guild.id}_${kisi.id}`).join("\n")
          
         interaction.reply({content: `
Geçmişteki İsimlerin:
            
\`${a}\``, ephemeral: true})
        }
 if(interaction.customId == "avatar") {

     const avatar = new MessageEmbed()
     .setColor("RANDOM")
     .setImage(kisi.displayAvatarURL({dynamic:true}))
     .setDescription("**Avatarın:**")
 interaction.reply({embeds: [avatar], ephemeral: true})
 }
 if(interaction.customId == "kayit") {

    if(kisi.roles.cache.has(registerhammer) || kisi.permissions.has("ADMINISTRATOR")) return interaction.reply({content: `:x: Yetkili Kişiler Tekrar Kayıt Olamaz !`, ephemeral: true})
    var roller = kisi.roles.cache.map(a => a.id)
    var rolller = roller.filter(a => a.id !== booster)
    kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )
    setTimeout(function() {
        kisi.roles.add(kayıtsız) 
        kisi.setNickname("İsim Yaş")})
 interaction.reply({content: `:white_check_mark: Başarılı !`, ephemeral: true})
}

 if(interaction.customId == "sabıka") {
   
    var mute = db.fetch(`sabıka-mute_${interaction.guild.id}_${interaction.user.id}`)
        if (mute) mute = db.fetch(`sabıka-mute_${interaction.guild.id}_${interaction.user.id}`).join(`\n`)
    if (!mute) mute = "Herhangi Bir Mute Sabıkan Bulunmamakta"
  
  var ban = db.fetch(`sabıka-ban_${interaction.guild.id}_${interaction.user.id}`)
      if (ban) ban = db.fetch(`sabıka-ban_${interaction.guild.id}_${interaction.user.id}`).join(`\n`)
   if (!ban) ban = "Herhangi Bir Ban Sabıkan Bulunmamakta"
   
   var jail = db.fetch(`sabıka-jail_${interaction.guild.id}_${interaction.user.id}`)
       if (jail) jail = db.fetch(`sabıka-jail_${interaction.guild.id}_${interaction.user.id}`).join(`\n`)
  if (!jail) jail = "Herhangi Bir Jail Sabıkan Bulunmamakta"
    
  interaction.reply({content: `
  
**${interaction.user.username}**(\`${interaction.user.id}\`) Sabıka Kaydın
  
> ***__Mute Kayıtları__***
${mute}

> ***__Jail Kayıtları__***
${jail}

> ***__Ban Kayıtları__***
${ban}
  
  `, ephemeral:true})
 }

 if(interaction.customId == "anlık") {
    var toplamuye = interaction.guild.members.cache.size
    var online = interaction.guild.members.cache.filter(a => a.presence?.status == "online").size + interaction.guild.members.cache.filter(a => a.presence?.status == "idle").size + interaction.guild.members.cache.filter(a => a.presence?.status == "dnd").size
  var bot = interaction.guild.members.cache.filter(a => a.user.bot == true).size 
  var sesli = interaction.guild.members.cache.filter(x => x.voice.channel).size
  var seslibot = interaction.guild.members.cache.filter(x => x.voice.channel).filter(a => a.user.bot == true).size
  var taglı = interaction.guild.members.cache.filter(a => a.user.username.includes("Lee") || a.user.username.includes("lee") || a.user.username.includes("ˊ") || a.user.discriminator == "#0744").size
  let boost = interaction.guild.premiumSubscriptionCount;
  if(interaction.guild.premiumTier == "NONE") seviye = `0. Seviye`
  if(interaction.guild.premiumTier == "TIER_1") seviye = `1. Seviye`
  if(interaction.guild.premiumTier == "TIER_2") seviye = `2. Seviye`
  if(interaction.guild.premiumTier == "TIER_3") seviye = `3. Seviye`
 
  interaction.reply({content: `
Sunucumuzda anlık **${toplamuye}** üye bulunmakta (**${online}** Aktif)
Sunucumuzda anlık **${sesli}** üye seste bulunmakta (**${seslibot}** Bot)
Sunucumuza **${boost}** adet boost basılmış (**${seviye}**)
 `, ephemeral: true}) 
}


 if(interaction.customId == "yetkili") {
    var yetkili = interaction.guild.members.cache.filter(a => a.roles.cache.has(registerhammer)).size
    var tamyt = interaction.guild.members.cache.filter(a => a.permissions.has("ADMINISTRATOR")).size
    var foundertop = interaction.guild.members.cache.filter(a => a.roles.cache.has(founder)).size
    var ownertop = interaction.guild.members.cache.filter(a => a.roles.cache.has(owner)).size
    var ceotop =interaction.guild.members.cache.filter(a => a.roles.cache.has(ceo)).size

    interaction.reply({content: `
**${tamyt}** Adet Full Yetki Sahibi
**${foundertop}** Adet **EverGarden**
**${ownertop}** Adet __Owner__
**${ceotop}** Adet Admin
Ve toplam **${yetkili}** Kişilik Yetkili Ekibi
    `, ephemeral: true})
 }
 
 if(interaction.customId == "roller") {
     var roller = kisi.roles.cache.map(a => a).join("\n> ")
     if(roller.length >= 3500) roller = `Rolleriniz Çok Fazla !`
     interaction.reply({content: `
> Sahip Olduğun Rollerin Listesi:

> ${roller}`, ephemeral: true})
 }



  })
}