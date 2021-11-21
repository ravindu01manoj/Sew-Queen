/* 

Sew Queen Whatsapp Bot                       

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


    SewQueen['IntroduceCMD']({pattern: 'weather ?(.*)', desc: DATA.WEATHER_DESC, fromMe: WorkType}, async (message, input) => {

	    if (input[1] === '') return await message.reply(DATA.NEED_LOCATION);
	    let url = `http://api.openweathermap.org/data/2.5/weather?q=${input[1]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=tr`;
	    try {
		    let response = await got(url);
		    let json = JSON.parse(response.body);
		    if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📍 ' + DATA.LOCATION +':* ```' + input[1] + '```\n\n' +
		    '*☀ ' + DATA.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
		    '*ℹ ' + DATA.DESC +':* ```' + json.weather[0].description + '```\n' +
		    '*☀ ' + DATA.HUMI +':* ```%' + json.main.humidity + '```\n' + 
		    '*💨 ' + DATA.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
		    '*☁ ' + DATA.CLOUD +':* ```%' + json.clouds.all + '```\n', MessageType.text);
	    } catch {
		    return await message.client.sendMessage(message.jid, DATA.NOT_FOUND, MessageType.text);
	    }
    });