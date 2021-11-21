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
SewQueen['IntroduceCMD']({pattern: 'news ?(.*)', fromMe: WorkType, desc: DATA.NEWS_DESC}, async (message, input) => {
	if (input[1] === '') return await message.reply(DATA.NEED_CATEGORY);
	let url = `https://inshortsapi.vercel.app/news?category=${input[1]}`;
	try {
		let response = await got(url);
		let json = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*📁 ' + DATA.CATEGORY +':* ```' + input[1] + '```\n\n\n' +
		'*💠 ' + DATA.NEWST +':* ```' + json.data[0].title + '```\n' + 
                '*📰 ' + DATA.NEWS +':* ```' + json.data[0].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[0].readMoreUrl + '```\n\n' +
                '*💠 ' + DATA.NEWST +':* ```' + json.data[1].title + '```\n' +                                                                         
		'*📰 ' + DATA.NEWS +':* ```' + json.data[1].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[1].readMoreUrl + '```\n\n' + 
                '*💠 ' + DATA.NEWST +':* ```' + json.data[2].title + '```\n' +
                '*📰 ' + DATA.NEWS +':* ```' + json.data[2].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[2].readMoreUrl + '```\n\n' + 
                '*💠 ' + DATA.NEWST +':* ```' + json.data[3].title + '```\n' +
   	        '*📰 ' + DATA.NEWS +':* ```' + json.data[3].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[3].readMoreUrl + '```\n\n' + 
                '*💠 ' + DATA.NEWST +':* ```' + json.data[4].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[4].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[4].readMoreUrl + '```\n\n'+ 
		'*💠 ' + DATA.NEWST +':* ```' + json.data[5].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[5].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[5].readMoreUrl + '```\n\n'+
		'*💠 ' + DATA.NEWST +':* ```' + json.data[6].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[6].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[6].readMoreUrl + '```\n\n'+									 
		'*💠 ' + DATA.NEWST +':* ```' + json.data[7].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[7].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[7].readMoreUrl + '```\n\n'+									 
		'*💠 ' + DATA.NEWST +':* ```' + json.data[8].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[8].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[8].readMoreUrl + '```\n\n'+
		'*💠 ' + DATA.NEWST +':* ```' + json.data[9].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[9].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[9].readMoreUrl + '```\n\n'+
		'*💠 ' + DATA.NEWST +':* ```' + json.data[10].title + '```\n' +                                                                         
                '*📰 ' + DATA.NEWS +':* ```' + json.data[10].content + '```\n' + 
		'*✨ ' + DATA.RMLINK +':* ```' + json.data[10].readMoreUrl + '```\n\n', MessageType.text);
	} catch {
		return await message.client.sendMessage(message.jid, DATA.NOT_FOUNDC, MessageType.text);
	}
});

