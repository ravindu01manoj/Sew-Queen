let DataPack = require('sew-queen-pro');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let {sendMessageAllMenu,sendMessageonemenu} = require('sew-queen-pro/sources/dc/cmd/menu')
let WorkType = Details.WORKTYPE == 'public' ? false : true

SewQueen['IntroduceCMD']({
        pattern: 'help ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageAllMenu(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'help ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenu(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'menu ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenu(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'list ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenu(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'cmd ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenu(QueenSew,input)
})); 

SewQueen['IntroduceCMD']({
        pattern: 'SEW ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenu(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'මෙනු ?(.*)', 
        fromMe: WorkType, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageAllMenu(QueenSew,input)
})); 
SewQueen['IntroduceCMD']({
        pattern: 'letcmd ?(.*)', 
        fromMe: false, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
 if(Details.WORKTYPE !== 'public') return;
await sendMessageonemenu(QueenSew,input)
})); 

SewQueen['IntroduceCMD']({
        pattern: 'letcmd ?(.*)', 
        fromMe: true, 
        dontAdCommandList: true,
        }, 
(async (QueenSew,input) => { 
await sendMessageonemenu(QueenSew,input)
})); 
