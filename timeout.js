const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
		const fetch = require('node-fetch');
		const ms = require('ms');
		const time = args.slice(1).join(' ');
		const user = message.mentions.users.first();
		if(!user) return message.channel.send('Kullanıcı etiketle!');
		if(!time) return message.channel.send('Süreyi Belirt! `1m`');

		const milliseconds = ms(time);
		if(!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
			return message.channel.send('10s / 24d arası bir süre dilimi giriniz.');
		}

		const iosTime = new Date(Date.now() + milliseconds).toISOString();

		await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: iosTime }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
		});
		message.channel.send(`${user.username} isimli kişi \`${time}\`boyunca zaman aşımına uğradı!`);
	},
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['to', 'timeout'],
	permLevel: 2
};
	exports.help = {
		name: 'timeout',
		description: 'Timeout işte olum',
		usage: 'timeout @etiket süre'
	  };
  
