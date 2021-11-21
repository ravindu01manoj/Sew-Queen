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

const FormData = require('form-data');
const stream = require('stream');
const {promisify} = require('util');
const pipeline = promisify(stream.pipeline);
const DATA = DataHelp.dataGet('removebg');

    SewQueen['IntroduceCMD']({pattern: 'removebg ?(.*)', fromMe: WorkType, desc: DATA.REMOVEBG_DESC}, (async (message, input) => {    
        if (message.reply_message === false || message.reply_message.image === false) return await message.client.sendMessage(message.jid,DATA.NEED_PHOTO,MessageType.text);
        if (Details.RBG_API_KEY === false) return await message.client.sendMessage(message.jid,DATA.NO_API_KEY,MessageType.text);
    
        var load = await message.reply(DATA.RBGING);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');

        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {
                'X-Api-Key': Details.RBG_API_KEY
            }
        }); 
    
        await pipeline(
		    rbg,
		    fs.createWriteStream('rbg.png')
        );
    
        await message.client.sendMessage(message.jid,fs.readFileSync('rbg.png'), MessageType.document, {filename: Details.BOTNAME + '.png', mimetype: Mimetype.png});
        await load.delete();
    }));
