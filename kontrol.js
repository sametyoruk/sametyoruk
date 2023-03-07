const { prefix, muteli,hapis} = require("../ayarlar.json")
const db = require("quick.db");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { sahip } = require("../ayarlar.json")
module.exports = client => {

client.on("guildMemberAdd", async member => {
  
    setTimeout(function() {
      var mute = db.fetch(`mute_${member.guild.id}_${member.id}`)
     if(mute == "okey") {
              member.roles.add(muteli)
            }
      var jail = db.fetch(`jail_${member.guild.id}_${member.id}`)
        if (jail == "okey") {
         member.roles.set([])
         member.roles.add(hapis)
       }
      
    }, 5500)
    
  })
}