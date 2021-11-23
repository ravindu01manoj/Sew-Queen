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
let {sendMessagettp} = require('sew-queen-pro/sources/dc/cmd/ttp')
let {SetUPImageInSEWQUEEN} = require('sew-queen-pro/sources/dc/cmd/setimg')
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
await sendMessagepngres(QueenSew, input)
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
 if (QueenSew.reply_message === false || QueenSew.reply_message.image === false) return await QueenSew.client.sendMessage(QueenSew.jid,'Reply To Any Image| image size < 100kb\n\n100kb වලට අඩු ඕනෑම රූපයකට රිප්ලයි ලෙස යොදන්න..');
await SetUPImageInSEWQUEEN(QueenSew, input)
})); 
