const {Client, Attachment} = require('discord.js');
const client = new Client();
const fs = require("fs");
const request = require('request');
const Discord = require('discord.js');


client.on('warn', console.warn);

client.on('error', console.error);

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const activities_list = [
		"play.frostalia.fr",
		"Frostalia"
	];
	setInterval(() => {
		const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
		client.user.setPresence(
		{
			status: "idle",
			game: { name: activities_list[index] }
		});//.then(console.log);
	}, 10000);

});

function Random(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on('guildMemberAdd', member => {

    let verificationRole = member.guild.roles.get("624394912741326870");
    member.addRole(verificationRole);
});

client.on("message", message => {
	

	let prefix = ":";
	if (!message.content.startsWith(prefix)) return false; // Don't look the message without the prefix
	let messageLower = message.content.toLowerCase(); // Lower the string
	let messageNoPrefix = messageLower.replace(prefix, ""); // Remove prefix in check
	let messageArray = messageNoPrefix.split(" "); // Create Argument Array
	let cmd = messageArray[0]; 
	let args = messageArray.slice(1);
	
    let logsChannel = message.guild.channels.get("624356240205545482");
    let verificationChannel = message.guild.channels.get("624394913341112390");
    let verificationRole = message.guild.roles.get("624394912741326870");

	if (message.channel instanceof Discord.DMChannel) return false; // Block private message
	switch (cmd)
	{
        case "verify":
            if(message.channel.id != "624394913341112390") return false;
            const image_1 = new Attachment("./img/burger2.png");
            const image_2 = new Attachment("./img/cheval4.png");
            const image_3 = new Attachment("./img/clavier1.png");
            const image_4 = new Attachment("./img/girafe3.png");
            const randomImage = Random(1, 4)

            const react = { "_1": "624442474164650025", "_2": "624442474106191884", "_3": "624442474043277352", "_4": "624442474391404564"}

            const messageCaptcha = "Après avoir réagis le bon numéro le serveur te sera accessible sinon en cas de fail tu seras expulsé du serveur.\nVous avez 10 minutes avant expiration."
            
            const messageFail = "❌ 》 Vous avez été kick pour avoir raté le captcha de sécurité.";
            const messageFailLogs = `${message.author} s'est raté dans le Captcha et a été kick.`;
            const messageExpire = "❌ 》 Le Captcha a expiré veuillez refaire la commande dans le salon.";

            const messagePassLogs = `${message.author} a réussi le Captcha.`;


            function kickMember()
            {
                logsChannel.send(messageFailLogs);
                message.author.send(messageFail).then(msg => {message.guild.members.get(message.author.id).kick("Fail Captcha");});

            }

            function roleMember()
            {
                logsChannel.send(messagePassLogs)
                message.guild.members.get(message.author.id).removeRole(verificationRole).catch(() => {message.channel.reply("❌ 》 Votre rôle a déjà été enlevé.").then(msg => {msg.delete(15000);})});
            }

            const Filter1 = (reaction, user) => reaction.emoji.id === react._1 && user.id === message.author.id;
            const Filter2 = (reaction, user) => reaction.emoji.id === react._2 && user.id === message.author.id;
            const Filter3 = (reaction, user) => reaction.emoji.id === react._3 && user.id === message.author.id;
            const Filter4 = (reaction, user) => reaction.emoji.id === react._4 && user.id === message.author.id;

            function CollectReaction(msg, Filter) {return msg.createReactionCollector(Filter, {timer: 10000});}

            switch (randomImage)
            {
                case 1:
                        message.author.send(messageCaptcha, image_1).then(msg => {message.delete(); 
                        msg.react(react._1); msg.react(react._2); msg.react(react._3); msg.react(react._4);

                        CollectReaction(msg, Filter1).on('collect', r => kickMember());
                        CollectReaction(msg, Filter2).on('collect', r => roleMember());
                        CollectReaction(msg, Filter3).on('collect', r => kickMember());
                        CollectReaction(msg, Filter4).on('collect', r => kickMember());

                        }).catch(() => {
                        message.reply("⛔ 》 Il semblerait que vous bloquez les messages privés.").then(msg => {msg.delete(15000);});
                    });
                    break;
                case 2:
                    message.author.send(messageCaptcha, image_2).then(msg => {message.delete(); 
                        msg.react(react._1); msg.react(react._2); msg.react(react._3); msg.react(react._4);

                        CollectReaction(msg, Filter1).on('collect', r => kickMember());
                        CollectReaction(msg, Filter2).on('collect', r => kickMember());
                        CollectReaction(msg, Filter3).on('collect', r => kickMember());
                        CollectReaction(msg, Filter4).on('collect', r => roleMember());

                    }).catch(() => {
                        message.reply("⛔ 》 Il semblerait que vous bloquez les messages privés.").then(msg => {msg.delete(15000);});
                    });
                    break;
                case 3:
                    message.author.send(messageCaptcha, image_3).then(msg => {message.delete(); 
                        msg.react(react._1); msg.react(react._2); msg.react(react._3); msg.react(react._4);

                        CollectReaction(msg, Filter1).on('collect', r => roleMember());
                        CollectReaction(msg, Filter2).on('collect', r => kickMember());
                        CollectReaction(msg, Filter3).on('collect', r => kickMember());
                        CollectReaction(msg, Filter4).on('collect', r => kickMember());

                    }).catch(() => {
                        message.reply("⛔ 》 Il semblerait que vous bloquez les messages privés.").then(msg => {msg.delete(15000);});
                    });
                    break;
                case 4:
                    message.author.send(messageCaptcha, image_4).then(msg => {message.delete(); 
                        msg.react(react._1); msg.react(react._2); msg.react(react._3); msg.react(react._4);

                        CollectReaction(msg, Filter1).on('collect', r => kickMember());
                        CollectReaction(msg, Filter2).on('collect', r => kickMember());
                        CollectReaction(msg, Filter3).on('collect', r => roleMember());
                        CollectReaction(msg, Filter4).on('collect', r => kickMember());

                    }).catch(() => {
                        message.reply("⛔ 》 Il semblerait que vous bloquez les messages privés.").then(msg => {msg.delete(15000);});
                    });
                    break;
            }
            break;

		case "kick":
		
			let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
			if(!kickUser) return message.channel.send("❌ 》 Utilisateur introuvable.").then(msg => {msg.delete(10000); message.delete()});

            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ 》 Vous ne pouvez pas faire ça.").then(msg => {msg.delete(10000); message.delete()});
            if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ 》 Cette personne ne peux être expulser.").then(msg => {msg.delete(10000); message.delete()});
			
            let kickRaison = args.join(" ").slice(20);
            
            logsChannel.send({
                                "embed": {
                                    "title": "Expulsion",
                                    "color": 13632027,
                                    "timestamp": "2019-09-19T23:35:51.900Z", 
                                    "footer": {
                                        "text": "Hopeless ♡"
                                    },
                                    "fields": [
                                        {
                                            "name": "De",
                                            "value": `${kickUser}\n${kickUser.id}`,
                                            "inline": true
                                        },
                                        {
                                            "name": "Par",
                                            "value": `<@${message.author.id}>\n${message.author.id}`,
                                            "inline": true
                                        },
                                        {
                                            "name": "Dans",
                                            "value": `${message.channel}`,
                                            "inline": true
                                        },
                                        {
                                            "name": "Pour",
                                            "value": `${kickRaison}`,
                                            "inline": true
                                        }
                                    ]
                                }
            });

            message.channel.send({ 
            "embed": 
            {
                "title": "Expulsion",
                "color": 13632027,
                "timestamp": message.createdAt,
                "footer": {
                    "text": "Hopeless ♡"
                },
                "fields": [
                {
                  "name": "De",
                  "value": `${kickUser}`,
                  "inline": true
                },
                {
                  "name": "Pour",
                  "value": `${kickRaison}`,
                  "inline": true
                }
              ]
            }}).then(message.delete());
            
            message.guild.member(kickUser).kick(Raison);

            break;
            
        case "ban":
        
            let banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!banUser) return message.channel.send("❌ 》 Utilisateur introuvable.").then(msg => {msg.delete(10000); message.delete()});

            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ 》 Vous ne pouvez pas faire ça.").then(msg => {msg.delete(10000); message.delete()});
            if(banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ 》 Cette personne ne peux être expulser.").then(msg => {msg.delete(10000); message.delete()});
            
            let banRaison = args.join(" ").slice(20);
            
            logsChannel.send({
                                "embed": {
                                    "title": "Bannissement",
                                    "color": 13632027,
                                    "timestamp": "2019-09-19T23:35:51.900Z", 
                                    "footer": {
                                        "text": "Hopeless ♡"
                                    },
                                    "fields": [
                                        {
                                            "name": "De",
                                            "value": `${banUser}\n${banUser.id}`,
                                            "inline": true
                                        },
                                        {
                                            "name": "Par",
                                            "value": `<@${message.author.id}>\n${message.author.id}`,
                                            "inline": true
                                        },
                                        {
                                            "name": "Dans",
                                            "value": `${message.channel}`,
                                            "inline": true
                                        },
                                        {
                                            "name": "Pour",
                                            "value": `${banRaison}`,
                                            "inline": true
                                        }
                                    ]
                                }
            });

            message.channel.send({ 
            "embed": 
            {
                "title": "Bannissement",
                "color": 13632027,
                "timestamp": message.createdAt,
                "footer": {
                    "text": "Hopeless ♡"
                },
                "fields": [
                {
                  "name": "De",
                  "value": `${banUser}`,
                  "inline": true
                },
                {
                  "name": "Pour",
                  "value": `${banRaison}`,
                  "inline": true
                }
              ]
            }}).then(message.delete());
            
            message.guild.member(banUser).ban(7, banRaison);

            break;

        case "clear":
        {
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("❌ 》 Vous ne pouvez pas faire ça.").then(msg => {msg.delete(10000); message.delete()});
            if(!args[0]) return message.channel.send("❌ 》 Vous devez mettre le nombre de messages à supprimer.").then(msg => {msg.delete(10000); message.delete()});
            message.delete();
            let delMessage = args[0]+1
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`☑ 》 ${args[0]} messages a été supprimé.`).then(msg => {msg.delete(10000);});
                    logsChannel.send({
                        "embed": {
                            "title": "Clear",
                            "color": 13632027,
                            "timestamp": "2019-09-19T23:35:51.900Z", 
                            "footer": {
                                "text": "Hopeless ♡"
                            },
                            "fields": [
                                {
                                    "name": "Par",
                                    "value": `<@${message.author.id}>\n${message.author.id}`,
                                    "inline": true
                                },
                                {
                                    "name": "De",
                                    "value": `${args[0]}`,
                                    "inline": true
                                },
                                {
                                    "name": "Dans",
                                    "value": `${message.channel}`,
                                    "inline": true
                                },
                            ]
                        }
                    });
            });
            break;
        }

		default:
			console.log(`Commande {${cmd}} effectué mais introuvable..`);
	}
});

client.login("");