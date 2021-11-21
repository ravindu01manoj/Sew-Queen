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

let DATA = DataHelp.dataGet('afk');

var AFK = {
    isAfk: false,
    reason: false,
    lastseen: 0
};

// https://stackoverflow.com/a/37096512
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " " + DATA.HOUR + ", " : " " + DATA.HOUR + ", ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " " + DATA.MINUTE + ", " : " " + DATA.MINUTE + ", ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " " + DATA.SECOND : " " + DATA.SECOND) : "";
    return hDisplay + mDisplay + sDisplay; 
}

SewQueen['IntroduceCMD']({on: 'text', fromMe: false, delownsewcmd: false}, (async (message, input) => {
    if (Details.AFKMSG == 'default') {

        if (AFK.isAfk && ((!message.jid.includes('@g.us')) || (message.jid.includes('@g.us') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('@g.us') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        await message.client.sendMessage(message.jid,DATA.AFK_TEXT + '\n' + 
                        (AFK.reason !== false ? '\n*' + DATA.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + DATA.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + DATA.AGO : ''), MessageType.text, {quoted: message.data});            
                    }
                })
            } else if (message.jid.includes('@g.us') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    await message.client.sendMessage(message.jid,DATA.AFK_TEXT + '\n' + 
                        (AFK.reason !== false ? '\n*' + DATA.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + DATA.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + DATA.AGO : ''), MessageType.text, {quoted: message.data});
                }
            } else {
                await message.client.sendMessage(message.jid,DATA.AFK_TEXT + '\n' + 
                (AFK.reason !== false ? '\n*' + DATA.REASON + ':* ```' + AFK.reason + '```' : '') + 
                (AFK.lastseen !== 0 ? '\n*' + DATA.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + DATA.AGO : ''), MessageType.text, {quoted: message.data});
            }
        }
    }
    else {
        if (AFK.isAfk && ((!message.jid.includes('@g.us')) || (message.jid.includes('@g.us') && 
            (( message.mention !== false && message.mention.length !== 0 ) || message.reply_message !== false)))) {
            if (message.jid.includes('@g.us') && (message.mention !== false && message.mention.length !== 0)) {
                message.mention.map(async (jid) => {
                    if (message.client.user.jid.split('@')[0] === jid.split('@')[0]) {
                        await message.client.sendMessage(message.jid,Details.AFKMSG + '\n' + 
                        (AFK.reason !== false ? '\n*' + DATA.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + DATA.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + DATA.AGO : ''), MessageType.text, {quoted: message.data});            
                    }
                })
            } else if (message.jid.includes('@g.us') && message.reply_message !== false) {
                if (message.reply_message.jid.split('@')[0] === message.client.user.jid.split('@')[0]) {
                    await message.client.sendMessage(message.jid,Details.AFKMSG + '\n' + 
                        (AFK.reason !== false ? '\n*' + DATA.REASON + ':* ```' + AFK.reason + '```' : '') + 
                        (AFK.lastseen !== 0 ? '\n*' + DATA.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + DATA.AGO : ''), MessageType.text, {quoted: message.data});
                }
            } else {
                await message.client.sendMessage(message.jid,Details.AFKMSG + '\n' + 
                (AFK.reason !== false ? '\n*' + DATA.REASON + ':* ```' + AFK.reason + '```' : '') + 
                (AFK.lastseen !== 0 ? '\n*' + DATA.LAST_SEEN + ':* ```' + secondsToHms(Math.round((new Date()).getTime() / 1000) - AFK.lastseen) + DATA.AGO : ''), MessageType.text, {quoted: message.data});
            }
        }
    }
}));

SewQueen['IntroduceCMD']({on: 'text', fromMe: true, delownsewcmd: false}, (async (message, input) => {
    if (AFK.isAfk && !message.id.startsWith('3EB0')) {
        AFK.lastseen = 0;
        AFK.reason = false;
        AFK.isAfk = false;

        await message.client.sendMessage(message.jid,DATA.IM_NOT_AFK,MessageType.text);
    }
}));

SewQueen['IntroduceCMD']({pattern: 'afk ?(.*)', fromMe: true, delownsewcmd: false, desc: DATA.AFK_DESC}, (async (message, input) => {     
    if (!AFK.isAfk) {
        AFK.lastseen = Math.round((new Date()).getTime() / 1000);
        if (input[1] !== '') { AFK.reason = input[1]; }
        AFK.isAfk = true;

        await message.client.sendMessage(message.jid,DATA.IM_AFK + (AFK.reason !== false ? ('\n*' + DATA.REASON +':* ```' + AFK.reason + '```') : ''),MessageType.text);
    }
}));

module.exports = { secondsToHms };
