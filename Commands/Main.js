/* 

 Sew Queen Whatsapp Bot                       

 Telegram: t.me/RavinduManoj
 Facebook: https://www.facebook.com/ravindu.manoj.79
 Licensed under the  GPL-3.0 License;

 Coded By Ravindu Manoj
*/ 
let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let { sendMessageUnlimtedSpam } = require('sew-queen-pro/sources/dc/cmd/spam')
let { MessageType, MessageOptions, Mimetype, GroupSettingChange, ChatModification } = require('@ravindu01manoj/sew-queen-web');
let fs = require('fs'); let os = require('os'); let ffmpeg = require('fluent-ffmpeg'); let exec = require('child_process').exec;
let axios = require('axios');
let got = require('got');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let Language = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true

const Lang = Language.dataGet('profile');
let { sendMessageAutoReply, sendMessageWarnKick, sendMessageError} = require('sew-queen-pro/sources/dc/cmd/warn')
let { sendMessageVerification, sendMessageCheckVerify } = require('sew-queen-pro/sources/dc/cmd/verify')
let { SewQueenWebQrGenarater, checkIsGroup} = require('sew-queen-pro/sources/dc/cmd/admin')
let { sendMessageSetUp } = require('sew-queen-pro/sources/dc/cmd/setup')
let { sendMessageGrpClone } = require('sew-queen-pro/sources/dc/cmd/clone')
let SEWA = 'need word'
let SEWB = 'Successfully Changed'
let CLR_DESC = 'Chat clear'
let { ReplyMessegedelete, sendMessageResetgroup, sendMessageJoingroup,
        sendMessageKickgroup, sendMessageAddgroup, sendMessagePromogroup,
        sendMessageDimogroup, sendMessageGroupMute, sendMessageUnmutgroup, 
        sendMessageDpgroup, sendMessageGetstatus, sendMessageClearlist, sendMessageTextboom, 
        sendMessageMpboom, sendMessageJpboom, sendMessageStickboom, sendMessageVidboom, 
        sendMessagecommgrp, sendMessagediffgrp, sendMessageinbox} = require('sew-queen-pro/sources/dc/cmd/admin');
let { sendMessagebadckickdata, sendMessageinbokickdata, sendMessagedatacopykick, BadKick} = require('sew-queen-pro/sources/dc/cmd/bad');

async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
const Heroku = require('heroku-client'); const heroku = new Heroku({ token: Details.HEROKU.API_KEY}); let baseURI = '/apps/' + Details.HEROKU.APP_NAME;
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}


