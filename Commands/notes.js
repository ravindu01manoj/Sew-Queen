/* 
Sew Queen Whatsapp Bot                       

Telegram: https://t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79
Licensed under the  GPL-3.0 License;

Coded By Ravindu Manoj

*/ 
let {getdatafromSewQueenDatabase} = require('sew-queen-pro/db/main')
let DataPack = require('sew-queen-pro');
let assist = require('sew-queen-pro/msg');
let SewQueen = DataPack.handler
let Details = DataPack.details
let { MessageType} = require('@ravindu01manoj/sew-queen-web');
let DataHelp = DataPack.constdata
let WorkType = Details.WORKTYPE == 'public' ? false : true
let spliter = `
---sew--queen---
`
let DATA = DataHelp.dataGet('notes')
// Notes
SewQueen['IntroduceCMD']({ pattern: 'notes', fromMe: WorkType, desc: DATA.NOTES_USAGE }, async (core, input) => {
var note = getdatafromSewQueenDatabase('notes')
    if (note.includes('no-saved-data')) return await assist.textsend(core,DATA.NO_SAVED)
    await assist.textsend(core,note)
})

//Filters And Autoreply
SewQueen['IntroduceCMD']({on: 'text', fromMe: false}, (async (core, input) => {
let reply = await getdatafromSewQueenDatabase('autoreply')
let filters = reply.split(spliter)[1]
let autoreply = reply.split(spliter)[0]
    if (!filters.includes('no-saved-data')) {
    var filt = filters.split(',')
    filt.map(async (filter) => {
    if(filter) {
        if(filter.includes(core.jid)){
            pattern = new RegExp(filter.split('=-#=')[0].replace(/#-#/g,','));
            if (pattern.test(core.message)) {
                await assist.textreply(core,filter.split('=-#=')[1].replace(/#-#/g,','));
            }
        }}}
    );
}
 if(!autoreply.includes('no-saved-data')) {
var auto = autoreply.split(',')
    auto.map(async (autor) => {
    if(autor) {
            pattern = new RegExp(autor.split('=-#=')[0].replace(/#-#/g,','));
            if (pattern.test(core.message)) {
                await assist.textreply(core,autor.split('=-#=')[1].replace(/#-#/g,','));
            }
        }}
    );
}

}));