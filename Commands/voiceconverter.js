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

let DATA = DataHelp.dataGet('voicy');
let recognizeAudio = () => {
    let headers = new Headers({
        'Content-Type': 'audio/wav',
        "Authorization": `Bearer ${Details.WITAI_API}`,
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
    })

    let requestBody = {
        method: "POST",
        body: fs.readFileSync('output.wav'),
        headers: headers
    }

    return fetch("https://api.wit.ai/speech?v=20200219", requestBody)
        .then(response => response.json())
        .then(json => json._text)
}

let convertToWav = file => {
    return ffmpeg(file)
        .inputFormat('ogg')
        .audioCodec('pcm_s16le')
        .format('wav')
        .save('output.wav')
}
    SewQueen['IntroduceCMD']({ pattern: 'voicy', desc: DATA.USAGE, fromMe: WorkType }, (async (message, input) => {
        try {
            if (message.reply_message) {
                if (!message.reply_message.text && !message.reply_message.video && !message.reply_message.image) {
                    let file = await message.client.downloadAndSaveMediaMessage({
                        key: {
                            remoteJid: message.reply_message.jid,
                            id: message.reply_message.id
                        },
                        message: message.reply_message.data.quotedMessage
                    })
                    convertToWav(file).on('end', async () => {
                        let recognizedText = await recognizeAudio()
                        await message.client.sendMessage(message.jid, DATA.TEXT + '```' + recognizedText + '```', MessageType.text)
                    });
                } else {
                    await message.client.sendMessage(message.jid, DATA.ONLY_AUDIO, MessageType.text)
                }
            } else {
                await message.client.sendMessage(message.jid, DATA.NEED_REPLY, MessageType.text)
            }
        } catch (err) {
            console.log(err)
        }
    }));
