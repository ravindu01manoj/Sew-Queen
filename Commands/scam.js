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


let DATA = DataHelp.dataGet('scam');
var data = {
  action: true
}
SewQueen['IntroduceCMD']({pattern: 'scam ?(.*)', fromMe: true, desc: DATA.SCAM_DESC}, (async (message, input) => {
    if (input[1] === '') {
        return await message.sendMessage(DATA.SCAM_NOTFOUND);
    } else if (input[1] === 'typing') {
        if (data.action) {
            setInterval(async () => {
                await message.client.updatePresence(message.jid,Presence.composing)
            }, 10000)
        }
    } else if (input[1] === 'online') {
        if (data.action) {
            setInterval(async () => {
                await message.client.updatePresence(message.jid,Presence.available)
            }, 10000)
        }
    } else if (input[1] === 'recording') {
        if (data.action) {
            setInterval(async () => {
                await message.client.updatePresence(message.jid,Presence.recording)
            }, 10000)
        }
    } else if (input[1] === 'stop') {
        data.action = false
        await message.client.updatePresence(message.jid,Presence.paused)
        await new Promise(r => setTimeout(r, 500));
        data.action = true
    } else {
        await message.client.sendMessage(message.jid, DATA.SCAM_NULL, MessageType.text);
    }
}));
