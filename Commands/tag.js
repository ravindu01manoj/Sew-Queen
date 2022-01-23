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


let DATA = DataHelp.dataGet('tagall');

async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
SewQueen['IntroduceCMD']({ pattern: 'scan ?(.*)', fromMe: WorkType, desc: DATA.SCAN}, (async (message, input) => { 

        if (input[1] == '') return await message.client.sendMessage(message.jid, DATA.NO, MessageType.text);

        var exists = await message.client.isOnWhatsApp(input[1])
        if (exists) {
            await message.client.sendMessage(message.jid, '```' + input[1] + '``` \n' + DATA.SUC + '\n' + exists.jid, MessageType.text);
        }
        else {
            await message.client.sendMessage(message.jid,'```' + input[1] + '``` \n' + DATA.UNSUC, MessageType.text);
        }
    }));

SewQueen['IntroduceCMD']({pattern: 'tag ?(.*)', fromMe: true, dontAdCommandList: true }, (async (message, input) => {
var nwjson = await message.client.groupMetadata(message.jid)
    if (input[1] !== '' && input[1] !== 'admin') {
        grup = await message.client.groupMetadata(message.jid);
        var jids = []
        grup['participants'].map(
            async (uye) => {
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
        await message.client.sendMessage(message.jid,`${input[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (message.reply_message && input[1] == '') {
        grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        grup['participants'].map(
            async (uye) => {
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
         await message.client.sendMessage(message.jid,message.reply_message.text, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    else if (input[1] == '') {
        grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(
            async (uye) => {
                mesaj += '▫️💠 @' + uye.id.split('@')[0] + ' 💠\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
        await message.client.sendMessage(message.jid,nwjson.subject + '\n\n   ❄Group Members❄\n\n' + mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
    
}));
let ABSEW = DataHelp.dataGet('admincont');
    SewQueen['IntroduceCMD']({pattern: 'tagadmin', fromMe: false, dontAdCommandList: true}, (async (message, input) => {
        if (Details.WORKTYPE !== 'public') return;
        var nwjson = await message.client.groupMetadata(message.jid) 
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '💠 @' + uye.id.split('@')[0] + '\n▫️👑 wa.me/' + uye.id.split('@')[0] +  ' 👑\n\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,'${nwjson.subject}\n◻    🔱    *👑 Group Admins 👑*    🔱    ◻\n\n\n' + mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }));
    SewQueen['IntroduceCMD']({pattern: 'tagadmin', fromMe: true, desc: ABSEW.CONTADMİN, dontAdCommandList: true}, (async (message, input) => {
    var nwjson = await message.client.groupMetadata(message.jid) 
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '💠 @' + uye.id.split('@')[0] + '\n▫️👑 wa.me/' + uye.id.split('@')[0] +  ' 👑\n\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
        await message.client.sendMessage(message.jid,nwjson.subject + '\n\n◻    🔱    *👑 Group Admins 👑*    🔱    ◻\n\n\n' + mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }));
