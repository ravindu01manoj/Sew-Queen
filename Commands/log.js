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

let DATA = DataHelp.dataGet('log'); 

SewQueen['IntroduceCMD']({ pattern: 'log', fromMe: true, desc: DATA.LOG, warn: DATA.ANIM, onlyGrpSew: true}, (async (message, input) => { 

    let meta = await message.client.groupMetadata(message.jid)
    let usmeta = message.client.isOnWhatsApp(message.jid)

    if (message.jid.includes('g.us')) {
        if (!message.reply_message) {
            return await message.client.sendMessage(
                message.jid,
                DATA.REPLY,
                MessageType.text
            );
        }
        else if (message.reply_message.text) {
            await message.client.sendMessage(
                message.client.user.jid,
                DATA.HEAD + meta.id + DATA.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + DATA.USER + DATA.MSG + message.reply_message.text,
                MessageType.text
            );
            await message.client.sendMessage(
                message.jid,
                DATA.SUC,
                MessageType.text,
            );
        }  
        else if (message.reply_message.image) {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('im.jpg')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('im.jpg'),
                    MessageType.image,
                    { caption: DATA.HEAD + meta.id + DATA.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + DATA.USER }
                );
                await message.client.sendMessage(
                    message.jid,
                    DATA.SUC,
                    MessageType.text,
                );
            });
        }
        else if (message.reply_message.video) {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('vid.mp4')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('vid.mp4'),
                    MessageType.video,
                    { mimetype: Mimetype.mpeg, caption: DATA.HEAD + meta.id + DATA.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + DATA.USER }
                );
                await message.client.sendMessage(
                    message.jid,
                    DATA.SUC,
                    MessageType.text,
                );
            });
        }
        else if (!message.reply_message.text && !message.reply_message.video && !message.reply_message.sticker && !message.reply_message.image) {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('ad.mp3')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('ad.mp3'),
                    MessageType.audio,
                    { mimetype: Mimetype.mp4Audio} 
                );
                await message.client.sendMessage(
                    message.client.user.jid,
                    DATA.HEAD + meta.id + DATA.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + DATA.USER,
                    MessageType.text
                );
                await message.client.sendMessage(
                    message.jid,
                    DATA.SUC,
                    MessageType.text,
                );
            });
        }
        else {
            var location = await message.client.downloadAndSaveMediaMessage({
                key: {
                    remoteJid: message.reply_message.jid,
                    id: message.reply_message.id
                },
                message: message.reply_message.data.quotedMessage
            });
            ffmpeg(location)
            .save('log.webp')
            .on('end', async () => {
                await message.client.sendMessage(
                    message.client.user.jid,
                    fs.readFileSync('log.webp'),
                    MessageType.sticker
                );
                await message.client.sendMessage(
                    message.client.user.jid,
                    DATA.HEAD + meta.id + DATA.FROM + 'wa.me/' + message.reply_message.jid.split('@')[0] + DATA.USER,
                    MessageType.text
                );
                await message.client.sendMessage(
                    message.jid,
                    DATA.SUC,
                    MessageType.text,
                );
            });
        }
    }
    else if (!message.jid.includes('g.us')) {
        return;
    }
}));

