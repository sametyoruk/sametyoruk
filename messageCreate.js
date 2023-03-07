const { prefix } = require("../ayarlar.json")
const db = require("quick.db");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { sahip } = require("../ayarlar.json")
module.exports = client => {

    client.on("messageCreate", message => {
        
        if(message.content.startsWith(prefix) === false) return;

const args = message.content.slice(prefix.length).trim().split(/ +/)
var commandName = args.shift().toLowerCase()
if(!commandName) return;
if (client.commands.has(commandName)) {
    cmd = client.commands.get(commandName);

  } else{

  if (client.aliases.has(commandName)) {
    cmd = client.commands.get(client.aliases.get(commandName));
  }
  if (!client.aliases.has(commandName)) return;
  }
if(!cmd) return;

try{
cmd.execute(message, client, args)
} catch(e){
    console.log(e)
    const embed = new MessageEmbed()
    .setColor("GREEN")
    .setAuthor({ name: `HATA`, iconURL: client.user.displayAvatarURL({dynamic: true}), url: ''})
              .setTimestamp()
              .setFooter({ text: `Kullanan: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})}) 
            .setDescription(`
:x: \`${cmd.name}\` Adlı Komut Kısa Süreliğine Bakımda ! Anlayışınız için Teşekkür Ederiz !`)
         
      return message.channel.send({embeds: [embed]}).then(a => setTimeout(function() {a.delete()}, 5000))  

}
    })}
