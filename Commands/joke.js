/* Sew Queen Whatsapp Bot                       

Telegram: https://t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79
Licensed under the  GPL-3.0 License;

Coded By Ravindu Manoj
*/ 
let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let { MessageType, MessageOptions, Mimetype, GroupSettingChange, ChatModification } = require('@ravindu01manoj/sew-queen-web');
let fs = require('fs');
let os = require('os');
let ffmpeg = require('fluent-ffmpeg');
let exec = require('child_process').exec;
let axios = require('axios');
let got = require('got');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let DataHelp = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true

let DATA = DataHelp.dataGet('weather');

SewQueen['IntroduceCMD']({pattern: 'joke ?(.*)', fromMe: WorkType, desc: DATA.JOKE_DESC}, async (message, input) => {
	if (input[1] === 'xx') return await message.reply(DATA.NEED_LOCATIONA);
	let url = `https://official-joke-api.appspot.com/random_joke`;
	try {
		let response = await got(url);
		let json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🗣️ ' + DATA.JOKE +'* ```' + json.setup + '```\n\n' +
		'*😆' + DATA.PUNCHLINE +'* ```' + json.punchline+ '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, DATA.NOT_FOUNDAC, MessageType.text);
	}
});
let QUOTE_DESC = "It Sends Random Quote"
let NEED_LOCATIONA = "*Invalid Request*"
let QUOTE = "Quote :"
let AUTHOR = "Author :"
let NOT_FOUNDA = "```Sorry,I could not find a quote. 😖```"

SewQueen['IntroduceCMD']({pattern: 'quote ?(.*)', fromMe: WorkType, desc: QUOTE_DESC}, async (message, input) => {
	if (input[1] === 'xx') return await message.reply(NEED_LOCATIONA);
	let url = `https://api.quotable.io/random`;
	try {
		let response = await got(url);
		let json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📌 ' + QUOTE +'* ```' + json.content + '```\n\n' +
		'*✒️' + AUTHOR +'* ```' + json.author+ '```\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, NOT_FOUNDA, MessageType.text);
	}
});
