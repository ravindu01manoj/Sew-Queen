/* 
 Sew Queen Whatsapp Bot                       
                       
 Telegram: t.me/RavinduManoj
 Facebook: https://www.facebook.com/ravindu.manoj.79
 Licensed under the  GPL-3.0 License;
 
 Coded By Ravindu Manoj
*/ 
let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let axios = require('axios');
let {sendMessagettp, sendMessageEmojiToPng} = require('sew-queen-pro/sources/dc/cmd/ttp')
let {SetUPImageInSEWQUEEN} = require('sew-queen-pro/sources/dc/cmd/setimg')
let { SendMessageImage } = require('sew-queen-pro/sources/dc/cmd/dl')
let {sendMessagelogolist} = require('sew-queen-pro/sources/dc/cmd/TextList')
let {sendMessagelogores, sendMessagepngres} = require('sew-queen-pro/sources/dc/cmd/textmaker')
let WorkType = Details.WORKTYPE == 'public' ? false : true
var { FancyText, fancyList } = require("fancy-sew-amdi")
let { MessageType, Mimetype } = require('@ravindu01manoj/sew-queen-web');
var LOGODISC = '';
var des = '';
if (Details.LANG == 'SI') {
   des = 'ඉමෝජි පින්තූර බවට පත් කරයි'
   LOGODISC = '350 කට අදික ඌ ලෝගො සෑදීම සදහා යොදා ගන්න.අනිවාරයෙන් වචන දෙකක් යෙදිය යුතු අතර වචන දෙක / මගින් වෙන් කරන්න.\n🎲උදා:- .textlogo SEW / QUEEN'
} else {
   des = "You Can Png From Any Emoji"
   LOGODISC = '350+ Text To Image and Logo Maker... Need Two Words And Split Them Using /\neg : .textlogo SEW / Queen '
}
SewQueen['IntroduceCMD']({
        pattern: 'attp ?(.*)', 
        fromMe: WorkType, 
        disc: 'ttp and 250+ sticker making command...\n*Usage:-* .attp Sew'
       }, 
(async (QueenSew, input) => {
 await sendMessagettp(QueenSew, input)
}));
SewQueen['IntroduceCMD']({
        pattern: 'png ?(.*)', 
        fromMe: WorkType, 
        disc: des
        }, 
(async (QueenSew, input) => { 
await sendMessageEmojiToPng(QueenSew, input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'textlogo ?(.*)', 
        fromMe: WorkType, 
        disc: LOGODISC
        }, 
(async (QueenSew, input) => { 
await sendMessagelogolist(QueenSew, input)
await sendMessagelogores(QueenSew, input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'fancy ?(.*)', 
        fromMe: WorkType, 
        disc: '118+ Fancy Text Maker With Unlimited Access'
        }, 
(async (QueenSew, input) => { 
if(input[1].includes('//--//')) {
var text = input[1].split('//--//')[1]
var type = input[1].split('//--//')[0]
var fancy = await FancyText(text)
await QueenSew.client.sendMessage(QueenSew.jid, fancy[type], MessageType.text)
} else {
var list = await fancyList(input[1])
await QueenSew.client.sendMessage(QueenSew.jid, list, MessageType.listMessage)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'setimg ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
 if (QueenSew.reply_message === false || QueenSew.reply_message.image === false) return await QueenSew.client.sendMessage(QueenSew.jid,'Reply To Any Image| image size < 100kb\n\n100kb වලට අඩු ඕනෑම රූපයකට රිප්ලයි ලෙස යොදන්න..',MessageType.text);
try {
 await SetUPImageInSEWQUEEN(QueenSew, input)
 } catch (e) {
  if(e.message.includes('display')) {
     return await QueenSew.client.sendMessage(QueenSew.jid,'Your Imgbb APIKEY is invalid.. please add the api key ( api.imgbb.com )',MessageType.text)
     } else {
   return await QueenSew.client.sendMessage(QueenSew.jid,'Do Not Use Bot Here.. This Is Your Log Number',MessageType.text)
   }
  }
})); 
// about me
SewQueen['IntroduceCMD']({
            pattern: 'codeby', 
            fromMe: true, 
            dontAdCommandList: true
            },
 (async (message, input) => {
            var codeby = ` ✬ ᴀʙᴏᴜᴛ ʙᴏᴛ\n\nNAME    : SEW QUEEN\nVERSION : ${Details.VERSION}\nBASED ON: NODEJS / JAVASCRIPT / TYPESCRIPT\nLANGUAGE: SINHALA / ENGLISH\nON      : GITHUB\nLINK    : github.com/ravindu01manoj/Sew-Queen\nWA WEB  : @ravindu01manoj/sew-queen-web (npm)\nDOCKER  : ravindu01manoj/sewqueen:lovegift\n\n✬ ᴀʙᴏᴜᴛ ᴍᴇ \n\nNAME    : RAVINDU MANOJ\nCOUNTRY : SRI LANKA\nDISTRICT: POLONNARUWA\nZIP CODE: 51031\nAGE     : 20\nTG      : t.me/RavinduManoj\nYOUTUBE : https://youtube.com/c/TechToFuture\nGMAIL   : manojravindu66@gmail.com\nGITHUB  : github.com/ravindu01manoj`
            var imagesew = await axios.get('https://i.ibb.co/LNvYVkn/ce30bd75cb0e.png', { responseType: 'arraybuffer' })
            await SendMessageImage(message,Buffer.from(imagesew.data) ,'```' + codeby + '```')
}));


