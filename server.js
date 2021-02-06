const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { prefix } = require('./config.json');
const TOKEN = "";
const fs = require('fs');
const ms = require('ms');
const client = new Discord.Client({disableEveryone: false});
const config = require("./config.json");
const db = require("quick.db")
client.aliases = new Discord.Collection();
client.helps = new Discord.Collection();
client.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.name, props); 
    });
});

client.on('ready', function() {
      setInterval(async () => {
    const statuslist = [
      `prea smk pt tn kid`,
    ];
    const random = Math.floor(Math.random() * statuslist.length);

    try {
      await client.user.setPresence({
        game: {
          name: `${statuslist[random]}`,
          type: "STREAMING"
          //url: 'https://www.twitch.tv/spokloo'
        },
        status: "streaming"
      });
    } catch (error) {
      console.error(error);
    }
  }, 10000);
});

  //Anti invite links
client.on('message', async message => { //whenever a message is sent
  if(message.author.id === client.user.id) return;
      if(message.channel.type === "dm") return; 
    if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { 
        if(message.member.hasPermission("ADMINISTRATOR")) return;
      message.delete() //delete the message
        .then(message.channel.send(' **SYSTEM**: Publicity are not allowed to this server !'))
    }
    if (message.content.includes('invite.gg/')) {
        if (message.member.hasPermission("ADMINISTRATOR")) return;
        message.delete()
      .then(message.channel.send('**SYSTEM**: Publicity are not allowed to this server !'))
    }
  })
  //Anti link done

client.on('message', async message => {
  if(message.content === 'absen')  require('./commands/absen.js')(message, args)
	if (message.author.bot) return undefined;
  if (message.channel.type === "dm") return; 
	let prefix = config.prefix;
	if (!message.content.startsWith(prefix)) return undefined;
 let messageArray = message.content.split(" ");
  let msg = message.content.toLowerCase();
	let command = message.content.toLowerCase().split(' ')[0];
  command = command.slice(prefix.length);
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = `${args.shift().toLowerCase()}`;
	
  	/*try {
    if (command == 'h') command == 'help';
    
		let commandFile = require(`./commands/${cmd}.js`);
		commandFile.run(client, message, args);
	} catch (e) {
		console.log(e.message)
	} finally {
		console.log(`${message.author.username} using command ${cmd}`);
	}*/
    try {
  if (command == 'h') command = 'help';
    let commands = require(`./commands/${cmd}.js`);
    commands.run (client, message, args);
  } catch (e) {
    console.log(e.stack)
  } finally {
    console.log(`${message.author.tag} foloseste comanda \`${cmd}.js\``)
  }
    
  let commands = require(`./commands/${cmd}.js`);
 
});


//^^ INI UNTUK COMMAND HANDLER
const express = require('express');
const http = require('http');
const app = express();

// 5 Minute Ping Times
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on("guildMemberAdd", member =>{
    const embed = {
        "title": "__**UN NOU MEMBRU A INTRAT**__",
        "description": `<:669566865667784734:703248876949471333> \`-\` ${member.user} A intrat pe __***${member.guild}***__.\n<:701542449448878140:703213072084500542> \`-\` Daca vrei poti sa iti pui tagul nostru ****.`,
        "color": 363940,

        "author" : {
            "name" : `${member.user.username}`,
            "icon_url" : `${member.user.avatarURL}`
        },
        "thumbnail" : {
            "url" : `${member.user.avatarURL}`
        },
        "footer" : {
            "text" : `${member.guild.name}`
        },
        "timestamp" : new Date(),
        };

    var channel = member.guild.channels.get("702781064313176064");
    channel.send({embed});
      
});

client.login('ODA3NzA3MjUxMDg2ODUyMTM3.YB75_w.9EpuzWmddb34k0yAYmO6uq_agtI');