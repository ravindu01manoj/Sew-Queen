let {sendDataToSewQueenDatabase} = require('sew-queen-pro/db/save')
le {FindSewQueenDatabase} = require('sew-queen-pro/db/database')
let {sendMessagesavedb} = require('sew-queen-pro/db/list')
let DataPack = require('sew-queen-pro');
let assist = require('sew-queen-pro/msg');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let {SetUPImageInSEWQUEEN} = require('sew-queen-pro/sources/dc/cmd/setimg')
let Details = require('sew-queen-pro/sources/dc/Details');
let { MessageType} = require('@ravindu01manoj/sew-queen-web');
let Db = require("../DataBase/db");

SewQueen['IntroduceCMD']({
    pattern: 'save ?(.*)',
    fromMe: true,
    dontAdCommandList: true
}, async (core, input) => {
    if (Db.MONGOURI) {
        if (core.reply_message.image) {
            await SetUPImageInSEWQUEEN(core, input)
        } else if (core.reply_message.text) {
            if (!core.reply_message.text.includes(' ') && (core.reply_message.text.includes('.jpg') || core.reply_message.text.includes('.png')) && core.reply_message.text.includes('https')) {
                await sendMessagesavedb(core, 'image', core.reply_message.text)
            } else if (input[1]) {
                await sendMessagesavedb(core, 'filter', input[1] + '=-#=' + core.reply_message.text + '=-#=' + core.jid)
            } else if (core.reply_message.text.includes('g.us') && !core.reply_message.text.includes(' ')) {
                await sendMessagesavedb(core, 'gjid', '' + core.reply_message.text)
            } else if (core.reply_message.text.includes('s.whatsapp.net') && !core.reply_message.text.includes(' ')) {
                await sendMessagesavedb(core, 'jids', '' + core.reply_message.text)
            } else {
                await sendMessagesavedb(core, 'msg', core.reply_message.text)
            }
        } else if (input[1] == '') {
            if (core.jid.includes('g.us')) {
                await sendMessagesavedb(core, 'gjid', '' + core.jid)
            } else if (core.jid.includes('s.whatsapp.net')) {
                await sendMessagesavedb(core, 'jids', '' + core.jid)
            }
        } else if (input[1].includes('g.us') && !input[1].includes(' ')) {
            await sendMessagesavedb(core, 'gjid', input[1])
        } else if (input[1].includes('s.whatsapp.net') && !input[1].includes(' ')) {
            await sendMessagesavedb(core, 'jids', input[1])
        } else {
            await sendMessagesavedb(core, 'helpsave', input[1])
        }
    } else {
        return await assist.textreply(core, '*You are not a registered user of Sew Queen ... Please use .register or .login*')
    }
})

