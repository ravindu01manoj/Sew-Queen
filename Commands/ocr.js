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

let tesseract = require("node-tesseract-ocr")
let langs = require('langs');
let DATA = DataHelp.dataGet('ocr');
    SewQueen['IntroduceCMD']({pattern: 'ocr ?(.*)', fromMe: WorkType, desc: DATA.OCR_DESC}, (async (message, input) => { 

        if (message.reply_message === false) return await message.sendMessage(DATA.NEED_REPLY);    
	var info = await message.reply(DATA.DOWNLOADING);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var dil;
        if (input[1] !== '') {
            dil = langs.where("1", input[1]);
        } else {
            dil = langs.where("1", Details.LANG.toLowerCase());
        }

        try {
            var result = await tesseract.recognize(location, {
                lang: dil[2]
            });    
        } catch (e) {
            return await message.reply(DATA.ERROR.format(e));
        }

        await info.delete();
        if ( result === ' ' || result.length == 1 ) {
            return await message.reply(DATA.ERROR.format(' Empty text'));
        }

        return await message.reply(DATA.RESULT.format(dil[2], result));
    }));
    