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
let { SendMessageImage } = require('sew-queen-pro/sources/dc/cmd/dl')
let ffmpeg = require('fluent-ffmpeg');
let exec = require('child_process').exec;
let axios = require('axios');
let got = require('got');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let DataHelp = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true
let {spawnSync} = require('child_process');
let chalk = require('chalk');
let DATA = DataHelp.dataGet('system_stats');
let SSSD = DataHelp.dataGet('rrsew');
let SSSA = DataHelp.dataGet('sewrr'); 
let INFOD ="✧✧✧✧✧✧✧✧✧✧✧\n       *Infomation Command*\n\n👑 *.sysd*\n   ✨system information\n\n👑 *.whois*\n   ✨basic whois\n\n👑 *.info*\n   ✨advance information\n\n👑 *.id*\n   ✨user id\n\nᴘᴏᴡᴇʀᴅ ʙʏ ꜱᴇᴡ ǫᴜᴇᴇɴ"
let I_DESC = "Get infomations with smart bot"
let DD = " *Group Description:* "
var ADMİN_USER = ''
var USER_USER = ''
var TR_USER = ''
var Hİ_USER = ''
var AZ_USER = ''
var SRİ_USER = ''
var RU_USER = ''
var USA_USER = ''
var OTHER = ''
if (Details.LANG == 'EN') ADMİN_USER = '✪\n✨ ➢ *Admins:* ', USER_USER = '✨ ➢ *All members:* ', SRİ_USER = '✨ ➢ *SL Members:* ', TR_USER = '✨ ➢ *Tr Members:* ', Hİ_USER = '✨ ➢ *In Members:* ', AZ_USER = '✨ ➢ *Az Members:* ', RU_USER = '✨ ➢ *Ru Members:* ', USA_USER = '✨ ➢ *USA Members:* ', OTHER = '✨ ➢ *Other members:* '
if (Details.LANG == 'SI') ADMİN_USER = '✪\n✨➢ *පරිපාලකවරුන්:* ', USER_USER = '✨➢ *මුළු සාමාජීකයින්:* ', TR_USER = '✨➢ *තුර්කි අංක:* ', Hİ_USER = '✨➢ *ඉන්දියානු අංක:* ', AZ_USER = '✨➢ *Az අංක:* ', SRİ_USER = '✨➢ *ශ්‍රී ලාංකික අංක:* ', RU_USER = '✨➢ *රුසියානු අංක:* ', USA_USER = '✨➢ *USA අංක :* ', OTHER = '✨➢ *වෙනත් අංක:* '


    SewQueen['IntroduceCMD']({ pattern: 'info$', fromMe: WorkType, desc: SSSA.PL_DESC, dontAddCMDList: true }, async (message, input) => { 
      
         if (message.jid.includes('@g.us')) {
            var kingjson = await message.client.groupMetadataMinimal(message.jid) 
            var code = '';
             try {
             code = await message.client.groupInviteCode(message.jid)
                 } catch (e) {
                 code = 'Not Permission'
                     }
            var nwjson = await message.client.groupMetadata(message.jid) 
            let region = await message.client.groupMetadata(message.jid);
            let grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            var users1 = [];
            grup['participants'].map(async (uye) => {
                if (uye.isAdmin) {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
                users1.push(uye.id.replace('c.us', 's.whatsapp.net'));
            });
            var admin_count = jids.length + '\n'
            var user_count = users1.length + '\n'
            var tr_user = [];
            var hi_user = [];
            var az_user = [];
            var sri_user = [];
            var ru_user = [];
            var usa_user = [];
            var other_user = [];
            region['participants'].map(async (reg) => {
                if (reg.jid.startsWith('90')) { tr_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('994')) { az_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('91')) { hi_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('94')) { sri_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('7')) { ru_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } if (reg.jid.startsWith('1')) { usa_user.push(reg.id.replace('c.us', 's.whatsapp.net'));
                } 
            });
            var trus = ' ' + tr_user.length + '\n'
            var hius = ' ' + hi_user.length + '\n'
            var azus = ' ' + az_user.length + '\n'
            var srius = ' ' + sri_user.length + '\n'
            var ruus = ' ' + ru_user.length + '\n'
            var usaus = ' ' + usa_user.length + '\n'
            var oth = ' ' + user_count - trus - hius - azus - srius - ruus - usaus
            let user_count_msg = ADMİN_USER + admin_count + USER_USER + user_count + TR_USER + trus + Hİ_USER + hius + AZ_USER + azus + SRİ_USER + srius + RU_USER + ruus + USA_USER + usaus + OTHER + oth + '\n✪ '
            let msg = `*Group ID:* ${kingjson.id} \n` + SSSA.SUB + `${nwjson.subject} \n` + SSSA.OWN + `${kingjson.owner} \n` + SSSA.COD + `${code} \n` + user_count_msg + DD + `\n\n${nwjson.desc}`
            var ppUrl = await message.client.getProfilePicture(message.jid) 
            let resim = await axios.get(ppUrl, {responseType: 'arraybuffer'})
            await SendMessageImage(message,
                Buffer.from(resim.data), 
                msg
            );
        }
        else {
            var status = await message.client.getStatus(message.jid) 
            var usppUrl = await message.client.getProfilePicture(message.jid) 
            var usexists = await message.client.isOnWhatsApp(message.jid)
            let nwmsg = SSSA.JİD + `${usexists.jid} \n` + SSSA.ST + `${status.status}`
            let resimnw = await axios.get(usppUrl, {responseType: 'arraybuffer'})
            await SendMessageImage(message,
                Buffer.from(resimnw.data), 
                nwmsg
            );
        }
    });

    SewQueen['IntroduceCMD']({pattern: 'jid ?(.*)', fromMe: WorkType, desc: DATA.JID_DESC, dontAddCMDList: true}, (async (message, input) => {    
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, message.reply_message.jid, MessageType.text);
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, user, MessageType.text)
            });
        } else {
            await message.client.sendMessage(message.jid,message.jid, MessageType.text);
        }
    }));

let WAME_DESC = "Get a link to the user chat."
let WAME = "```Chat link from```@{}: https://wa.me/{}"
let NEED_UWONG = "*Give me a user!*"
    SewQueen['IntroduceCMD']({pattern: 'wame ?(.*)', fromMe: WorkType, desc: WAME_DESC}, (async (message, input) => {    
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, WAME.format(message.reply_message.jid.split('@')[0], message.reply_message.jid.replace('@s.whatsapp.net', ' ')), MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, WAME.format(user.split('@')[0], user.replace('@s.whatsapp.net', ' ')), MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                }); 
            });
        } else if (!message.jid.includes('@g.us')) {
await message.client.sendMessage(message.jid, WAME.format(message.jid.split('@')[0], message.jid.replace('@s.whatsapp.net', ' ')), MessageType.text, {
          contextInfo: {mentionedJid: [message.jid]}
            });
        } else {
            await message.client.sendMessage(message.jid, NEED_UWONG, MessageType.text);
        }
    }));
    
