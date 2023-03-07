const Discord = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const fs = require("fs");
const db = require("quick.db")
const {Client, MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")
const { Intents, Collection } = Discord;
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_BANS
],
    allowedMentions: { repliedUser: false}
  });
    const {prefix,bir,muteli,hapis,ranklog,guardop,token,rollog,hgbblog,seslog,mesajlog,partnerlog,bott,kayıtsız,kanal,rules} = require("./ayarlar.json")
const express = require("express")
const moment = require("moment")
require("moment-duration-format")

const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})

client.commands = new Collection()
const { readdir } = require("fs");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

readdir("./commands/", (err, files) => {
  if (err) console.error(err)
  files.forEach(f => {
    readdir("./commands/" + f, (err2, files2) => {
      if (err2) console.log(err2)
      files2.forEach(file => {
        let prop = require(`./commands/${f}/` + file);
        console.log(`[Lee Managers] ${prop.name} yüklendi!`);
        commands.set(prop.name, prop);
        prop.aliases.forEach(alias => {
          aliases.set(alias, prop.name);
        });
      });
    });
  });
});

//event hand
var event = fs.readdirSync("./events")

client.once("ready", () => {

	var channel = client.channels.cache.get("1066773423587606659")
  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
})

console.log("Bot Aktif")
client.user.setActivity('EverGarden Chatini', { type: 'WATCHING' });
client.user.setPresence({status: "online"});

event.forEach(event => {
    const eventFunc = require(`./events/${event}`)
    eventFunc(client)
})
})


// client.on("guildMemberAdd", async member => {
//   if(member.user.bot) {
// member.roles.add(bott)
// member.setNickname("RakıBalık Assistant []")
//   }
//   if(!member.user.bot) {
      
//     var kisi = client.users.cache.get(member.id)
//       var a = moment(kisi.createdAt.getTime()).format("DD/MM/YYYY HH:mm")

//       const kuruluss = new Date().getTime() - kisi.createdAt.getTime();  
//       const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 

//       member.roles.add(kayıtsız)
// member.setNickname(`İsim Yaş`)
//       client.channels.cache.get(kanal).send({content: `

// ${member} **${member.guild.name}**'e Hoş geldin sefa getirdin. Seninle birlikte \`${member.guild.members.cache.size}\` kişi olduk :tada:

// Hesabın **${a}** tarihinde kurulmuş ! (**${gecen}** önce)

// Sunucu içi kurallarımız <#${rules}> kanalında yer almaktadır. Ceza-i işlem uygulanacağı zaman herkes okumuş varsayılır !

// Sol tarafta bulunan sesli odalara (**V.Confirmed**) geçip kayıt işlemini gerçekleştirebilirsin !

//       `})
//   }
// })
client.on("guildMemberAdd", async member => {
     var kisi = client.users.cache.get(member.id)
      var a = moment(kisi.createdAt.getTime()).format("DD/MM/YYYY HH:mm")

      const kuruluss = new Date().getTime() - kisi.createdAt.getTime();  
      const gecen = moment.duration(kuruluss).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
      var sayii = client.guilds.cache.get(member.guild.id).memberCount
  client.channels.cache.get(kanal).send({content: `

  ${member}, **${member.guild.name}**'e Hoş geldin sefa getirdin. Seninle birlikte **${sayii}** kişi olduk :tada:
  
  :timer: | Hesabın **${a}** tarihinde kurulmuş ! (**${gecen}** önce)
  
  <a:805524188063989790:1051876857097756842> | Sunucu içi kurallarımız <#${rules}> kanalında yer almaktadır. Ceza-i işlem uygulanacağı zaman herkes okumuş varsayılır !
  
  <a:tatl:1051879008171737178> | Sol tarafta bulunan sesli odalara (**Ses Teyit**) geçip kayıt işlemini gerçekleştirebilirsin ! (<@&${bir}>)
        `})
  member.roles.add(kayıtsız)
})