// NOW Sew Queen Users Can Give Qr For Another Person To Make Thair Sew Queen Bot Easily
SewQueen['IntroduceCMD']({
        pattern: 'getqr ?(.*)',
        fromMe: true, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => {
try {
await SewQueenWebQrGenarater(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
// Automated

// Sew Queen Verification System For Join Sew Queen Helping Groups...
SewQueen['IntroduceCMD']({
        pattern: 'verify ?(.*)',
        fromMe: true, 
        dontAdCommandList: true,
                }, 
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await sendMessageVerification(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 

SewQueen['IntroduceCMD']({
        pattern: 'clone ?(.*)',
        fromMe: true, 
        dontAdCommandList: true,
                }, 
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await sendMessageGrpClone(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 

SewQueen['IntroduceCMD']({
        pattern: 'commingsoon ?(.*)',// give Unlimeted Spam Attack
        fromMe: true, 
        dontAdCommandList: true,
                }, 
(async (QueenSew, input) => { 
await sendMessageUnlimtedSpam(QueenSew, input)
})); 

SewQueen['IntroduceCMD']({
        on: 'text', 
        fromMe: false, 
        dontAdCommandList: true, 
        delownsewcmd: false, 
                },
(async (QueenSew, input) => {
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await sendMessageCheckVerify(QueenSew)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}))
// End Verification

SewQueen['IntroduceCMD']({
        pattern: 'grpcast ?(.*)', 
        fromMe: true, 
                disc: 'Brodcast A message For All Members of Any Group'
        }, 
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await sendMessageinbox(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 

SewQueen['IntroduceCMD']({
        pattern: 'setup ?(.*)',
        fromMe: true, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
try {
await sendMessageSetUp(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 

SewQueen['IntroduceCMD']({
        pattern: 'autoreply ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
try {
await sendMessageAutoReply(QueenSew, input, 'set')
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
SewQueen['IntroduceCMD']({
        pattern: 'replydel ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true
        }, 
(async (QueenSew, input) => { 
try {
await sendMessageAutoReply(QueenSew, input, 'del')
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 

SewQueen['IntroduceCMD']({
        on: 'text', 
        fromMe: false, 
        dontAdCommandList: true, 
        delownsewcmd: false
        },
(async (QueenSew, input) => {
try {
await sendMessageAutoReply(QueenSew, input, 'send')
} catch (e) {
await sendMessageError(QueenSew, e)
}
}))

SewQueen['IntroduceCMD']({
        pattern: 'warn ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
                }, 
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await sendMessageWarnKick(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
   
SewQueen['IntroduceCMD']({
        pattern: 'close',
        fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => { 

    await QueenSew.client.sendMessage(QueenSew.jid, 'Successful Closed Action', MessageType.text);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await QueenSew.client.sendMessage(QueenSew.jid, error.message, MessageType.text);
});
}));
// ===============================ᴅᴇʟᴇᴛᴇ==========
const DEL_DESC = "Deletes The Replied Message Send By The Bot"
SewQueen['IntroduceCMD']({
        pattern: 'del ?(.*)',
        fromMe: WorkType,
        desc: DEL_DESC},
(async (QueenSew, input) => { 
try {
await ReplyMessegedelete(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}))
//================================ʙᴏᴏᴍ=========
SewQueen['IntroduceCMD']({
        pattern: 'boomtext ?(.*)',
        fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => { 
try {
await sendMessageTextboom(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'boomaudio$',
        fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => { 
try {
await sendMessageMpboom(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'boomphoto$',
        fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => { 
await sendMessageJpboom(QueenSew, input)
}));
SewQueen['IntroduceCMD']({
        pattern: 'boomstic$',
        fromMe: true,
        dontAdCommandList: true },
(async (QueenSew, input) => {     
try {
await sendMessageStickboom(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'boomvid$',
        fromMe: true,
        dontAdCommandList: true },
(async (QueenSew, input) => { 
try {
await sendMessageVidboom(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
//================================ᴄʟᴇᴀʀ=========
SewQueen['IntroduceCMD']({
        pattern: 'clear ?(.*)',
        fromMe: true,
        desc: CLR_DESC,
        usage: '.clear // .clear 94718281xxx // .clear 94718281xxx-12345678@g.us'},
(async (QueenSew, input) => { 
try {
 await sendMessageClearlist(QueenSew, input)
 } catch (e) {
await sendMessageError(QueenSew, e)
}
}));
//================================ꜱᴛᴀᴛᴜꜱ=========
SewQueen['IntroduceCMD']({
        pattern: 'getst$',
        fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => { 
try {
    await sendMessageGetstatus(QueenSew, input)
    } catch (e) {
await sendMessageError(QueenSew, e)
}
}));
//================================ʙᴀᴅ ᴋɪᴄᴋ=========
SewQueen['IntroduceCMD']({on: 'text',
        fromMe: false,
        delownsewcmd: false},
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await sendMessagebadckickdata(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
//================================ᴄᴏᴘʏ ʏᴀ ᴋɪᴄᴋ 😆=========
SewQueen['IntroduceCMD']({on: 'text',
        fromMe: false,
        delownsewcmd: false},
(async (QueenSew, input) => { 
try {
await sendMessagedatacopykick(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
//================================ɪɴʙᴏx ʙʟᴏᴄᴋ=========
 if (Details.INBO == 'true') {
SewQueen['IntroduceCMD']({on: 'text',
        fromMe: false,
        delownsewcmd: false,
        onlyPm: true },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (grptest) return;
try {
await sendMessageinbokickdata(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

}
SewQueen['IntroduceCMD']({
        pattern: 'badkick ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true,
                }, 
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
try {
await BadKick(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
//================================ꜰᴏʀ ɢʀᴏᴜᴘ=========
SewQueen['IntroduceCMD']({
        pattern: 'comm ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
  //    disc: 
        }, 
(async (QueenSew, input) => { 
try {
await sendMessagecommgrp(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
SewQueen['IntroduceCMD']({
        pattern: 'diff ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
  //    disc: 
        }, 
(async (QueenSew, input) => { 
try {
await sendMessagediffgrp(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
SewQueen['IntroduceCMD']({
        pattern: 'join ?(.*)',
        fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => {  
try {
await sendMessageJoingroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
    }));
SewQueen['IntroduceCMD']({
        pattern: 'reset ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;  
try {
await sendMessageResetgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
  }));
SewQueen['IntroduceCMD']({
        pattern: 'kick ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;  
try {
await sendMessageKickgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'add(?: |$)(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;  
try {
await sendMessageAddgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'promote ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;   
try { 
await sendMessagePromogroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'demote ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {
await sendMessageDimogroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'mute ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {
await sendMessageGroupMute(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'unmute ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {
await sendMessageUnmutgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'invite ?(.*)',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {
    var im = await checkImAdmin(QueenSew);
    if (!im) return await QueenSew.client.sendMessage(QueenSew.jid,'I Am Not A Admin', MessageType.text);
    var invite = await QueenSew.client.groupInviteCode(QueenSew.jid);
    await QueenSew.client.sendMessage(QueenSew.jid,'INVITE LINK: https://chat.whatsapp.com/' + invite, MessageType.text);
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'name ?(.*)',
                fromMe: true,
        dontAdCommandList: true},
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
    var im = await checkImAdmin(QueenSew);
    if (!im) return await QueenSew.client.sendMessage(QueenSew.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    if (input[1] === '') return await QueenSew.client.sendMessage(QueenSew.jid,SEWA);
    await QueenSew.client.groupUpdateSubject(QueenSew.jid, input[1]);
    await QueenSew.client.sendMessage(QueenSew.jid,SEWB,MessageType.text);
    }
));

SewQueen['IntroduceCMD']({
        pattern: 'dp',
        fromMe: true,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {
await sendMessageDpgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

if (Details.GRPMANAGE == 'true') {

SewQueen['IntroduceCMD']({
        pattern: 'reset ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;
await sendMessageResetgroup(QueenSew, input)
  } catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'kick ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;
await sendMessageKickgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'add(?: |$)(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;
await sendMessageAddgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'promote ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
await sendMessagePromogroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'demote ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
await sendMessageDimogroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'mute ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
await sendMessageGroupMute(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'unmute ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
await sendMessageUnmutgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));

SewQueen['IntroduceCMD']({
        pattern: 'invite ?(.*)',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
    var im = await checkImAdmin(QueenSew);
    if (!im) return await QueenSew.client.sendMessage(QueenSew.jid,Lang.IM_NOT_ADMIN, MessageType.text);
    var invite = await QueenSew.client.groupInviteCode(QueenSew.jid);
    await QueenSew.client.sendMessage(QueenSew.jid,'INVITE LINK: https://chat.whatsapp.com/' + invite, MessageType.text);
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'name ?(.*)',
                fromMe: false,
        dontAdCommandList: true},
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;  
var us = await checkUsAdmin(QueenSew)
if (!us) return;
    var im = await checkImAdmin(QueenSew);
    if (!im) return await QueenSew.client.sendMessage(QueenSew.jid,Lang.IM_NOT_ADMIN,MessageType.text);
    if (input[1] === '') return await QueenSew.client.sendMessage(QueenSew.jid,SEWA);
    await QueenSew.client.groupUpdateSubject(QueenSew.jid, input[1]);
    await QueenSew.client.sendMessage(QueenSew.jid,SEWB,MessageType.text);
    }
));

SewQueen['IntroduceCMD']({
        pattern: 'dp',
        fromMe: false,
        dontAdCommandList: true,
        },
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;    
try {  
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
await sendMessageDpgroup(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
}));
SewQueen['IntroduceCMD']({
        pattern: 'warn ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
                }, 
(async (QueenSew, input) => { 
var grptest = await checkIsGroup(QueenSew);
    if (!grptest) return;
    try {
var us = await checkUsAdmin(QueenSew)
if (!us) return;  
await sendMessageWarnKick(QueenSew, input)
} catch (e) {
await sendMessageError(QueenSew, e)
}
})); 
}


SewQueen['IntroduceCMD']({pattern: 'left', fromMe: true, dontAdCommandList: true, desc: Lang.KICKME_DESC, }, (async (message, match) => {
    if (Details.KICKMEMSG == 'default') { 
        await message.client.sendMessage(message.jid,Lang.KICKME,MessageType.text);
        await message.client.groupLeave(message.jid);
    }
    else {
        await message.client.sendMessage(message.jid,Details.KICKMEMSG,MessageType.text);
        await message.client.groupLeave(message.jid);
    }
}));

SewQueen['IntroduceCMD']({pattern: 'pp', fromMe: true, dontAdCommandList: true, desc: Lang.PP_DESC}, (async (message, match) => {    
    if (!message.reply_message || !message.reply_message.image) return await message.client.sendMessage(message.jid,Lang.NEED_PHOTO, MessageType.text);
    
    var load = await message.client.sendMessage(message.jid,Lang.PPING,MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    await message.client.updateProfilePicture(message.client.user.jid, fs.readFileSync(location));
    await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true})
}));

SewQueen['IntroduceCMD']({pattern: 'block ?(.*)', fromMe: true, dontAdCommandList: true, desc: Lang.BLOCK_DESC}, (async (message, match) => {   
    if (Details.BLOCKMSG == 'default') {  
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
            await message.client.blockUser(message.reply_message.jid, "add");
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.BLOCKED + '!```', MessageType.text, {
                    previewType: 0, contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });
                await message.client.blockUser(user, "add");
            });
        } else if (!message.jid.includes('g.us')) {
            await message.client.sendMessage(message.jid, '*' + Lang.BLOCKED_UPPER + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text);
        }
    }
    else {  
        if (message.reply_message !== false) {
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + Details.BLOCKMSG, MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
            await message.client.blockUser(message.reply_message.jid, "add");
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + Details.BLOCKMSG, MessageType.text, {
                    previewType: 0, contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });
                await message.client.blockUser(user, "add");
            });
        } else if (!message.jid.includes('g.us')) {
            await message.client.sendMessage(message.jid, '*' + Lang.BLOCKED_UPPER + '*', MessageType.text);
            await message.client.blockUser(message.jid, "add");
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text);
        }
    }
}));

SewQueen['IntroduceCMD']({pattern: 'unblock ?(.*)', fromMe: true, dontAdCommandList: true, desc: Lang.UNBLOCK_DESC}, (async (message, match) => { 
    if (Details.UNBLOCKMSG == 'default') { 
   
        if (message.reply_message !== false) {
            await message.client.blockUser(message.reply_message.jid, "remove");
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.blockUser(user, "remove");
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + '```, ' + Lang.UNBLOCKED + '!```', MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else if (!message.jid.includes('g.us')) {
            await message.client.blockUser(message.jid, "remove");
            await message.client.sendMessage(message.jid, '*' + Lang.UNBLOCKED_UPPER + '*', MessageType.text,);
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text,);
        }
    }
    else {
        if (message.reply_message !== false) {
            await message.client.blockUser(message.reply_message.jid, "remove");
            await message.client.sendMessage(message.jid, '@' + message.reply_message.jid.split('@')[0] + Details.UNBLOCKMSG, MessageType.text, {
                quotedMessage: message.reply_message.data, contextInfo: {mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')]}
            });
        } else if (message.mention !== false) {
            message.mention.map(async user => {
                await message.client.blockUser(user, "remove");
                await message.client.sendMessage(message.jid, '@' + user.split('@')[0] + Details.UNBLOCKMSG, MessageType.text, {
                    contextInfo: {mentionedJid: [user.replace('c.us', 's.whatsapp.net')]}
                });    
            });
        } else if (!message.jid.includes('g.us')) {
            await message.client.blockUser(message.jid, "remove");
            await message.client.sendMessage(message.jid, '*' + Lang.UNBLOCKED_UPPER + '*', MessageType.text,);
        } else {
            await message.client.sendMessage(message.jid, '*' + Lang.NEED_USER + '*', MessageType.text,);
        }
    }
}));
SewQueen['IntroduceCMD']({pattern: 'getdp', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
var ppUrl = await message.client.getProfilePicture(message.jid) 
const resim = await axios.get(ppUrl, {responseType: 'arraybuffer'})
    await message.client.updateProfilePicture(message.client.user.jid, Buffer(resim.data));
 }));
SewQueen['IntroduceCMD']({pattern: 'getbio', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
var status = await message.client.getStatus(message.jid) 
await message.client.setStatus(status)
}));
SewQueen['IntroduceCMD']({on: 'text', fromMe: false, dontAdCommandList: true}, (async (message, match) => {
if(Details.VOICE_REPLY == 'true'){if(!!message.mention && message.mention[0] == '94785457519@s.whatsapp.net') {await message.client.sendMessage(message.jid, fs.readFileSync('./VoiceClip/mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})};const array = ['Bye','Hello','Helo','Hey','Hi','Hy','I love you','Marilada','bye','hello','hey','helo','hi','hy','i love you','marilada','sewmaker','bitch','sapak','Sapak','Bich','y ban','Y ban','Y bn','y bn','Why ban','why ban','uddika','Uddika','sindu','Sindu','Seen','seen','Raviya','raviya','notes','Pinnaya','Paraya','Pala','pinnaya','paraya','pala','natanna','Natanna','Natahan','natahan','Nah','nah','na na','Na na','mokek','Mokek','Mk','mk','Kohomd','kohomada','kohomd','Kohomd','hum','Hum','Hmm','hmm','Hako','hako','ha ha','Ha ha','Guti','guti','Gothaya','gothaya','Good night','good night','good morning','Good Morning','Gn','gn','Gm','gm','Gahano','gahano','Gahanawa','gahanawa','Fuck','fuck','Esawa','esawa','Ep wel','ep wel','epa wela','Epa wela','En nane','en nane','Bitch','bich','Bb ek','bb ek','balagena','Balagena','balaganin','Balaganin','baba eka','Baba eka','Adarey','adarey','Adarei','adarei','Akke','akke','Baduwa','baduwa','Balli','balli','Denawada','denawada','Hukanna','hukanna','Hukanni','hukanni','Huththa','huththa','Huththi','huththi','Kariya','kariya','Kellekda','kellekda','Love','love','Namaskaram','namaskaram','Namasthe','namasthe','Namgi','namgi','Pakaya','pakaya','Ponnaya','ponnaya','ponni','Ponni','U girl','u girl','Umma','umma','Ummah','ummah','Ummma','ummma','Vesawi','vesawi','Vesavi','vesavi','Wesi','wesi','You girl','you girl'];array.map( async (a) => {let pattern = new RegExp(`\\b${a}\\b`, 'g');if(pattern.test(message.message)){await message.client.sendMessage(message.jid, fs.readFileSync('./VoiceClip/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})}})}}))

