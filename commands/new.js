const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('wio.db');
const moment = require('moment');
const config = require("../config.json")

exports.run = (client, message, args) => {
try {
let user = message.author
let splitted = args.join(" ").split(" - ")
let linkname = splitted[0]
let link = splitted[1]
let log_channel_id = config.log_channel_id
if(!linkname) return message.channel.send(`Specify a Name! \`new-monitor name - url\``)
if(!link) return message.channel.send(`Specify a URL! \`new-monitor name - url\``)

let sınır = db.fetch(`user.${user.id}.sinir`) || 0
        if (sınır < 10) {
if (db.fetch("linkler").map(z => z.url).includes(link)) {
                return message.channel.send(`Monitor could not be added due to an error. Try Again or Get in Touch.`)
 } else {
                db.add(`pointID`, 1)
                let pointID = db.fetch(`pointID`)
                db.set(`links.${pointID}`, link)
                db.push("linkler", {
                    name: linkname,
                    url: link,
                    image: "https://i.ibb.co/HBJRCCq/quiestion-gray.png",
                    owner: user.id,
                    pointID: pointID
                });
                const embed = new Discord.MessageEmbed()
                    .setTitle("Monitor Added")
                    .setColor("GREEN")
                    .setThumbnail("https://i.ibb.co/HBJRCCq/quiestion-gray.png")
                    .addField("User", `${user.username} (${db.fetch("linkler").filter(x => x.owner === user.id).length}/10) (Discord-${message.author.id})`)
                    .addField("Name", linkname + " (" + pointID + ")")
                    .addField("URL", link)
                client.channels.cache.get(log_channel_id).send(embed)
                db.add(`user.${user.id}.sinir`, 1)

message.channel.send(`Monitor Created! (https://www.apptime.tech/monitors/view/${pointID})`)
}
        }else{
  return message.channel.send(`Monitor could not be added due to an error. Try Again or Get In Touch.`)
}
  } catch (e) {
    console.log(e)
  }
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'new-monitor'
};
