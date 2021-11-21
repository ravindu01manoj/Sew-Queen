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
let {sendMessagecalculate} = require('sew-queen-pro/sources/dc/cmd/cal')
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

let TinyURL = require('tinyurl');
let DATA = DataHelp.dataGet('web');
let SDATA = DataHelp.dataGet('webss');
SewQueen['IntroduceCMD']({pattern: 'speedtest ?(.*)', fromMe: true, desc: DATA.SPEEDTEST_DESC, usage: 'speedtest user // speedtest server'}, (async (message, input) => {
    if (input[1] == 'user' || input[1] == 'User') {
        
        // Preliminary Message
        var transition_message = await DataPack.speedtest_once(Details.LANG)

        // Ping
        var start = new Date().getTime();
        await message.client.sendMessage(message.jid, transition_message.user_msg, MessageType.text)
        var end = new Date().getTime();

        // Speedtest Modules
        var user_download = await DataPack.speedtest_user()
        var user_upload = await DataPack.uploadtest_user()
        var auth_message = await DataPack.speedtest_message(Details.LANG)
        var act_ping = end - start
        var realping = act_ping.toString()

        // Real Download Speed
        var realspeed_once = Number(user_download.mbps) / 8
        var realspeed = realspeed_once.toString()
        var realspeed_msg = auth_message.download_value.replace('{count}', realspeed)

        // Real Upload Speed
        var realupload_once = Number(user_upload.mbps) / 8
        var realupload = realupload_once.toString()
        var realupload_msg = auth_message.download_value.replace('{count}', realupload)

        // Final Message
        var payload = auth_message.download + realspeed_msg + '\n' + 
            auth_message.upload + realupload_msg + '\n' +
            auth_message.ping + realping + auth_message.ms + '\n' +
            auth_message.extra + '\n\n' +
            auth_message.byte_speed_d + user_download.bps + '\n' +
            auth_message.kb_speed_d + user_download.kbps + '\n' +
            auth_message.mb_speed_d + user_download.mbps + '\n' +
            auth_message.gb_speed_d + user_download.gbps
        
        await message.client.sendMessage(message.jid, payload, MessageType.text)

    } else if (input[1] == 'server' || input[1] == 'Server') {
        
        // Preliminary Message
        var transition_message = await DataPack.speedtest_once(Details.LANG)

        // Ping
        var start = new Date().getTime();
        await message.client.sendMessage(message.jid, transition_message.server_msg, MessageType.text)
        var end = new Date().getTime();

        // Speedtest Modules
        var server_download = await DataPack.speedtest_server()
        var server_upload = await DataPack.uploadtest_server()
        var auth_message = await DataPack.speedtest_message(Details.LANG)
        var act_ping = end - start
       
        // Simple Way of Checking Heroku Latency
        var act_ping_then = act_ping / 50 
        var realping = act_ping_then.toString()

        // Real Download Speed
        var realspeed_once = Number(server_download.mbps) / 8
        var realspeed = realspeed_once.toString()
        var realspeed_msg = auth_message.download_value.replace('{count}', realspeed)

        // Real Upload Speed
        var realupload_once = Number(server_upload.mbps) / 8
        var realupload = realupload_once.toString()
        var realupload_msg = auth_message.download_value.replace('{count}', realupload)

        // Final Message
        var payload = auth_message.download + realspeed_msg + '\n' + 
            auth_message.upload + realupload_msg + '\n' +
            auth_message.ping + realping + auth_message.ms + '\n' +
            auth_message.extra + '\n\n' +
            auth_message.byte_speed_d + server_download.bps + '\n' +
            auth_message.kb_speed_d + server_download.kbps + '\n' +
            auth_message.mb_speed_d + server_download.mbps + '\n' +
            auth_message.gb_speed_d + server_download.gbps
        
        await message.client.sendMessage(message.jid, payload, MessageType.text)
    } else {
        // Preliminary Message
        var transition_message = await DataPack.speedtest_once(Details.LANG)

        // Ping
        var start = new Date().getTime();
        await message.client.sendMessage(message.jid, transition_message.server_msg, MessageType.text)
        var end = new Date().getTime();

        // Speedtest Modules
        var server_download = await DataPack.speedtest_server()
        var server_upload = await DataPack.uploadtest_server()
        var auth_message = await DataPack.speedtest_message(Details.LANG)
        var act_ping = end - start
       
        // Simple Way of Checking Heroku Latency
        var act_ping_then = act_ping / 50 
        var realping = act_ping_then.toString()

        // Real Download Speed
        var realspeed_once = Number(server_download.mbps) / 8
        var realspeed = realspeed_once.toString()
        var realspeed_msg = auth_message.download_value.replace('{count}', realspeed)

        // Real Upload Speed
        var realupload_once = Number(server_upload.mbps) / 8
        var realupload = realupload_once.toString()
        var realupload_msg = auth_message.download_value.replace('{count}', realupload)

        // Final Message
        var payload = auth_message.download + realspeed_msg + '\n' + 
            auth_message.upload + realupload_msg + '\n' +
            auth_message.ping + realping + auth_message.ms + '\n' +
            auth_message.extra + '\n\n' +
            auth_message.byte_speed_d + server_download.bps + '\n' +
            auth_message.kb_speed_d + server_download.kbps + '\n' +
            auth_message.mb_speed_d + server_download.mbps + '\n' +
            auth_message.gb_speed_d + server_download.gbps
        
        await message.client.sendMessage(message.jid, payload, MessageType.text)
    }
}));

SewQueen['IntroduceCMD']({pattern: 'ping$', fromMe: true, delownsewcmd: false, desc: DATA.PING_DESC}, (async (message, input) => {
  var start = new Date().getTime();
  await message.sendMessage('```Ping!```');
  var end = new Date().getTime();

  await message.client.sendMessage(
    message.jid,'*Pong!*\n```' + (end - start) + 'ms```', MessageType.text, { quoted: message.data });
}));

    SewQueen['IntroduceCMD']({pattern: 'short ?(.*)', fromMe: WorkType, desc: DATA.URL}, (async (message, input) => {

        if (input[1] === '') return await message.client.sendMessage(message.jid, SDATA.LİNK, MessageType.text);

        TinyURL.shorten(`${input[1]}`, async(res, err) => {
          if (err) return await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text);

           return await message.client.sendMessage(message.jid,`*Original Link:* ${input[1]}\n*Short Link:* ` + res, MessageType.text)
        });
    }));
    SewQueen['IntroduceCMD']({pattern: 'cal ?(.*)', fromMe: WorkType, desc: 'Powerfull Calculater With >  - + * / × ÷ π e ( ) pie pi log lg ^ 1-9'}, (async (message, input) => {
       var textsew = '';
if (message.reply_message) {
   textsew = message.reply_message.text
} else {
    if (input[1] === '') return await message.client.sendMessage(message.jid,'*Need Any Input! Valid ==>  - + * / × ÷ π e ( ) pie pi log ^ 1-9*', MessageType.text);
   textsew = input[1]
    }
        var calculate = await sendMessagecalculate(textsew)
        await message.client.sendMessage(message.jid,calculate, MessageType.text) 
    }));


