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


let REPORT_DESC = "For The Report...."
let AAA = "*⚠⚠Report Accepted⚠⚠*\n✔"
let AAB = ", Unusual Activity Detected"
let AAC = ", 🎲🎲.\n\n\n*********************************"
let NEED_NUM = "*Give me a user!*"
let REPORT = "⚠ @{} ⚠"

let SEWA = "         *❆❉☣REPORTED☣❉❆*\n         \n*to*:-"
let SEWB = "\nUser:-"
let SEWC = "\n\n\n*Reason*:-"
let SEWD = "\n\n*Sec Reson*:-"
let SEWE = "╔═══════════ೋೋ═══════════╗\n╠       ⚠⚠⚠*Report Detected*⚠⚠⚠\n\n"
let SEWF = "\n╠           *👆👆Group Admins👆👆*                      \n╚═══════════ೋೋ═══════════╝\n\n_*Please Wait For Admins Respond*_"
SewQueen['IntroduceCMD']({pattern: 'report ?(.*)', fromMe: WorkType, desc: REPORT_DESC}, (async (message, input) => {    
        if (message.reply_message !== false, input[1] === '') {
        var SewRep;{
        SewRep = input[1];
        }
      
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '👮‍♂️ @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
         await message.client.sendMessage(
           message.jid,AAA, MessageType.text);
        
            await message.client.sendMessage(message.jid, SEWA + REPORT.format(message.reply_message.jid.split('@')[0]) + SEWB + REPORT.format(message.reply_message.jid.split('@')[0]) + SEWC + SewRep + AAB + SEWD + SewRep + AAC, MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}, previewType: 0
           });
           
           await message.client.sendMessage(message.jid, SEWE + mesaj + SEWF, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0});
          } else if (message.mention !== false) {
                
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '👮‍♂️ @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
                
            message.mention.map(async user => {
            
            await message.client.sendMessage(
           message.jid,AAA, MessageType.text);
           
                await message.client.sendMessage(message.jid, SEWA + REPORT.format(user.split('@')[0]) + SEWB + REPORT.format(user.split('@')[0]) + SEWC + AAB + SEWD + AAC  , MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}, previewType: 0
                }); 
                await message.client.sendMessage(message.jid, SEWE + mesaj + SEWF, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0});

            });
        } else {
            await message.client.sendMessage(message.jid, NEED_NUM, MessageType.text);
        }
        
    }));
    
    SewQueen['IntroduceCMD']({pattern: 'report ?(.*)', fromMe: true, dontAdCommandList: true}, (async (message, input) => {    
        if(Details.WORKTYPE !=='public') return;
         if (message.reply_message !== false, input[1] === '') {
        var SewRep;{
        SewRep = input[1];
        }
      
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '👮‍♂️ @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
         await message.client.sendMessage(
           message.jid,AAA, MessageType.text);
        
            await message.client.sendMessage(message.jid, SEWA + REPORT.format(message.reply_message.jid.split('@')[0]) + SEWB + REPORT.format(message.reply_message.jid.split('@')[0]) + SEWC + SewRep + AAB + SEWD + SewRep + AAC, MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}, previewType: 0
           });
           
           await message.client.sendMessage(message.jid, SEWE + mesaj + SEWF, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0});
                       
        } else if (message.mention !== false) {
                
        let grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(async (uye) => {
            if (uye.isAdmin) {
                mesaj += '👮‍♂️ @' + uye.id.split('@')[0] + '\n';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        });
                
            message.mention.map(async user => {
            
            await message.client.sendMessage(
           message.jid,AAA, MessageType.text);
           
                await message.client.sendMessage(message.jid, SEWA + REPORT.format(user.split('@')[0]) + SEWB + REPORT.format(user.split('@')[0]) + SEWC + AAB + SEWD + AAC , MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}, previewType: 0
                }); 
                await message.client.sendMessage(message.jid, SEWE + mesaj + SEWF, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0});
            });
        } else {
            await message.client.sendMessage(message.jid, NEED_NUM, MessageType.text);
        }
        
    }));
    