SewQueen['IntroduceCMD']({
    pattern: 'erase ?(.*)',
    fromMe: true,
    dontAdCommandList: true
}, async (core, input) => {
    if (Db.MONGOURI) {
        await sendMessagesavedb(core, 'delete', 'no-saved-data', input[1])
    } else {
        return await assist.textreply(core, '*You are not a registered user of Sew Queen ... Please use .register or .login*')
    }
})
SewQueen['IntroduceCMD']({
    pattern: 'dbsave ?(.*)',
    fromMe: true,
    dontAdCommandList: true
}, async (core, input) => {
    if (Db.MONGOURI) {
        if (input[1] == '' || !input[1].includes('/-/')) return;
        var string, data, lastdata, setd, lstrs;
        string = input[1].split('/-/')[0];
        data = input[1].split('/-/')[1]


        if (string == 'saveabout') return await assist.textreply(core, data)


        if (string == 'notes' || string == 'Filter' || string == 'AutoReply' || string == 'GoobByeJid' || string == 'WelcomeJid' || string == 'BlockChat' || string == 'Owners') {
            var result = await FindSewQueenDatabase()
            if (result.status == '403') return await assist.textreply(core, 'Login fail\nYour Database Url Is Not valid\nPlease Renew Your Database Url.. Use .register mongodb url')
            if (data == 'no-saved-data') {
                if (string == 'notes') {
                    lastdata = data
                } else if (string == 'GoobByeJid') {
                    if (result.GoobByeJid) {
                        lastdata = result.GoobByeJid('' + core.jid, '')
                    }
                } else if (string == 'WelcomeJid') {
                    if (result.WelcomeJid) {
                        lastdata = result.WelcomeJid('' + core.jid, '')
                    }
                } else if (string == 'BlockChat') {
                    if (result.BlockChat) {
                        lastdata = result.BlockChat('' + core.jid, '')
                    }
                } else if (string == 'Owners') {
                    if (result.GoobByeJid) {
                        lastdata = result.GoobByeJid('' + core.jid, '')
                    }
                } else if (string == 'Filter') {
                    if (result.Filter == '' || result.Filter.includes('no-saved-data')) {
                        lastdata = '';
                    } else {
                        var filtz = result.split(',')
                        filtz.map(async filt => {
                            if (filt.split('=-#=')[0] == input[1].split('/-/')[2] && filt.includes(core.jid)) {
                                setd = filt
                            }
                        })
                        if (setd) {
                            lastdata = result.Filter.replace(setd, '')
                        }
                    }
                } else if (string == 'AutoReply') {
                    if (result.AutoReply == '' || result.AutoReply.includes('no-saved-data')) {
                        lastdata = '';
                    } else {
                        var filtk = result.split(',')
                        filtk.map(async filt => {
                            if (filt.split('=-#=')[0] == input[1].split('/-/')[2]) {
                                setd = filt
                            }
                        })
                        if (setd) {
                            lastdata = result.AutoReply.replace(setd, '')
                        }
                    }
                }

            } else {
                if (string == 'notes') {
                    if (result.notes == '' || result.notes.includes('no-saved-data')) {
                        lastdata = data
                    } else {
                        lastdata = result.notes + '\n\n' + data
                    }

                } else if (string == 'Filter') {
                    if (result.Filter == '' || result.Filter.includes('no-saved-data')) {
                        lastdata = data.replace(/,/g, '#-#') + ','
                    } else {
                        var filtd = result.split(',')
                        filtd.map(async filt => {
                            if (filt.split('=-#=')[0] == data.replace(/,/g, '#-#').split('=-#=')[0] && filt.includes(core.jid)) {
                                setd = filt
                            }
                        })
                        if (setd) {
                            lastdata = result.Filter.replace(setd, data.replace(/,/g, '#-#'))
                        } else {
                            lastdata = result.Filter + ',' + data.replace(/,/g, '#-#')
                        }
                    }
                } else if (string == 'AutoReply') {
                    if (result.AutoReply == '' || result.AutoReply.includes('no-saved-data')) {
                        lastdata = data.replace(/,/g, '#-#').replace('=-#=' + core.jid, '') + ','
                    } else {
                        var filtk = result.split(',')
                        filtk.map(async filt => {
                            if (filt.split('=-#=')[0] == data.replace(/,/g, '#-#').split('=-#=')[0]) {
                                setd = filt
                            }
                        })
                        if (setd) {
                            lastdata = result.AutoReply.replace(setd, data.replace(/,/g, '#-#').replace('=-#=' + core.jid, ''))
                        } else {
                            lastdata = result.AutoReply + ',' + data.replace(/,/g, '#-#').replace('=-#=' + core.jid, '')
                        }
                    }
                } else if (string == 'GoobByeJid') {
                    if (result.GoobByeJid == '' || result.GoobByeJid.includes('no-saved-data')) {
                        lastdata = data
                    } else {
                        if (!result.GoobByeJid.includes(data)) {
                            lastdata = result.GoobByeJid + data
                        }
                    }
                } else if (string == 'WelcomeJid') {
                    if (result.WelcomeJid == '' || result.WelcomeJid.includes('no-saved-data')) {
                        lastdata = data
                    } else {
                        if (!result.WelcomeJid.includes(data)) {
                            lastdata = result.WelcomeJid + data
                        }
                    }
                } else if (string == 'BlockChat') {
                    if (result.BlockChat == '' || result.BlockChat.includes('no-saved-data')) {
                        lastdata = data
                    } else {
                        if (!result.BlockChat.includes(data)) {
                            lastdata = result.BlockChat + data
                        }
                    }
                } else if (string == 'Owners') {
                    if (result.Owners == '' || result.Owners.includes('no-saved-data')) {
                        lastdata = data
                    } else {
                        if (!result.Owners.includes(data)) {
                            lastdata = result.Owners + data
                        }
                    }
                }
            }
        } else {
            lastdata = data
        }
        if (lastdata) {
            lstrs = await sendDataToSewQueenDatabase(string, lastdata)
            if (lstrs.status == '403') return await assist.textreply(core, 'Login fail\nYour Database Url Is Not valid\nPlease Renew Your Database Url.. Use .register mongodb url')
        }
        return await assist.textreply(core, 'Data Was Successfully Updated')
    } else {
        return await assist.textreply(core, '*You are not a registered user of Sew Queen ... Please use .register or .login*')
    }
})