/*

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("channelDelete", async channel => {
    
 var log = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_DELETE',
	})
var logg = log.entries.first()
var {executor, target} = logg
if (kisi.roles.cache.has(guardop)) return;
if(kisi.id == kisi.guild.ownerId) return;
if (executor.id == client.user.id) return;
   client.channels.cache.get("938819588857143441").send(`<@${executor.id}> Adlı Yetkili **${channel.name}**(\`${channel.id}\`) Adlı Kanalı Silmeye Çalıştı Kanal Tekrar Oluşturuldu ve Kullanıcı Jaile Atıldı !`)

   client.users.cache.get(channel.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili **${channel.name}** İsimli Kanalı Silmeye Çalıştı Kanal Oluşturulup Kullanıcı Jaile Atıldı !`)
 var kisi = channel.guild.members.cache.get(executor.id)
   var roller = kisi.roles.cache.map(a => a.id)
 var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
  kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )

 setTimeout(function() {
  channel.guild.members.cache.get(executor.id).roles.add(hapis)
 }, 3000)


  channel.guild.channels.create(channel.name, {
  type: channel.type,
  parent: channel.parent.id,

 })

})




client.on("channelCreate", async channel => {
    if(!channel.guild) return;
 var log = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: 'CHANNEL_CREATE',
  })
var logg = log.entries.first()
var {executor, target} = logg
var kisi = role.guild.members.cache.get(executor.id)
if (kisi.roles.cache.has(guardop)) return;
if(kisi.id == kisi.guild.ownerId) return;
  if (executor.id == client.user.id) return;
  client.channels.cache.get("938819588857143441").send(`<@${executor.id}> Adlı Yetkili **${channel.name}**(\`${channel.id}\`) Adlı Kanalı Oluşturmaya Çalıştı Kanal Silindi ve Kullanıcı Jaile Atıldı !`)
client.users.cache.get(channel.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili **${channel.name}** İsimli Kanalı Oluşturmaya Çalıştı Kanal Silindi ve Kullanıcı Jaile Atıldı !`)

var roller = kisi.roles.cache.map(a => a.id)
var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )

setTimeout(function() {
channel.guild.members.cache.get(executor.id).roles.add(hapis)
}, 3000)
channel.delete();
})

client.on("roleDelete", async role => {
 var log = await role.guild.fetchAuditLogs({
    limit: 1,
    type: 'ROLE_DELETE',
  })
var logg = log.entries.first()
var {executor, target} = logg
var kisi = role.guild.members.cache.get(executor.id)
if (kisi.roles.cache.has(guardop)) return;
if(kisi.id == kisi.guild.ownerId) return;
if (executor.id == client.user.id) return;
  client.channels.cache.get("938819588857143441").send(`<@${executor.id}> Adlı Yetkili **${role.name}**(\`${role.id}\`) Adlı Rolü Silmeye Çalıştı Rol Tekrar Oluşturuldu ve Kullanıcı Jaile Atıldı !`)
client.users.cache.get(role.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili **${role.name}** İsimli Rolü Silmeye Çalıştı Rol Oluşturulup Kullanıcı Jaile Atıldı !`)


var roller = kisi.roles.cache.map(a => a.id)
var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )

setTimeout(function() {
role.guild.members.cache.get(executor.id).roles.add(hapis)
}, 3000)

  role.guild.roles.create({

    name: role.name,
  color: role.color,
      position: role.rawPosition,
      permissions: role.permissions,
    reason: "",
    })

 })


client.on("roleCreate", async role => {
 var log = await role.guild.fetchAuditLogs({
    limit: 1,
    type: 'ROLE_CREATE',
  })
var logg = log.entries.first()
var {executor, target} = logg
var kisi = role.guild.members.cache.get(executor.id)
if (kisi.roles.cache.has(guardop)) return;
if(kisi.id == kisi.guild.ownerId) return;
if (executor.id == client.user.id) return;
  client.channels.cache.get("938819588857143441").send(`<@${executor.id}> Adlı Yetkili **${role.name}**(\`${role.id}\`) Adlı Rolü Oluşturmaya Çalıştı Rol Silindi ve Kullanıcı Jaile Atıldı !`)
client.users.cache.get(role.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili **${role.name}** İsimli Rolü Oluşturmaya Çalıştı Rol Silinip Kullanıcı Jaile Atıldı !`)

var roller = kisi.roles.cache.map(a => a.id)
var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )

setTimeout(function() {
role.guild.members.cache.get(executor.id).roles.add(hapis)
}, 3000)
  role.delete()
 })


client.on("guildMemberAdd", async member => {
  if(!member.user.bot) return
  var log = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'BOT_ADD',
  })
var logg = log.entries.first()
var {executor, target} = logg
var kisi = member.guild.members.cache.get(executor.id)
if (kisi.roles.cache.has(guardop)) return;
if(kisi.id == kisi.guild.ownerId) return;
  var bott = member.guild.members.cache.get(target.id)
  
  client.channels.cache.get("938819588857143441").send(`<@${executor.id}> Adlı Yetkili **${target.username}**(\`${target.id}\`) Adlı Botu Eklemeye Çalıştı Bot Banlandı ve Kullanıcı Jaile Atıldı !`)
client.users.cache.get(member.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili **${target.username}**(\`${target.id}\`) İsimli Botu Eklemeye Çalıştı Bot Banlandı ve Kullanıcı Jaile Atıldı !`)
member.guild.members.cache.get(executor.id).roles.set([hapis])
bott.ban({reason: "İzinsiz Eklendi !"})
})

client.on("messageCreate", message => {
	if(message.channel.id == "938819592053215248") return;
  if(message.content == "discord.gg/cerly" || message.content == ".gg/cerly" || message.content == "https://discord.gg/cerly") return;
  
  const aa = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
            if (aa.some(word => message.content.toLowerCase().includes(word))) {
  if(!message.member.permissions.has('ADMINISTRATOR')){
  message.delete();
  message.channel.send(`${message.author} REKLAM ???`).then(a => setTimeout(function() {a.delete()}, 3000))
 
}
  }
  })

////////////////////////////////////////////////////////////////////////////////////77

  client.on('messageUpdate', (oldMessage, newMessage) => {
	  if(newMessage.channel.id == "938819592053215248") return;
    const aa = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
    if (aa.some(word => newMessage.content.toLowerCase().includes(word))) {
      if(!newMessage.member.permissions.has('ADMINISTRATOR')){
        newMessage.delete();
        newMessage.channel.send(`${newMessage.author} REKLAM ???`).then(a => setTimeout(function() {a.delete()}, 3000))
        }
        }
  })

  client.on("guildMemberRemove", async(member) => {
    var log = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBERS_BAN_ADD',
      })
      
var logg = log.entries.first()
var {executor, target} = logg
var kisi = member.guild.members.cache.get(executor.id)


if(target.id == member.id) {

client.channels.cache.get("938819588857143441").send(`**<@${executor.id}>** Adlı Yetkili <@${member.id}> (\`${member.id}\`) Adlı Kullanıcıyı Sunucudan Banladı !`)
if (kisi.roles.cache.has(guardop)) return;
if(kisi.id == member.guild.ownerId) return;
db.add(`ban-sayi_${member.id}`, +1)
var bansayısı = db.fetch(`ban-sayi_${member.id}`)

if(bansayısı >= 2) {
    var roller = kisi.roles.cache.map(a => a.id)
    var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
    kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )
    
    setTimeout(function() {
    member.guild.members.cache.get(executor.id).roles.add(hapis)
    }, 3000)

    client.channels.cache.get("938819588857143441").send(`**<@${kisi.id}>** Adlı Yetkili Ban Korumasını Aştı ve Jaile Atıldı !`)
client.users.cache.get(member.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili **Ban Korumasını** İhlal Etti ve Kullanıcı Jaile Atıldı !`)
}
setTimeout(function() {
    db.add(`ban-sayi_${member.id}`, -1)
}, 1000 * 60 * 15)
}
  })
///////////////////////////////////////////////////////
client.on("guildMemberUpdate", async(oldMember, newMember) => {
  
  var log = await newMember.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_ROLE_UPDATE',
  })
var logg = log.entries.first()
var {executor, target} = logg
var yetkilikisi = newMember.guild.members.cache.get(executor.id)
if(client.user.id == yetkilikisi.id) return;
  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      oldMember.roles.cache.forEach(role => {
          if (!newMember.roles.cache.has(role.id)) { //alındı
            var kisi = newMember.guild.members.cache.get(newMember.id)
            if(yetkilikisi.roles.cache.has(guardop) || yetkilikisi.author.id == newMember.guild.ownerId) {
              client.channels.cache.get(rollog).send(`**<@${yetkilikisi.id}>** Adlı Yetkili <@${newMember.id}> (\`${newMember.id}\`) Adlı Kullanıcıdan **${role.name}** (\`${role.id}\`) İsimli Rolü Aldı !`)

            } else {

              client.channels.cache.get(rollog).send(`**!! <@${yetkilikisi.id}>** Adlı Yetkili <@${newMember.id}> (\`${newMember.id}\`) Adlı Kullanıcıdan **${role.name}** (\`${role.id}\`) İsimli Rolü Almaya Çalıştı Rol Geri Verildi ve Kişi Jaile Atıldı !`)
              client.users.cache.get(newMember.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili <@${newMember.id}> (\`${newMember.id}\`) Adlı Kullanıcıdan **${role.name}** (\`${role.id}\`) İsimli Rol Almaya Çalıştı Rol Geri Verildi ve Kişi Jaile Atıldı !`)


            kisi.roles.add(role.id)
            var roller = yetkilikisi.roles.cache.map(a => a.id)
    var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
    yetkilikisi.roles.cache.forEach(a =>  yetkilikisi.roles.remove(a) )
    
    setTimeout(function() {
    newMember.guild.members.cache.get(executor.id).roles.add(hapis)
    }, 3000)
            }
        }
      });

  } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      newMember.roles.cache.forEach(role => {
          if (!oldMember.roles.cache.has(role.id)) { //verildi
            var kisi = newMember.guild.members.cache.get(newMember.id)
            if(yetkilikisi.roles.cache.has(guardop) || yetkilikisi.author.id == newMember.guild.ownerId) {
              client.channels.cache.get(rollog).send(`**<@${yetkilikisi.id}>** Adlı Yetkili <@${newMember.id}> (\`${newMember.id}\`) Adlı Kullanıcıya **${role.name}** (\`${role.id}\`) İsimli Rolü Verdi !`)

            } else {

              client.channels.cache.get(rollog).send(`**!! <@${yetkilikisi.id}>** Adlı Yetkili <@${newMember.id}> (\`${newMember.id}\`) Adlı Kullanıcıya **${role.name}** (\`${role.id}\`) İsimli Rolü Vermeye Çalıştı Rol Geri Alındı ve Kişi Jaile Atıldı !`)
              client.users.cache.get(newMember.guild.ownerId).send(`<:cerly_ok:941587690749583430> **${executor.username}**(\`${executor.id}\`) Adlı Yetkili <@${newMember.id}> (\`${newMember.id}\`) Adlı Kullanıcıya **${role.name}** (\`${role.id}\`) İsimli Rolü Vermeye Çalıştı Rol Geri Alındı ve Kişi Jaile Atıldı !`)


            kisi.roles.remove(role.id)
            var roller = yetkilikisi.roles.cache.map(a => a.id)
    var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
    yetkilikisi.roles.cache.forEach(a =>  yetkilikisi.roles.remove(a) )
    
    setTimeout(function() {
    newMember.guild.members.cache.get(executor.id).roles.add(hapis)
    }, 3000)
            }
          }
      });
  }
});

client.on("guildMemberAdd", async(member) => {
  if(member.user.bot) return;

  var taglar = db.fetch(`yasaklı-tag_${member.guild.id}`)
  if(!taglar) return;
  if (taglar.some(word => member.user.username.toLowerCase().includes(word))) {
  var kisi = member.guild.members.cache.get(member.id)
setTimeout(function() {
var roller = kisi.roles.cache.map(a => a.id)
var rolller = roller.filter(a => a.id !== "939928317543473163" & a.id !== "941787773613002812")
kisi.roles.cache.forEach(a =>  kisi.roles.remove(a) )
}, 3000)

setTimeout(function() {
  member.guild.members.cache.get(member.id).setNickname("YASAKLI TAG")
member.guild.members.cache.get(member.id).roles.add(yasaklıtag)
}, 6000)

}})

/////////////////////////////////////////////////
//PARTNER LOG//
client.on("messageCreate", async(message) => {
  if(!message.member.roles.cache.has(bir) || message.member.bot) return;
  if(message.channel.id !== "938819592053215248") return;
  if(!message.content.includes("discord.gg")  & !message.content.includes("@everyone") & !message.content.includes("@here") & !message.content.includes(".gg")) return;

  db.add(`partner-sayi_${message.author.id}`, +1)
var partnersayi = db.fetch(`partner-sayi_${message.author.id}`)
  client.channels.cache.get(partnerlog).send(`${message.author} Adlı Yetkili Partner Yaptı Güncel Partner Sayısı **${partnersayi}** Olarak Güncellendi !`)

})

////////////////////////////////////////
client.on("guildMemberAdd", async(member) => {
  if(!member.user.bot) {
    client.channels.cache.get(hgbblog).send(`${member} Adlı Kullanıcı Sunucumuza Katıldı ! Güncel Üye Sayımız: **${member.guild.members.cache.size}**`)
  } 
  if(member.user.bot) {
   client.channels.cache.get(hgbblog).send(`${member} Adlı Bot Sunucumuza Eklendi ! Güncel Bot Sayımız: **${member.guild.members.cache.filter(a => a.user.bot).size}**`)
  }
})

client.on("guildMemberRemove", async(member) => {
  if(!member.user.bot) {
    client.channels.cache.get(hgbblog).send(`${member} Adlı Kullanıcı Sunucumuzdan Ayrıldı ! Güncel Üye Sayımız: **${member.guild.members.cache.size}**`)
  } 
  if(member.user.bot) {
   client.channels.cache.get(hgbblog).send(`${member} Adlı Bot Sunucumuzdan Atıldı ! Güncel Bot Sayımız: **${member.guild.members.cache.filter(a => a.user.bot).size}**`)
  }
})
////////////////////////////////////////////////7777
client.on("voiceStateUpdate", async(newState, oldState) => {
  if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
 var kisi = oldState.member || newState.member
  if (oldState.channelId && !newState.channelId) {
    client.channels.cache.get(seslog).send(`${kisi} Adlı Kullanıcı <#${oldState.channelId}> İsimli Kanala Bağlandı !`)
  
  } else  if (!oldState.channelId && newState.channelId) {
    client.channels.cache.get(seslog).send(`${kisi} Adlı Kullanıcı <#${newState.channelId}> İsimli Kanaldan Ayrıldı !`)
  

} else if (oldState.channelId && newState.channelId) {
  client.channels.cache.get(seslog).send(`${kisi} Adlı Kullanıcı <#${newState.channelId}> İsimli Kanaldan <#${oldState.channelId}> İsimli Kanala Geçti !`)
  
     }
  })

////////////////////////////////////////////////////////
  client.on("messageDelete", async(message) => {
	 if(message.author.bot) return;
        if (!message.guild) return;
      const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
      });
      const deletionLog = fetchedLogs.entries.first();
      const { executor, target } = deletionLog;
      const embed = new MessageEmbed()
      .setColor("BLACK")
      .setDescription(`
${message.author} Adlı Kullanıcı ${message.channel} İsimli Kanalda Mesaj Sildi !

**Mesaj İçeriği:**
\`\`\`${message.content}\`\`\`
`)
      client.channels.cache.get(mesajlog).send({embeds: [embed]})
	  })

client.on('messageUpdate', (oldMessage, newMessage,message) => {
	if(oldMessage.author.bot) return;
	
  const embed = new MessageEmbed()
  .setColor("BLACK")
  .setDescription(`${oldMessage.author} Adlı Kullanıcı ${oldMessage.channel} İsimli Kanalda Mesaj Düzenledi !
 
  **Eski**
  \`\`\`${oldMessage}\`\`\`
  **Yeni**
  \`\`\`${newMessage}\`\`\`
  
  `)
  client.channels.cache.get(mesajlog).send({embeds: [embed]})
	})
*/
client.login(token);
