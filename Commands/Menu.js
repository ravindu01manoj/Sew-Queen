let DataPack = require('sew-queen-pro');

let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let {sendMessageAllMenupv,sendMessageAllMenupb, sendMessageonemenupv,sendMessageonemenupb } = require('sew-queen-pro/sources/dc/cmd/menu')
let WorkType = Details.WORKTYPE == 'public' ? false : true
SewQueen['IntroduceCMD']({
        pattern: 'help ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageAllMenupb(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'help ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenupv(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'list ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageAllMenupb(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'list ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenupv(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'cmd ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageAllMenupb(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'cmd ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenupv(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'මෙනු ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageAllMenupb(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'මෙනු ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenupv(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'menu ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageAllMenupb(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'menu ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenupv(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'letcmd ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageonemenupb(QueenSew,input)
})); 

SewQueen['IntroduceCMD']({
        pattern: 'letcmd ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageonemenupv(QueenSew,input)
})); 