SewQueen['IntroduceCMD']({ pattern: 'show ?(.*)', fromMe: WorkType , desc: "Get info related to tv series and shows"}, async (message, input) => {

    let userName = input[1]

    if (!userName) return await message.sendMessage("give me the show name")

    await message.sendMessage(infoMessage("Loading..."))

  await axios
      .get(`http://api.tvmaze.com/search/shows?q=${userName}`)
      .then(async (response) => {
        let {
          name,
          type,	
          language,
           status,
	  officialSite,
	  summary,
        } = response.data[0].show

   
        let msg = `*${"Name"}*: ${name}\n*${"Type"}*: ${type}\n*${"Type"}*: ${status}\n*${"Summary"}*: ${summary}\n*${"Official Site"}*: ${officialSite}`
       
       await message.client.sendMessage(message.jid, msg + '\n\nᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴇᴡ ǫᴘᴇᴇɴ' , MessageType.text);
      })
      .catch(
        async (err) => await message.sendMessage("Not Found" ),
      )
  },
)
SewQueen['IntroduceCMD']({ pattern: 'movie ?(.*)', fromMe: WorkType, desc: "Shows movie info." }, (async (message, input) => {
	if (input[1] === '') return await message.client.sendMessage(message.jid, '```Give me a name.```', MessageType.text, { quoted: message.data });
	let url = `http://www.omdbapi.com/?i=tt3896198&apikey=a6ad5056&t=${input[1]}&plot=full`
	let response = await got(url);
	let json = JSON.parse(response.body);
	if (json.Response != 'True') return await message.client.sendMessage(message.jid, '*Not found.*', MessageType.text, { quoted: message.data });
	let msg = '```';
	msg += 'Title      : ' + json.Title + '\n\n';
	msg += 'Year       : ' + json.Year + '\n\n';
	msg += 'Rated      : ' + json.Rated + '\n\n';
	msg += 'Released   : ' + json.Released + '\n\n';
	msg += 'Runtime    : ' + json.Runtime + '\n\n';
	msg += 'Genre      : ' + json.Genre + '\n\n';
	msg += 'Director   : ' + json.Director + '\n\n';
	msg += 'Writer     : ' + json.Writer + '\n\n';
	msg += 'Actors     : ' + json.Actors + '\n\n';
	msg += 'Plot       : ' + json.Plot + '\n\n';
	msg += 'Language   : ' + json.Language + '\n\n';
	msg += 'Country    : ' + json.Country + '\n\n';
	msg += 'Awards     : ' + json.Awards + '\n\n';
	msg += 'BoxOffice  : ' + json.BoxOffice + '\n\n';
	msg += 'Production : ' + json.Production + '\n\n';
	msg += 'imdbRating : ' + json.imdbRating + '\n\n';
	msg += 'imdbVotes  : ' + json.imdbVotes + '```';
	await message.client.sendMessage(message.jid, msg, MessageType.text, { quoted: message.data });
}));


let IPSTATUS_DESC = "It Sends Your IP details"
let NEED_IP = "*Enter Your IP Address..!*"
let IP = "IP :"
let ST = "STATUS :"
let CONTINENT = "CONTINENT :"
let COUNTRY = "COUNTRY :"
let COUNTRYCODE = "COUNTRYCODE :"
let REGIONNAME = "REGIONNAME :"
let CITY = "CITY :"
let ZIP = "ZIP :"
let CURRENCY = "CURRENCY :"
let ISP = "ISP :"
let MOBILE = "MOBILE :"
let PROXY = "PROXY :"
let NOT_FOUNDIP = "```Sorry,I could not your IP 😖```"

  SewQueen['IntroduceCMD']({pattern: 'ip ?(.*)', desc: 'gives you the detail of your IP' ,fromMe: WorkType}, async (message, input) => {
    if (input[1] === '') return await message.reply(NEED_IP);
	let url = `https://api.techniknews.net/ipgeo/${input[1]}`;
	try {
		let response = await got(url);
		let ipjson = JSON.parse(response.body);
		if (response.statusCode === 200) return await message.client.sendMessage(message.jid, '*🔴 ' + IP +'* ```' + input[1] + '```\n\n' +
		'*🤡' + ST +'* ```' + ipjson.status+ '```\n' +
        '*🌐' + CONTINENT +'* ```' + ipjson.continent+ '```\n' +
        '*🗺' + COUNTRY +'* ```' + ipjson.country+ '```\n' +
        '*🔢' + COUNTRYCODE +'* ```' + ipjson.countryCode+ '```\n' +
        '*🌍' + REGIONNAME +'* ```' + ipjson.regionName+ '```\n' +
        '*🚩' + CITY +'* ```' + ipjson.city+ '```\n' +
        '*🏛' + ZIP +'* ```' + ipjson.zip+ '```\n' +
        '*💸' + CURRENCY +'* ```' + ipjson.currency+ '```\n\n' +
        '*📡' + ISP +'* ```' + ipjson.isp+ '```\n' +
        '*🛡' + PROXY +'* ```' + ipjson.proxy+ '```\n' +
        '*📱' + MOBILE +'* ```' + ipjson.mobile+ '```\n', MessageType.text);
	} 
    catch {
		return await message.client.sendMessage(message.jid, NOT_FOUNDIP, MessageType.text);
	}
 });
