/* 
Sew Queen Whatsapp Bot                       

Telegram: https://t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79
Licensed under the  GPL-3.0 License;

Coded By Ravindu Manoj
*/ 
let {getdatafromSewQueenDatabase} = require('sew-queen-pro/db/main')
let {sendDataToSewQueenDatabase} = require('sew-queen-pro/db/save')
let DataPack = require('sew-queen-pro');
let assist = require('sew-queen-pro/msg');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let { MessageType } = require('@ravindu01manoj/sew-queen-web');
let fs = require('fs');
let got = require('got');
let Heroku = require('heroku-client');


let heroku = new Heroku({
    token: Details.HEROKU.API_KEY
});


let baseURI = '/apps/' + Details.HEROKU.APP_NAME;

let msg = Details.LANG == 'SI' || Details.LANG == 'EN' ? 'මෙම කමාන්ඩ් ස්තාපිත කළ හැක ' : '*This cmd is Approved!* ✅'
let unmsg = Details.LANG == 'SI' || Details.LANG == 'EN' ? 'මෙම කමාන්ඩ් ස්තාපිත කල නොහැක ' : '*This cmd is not Approved!* ❌'


SewQueen['IntroduceCMD']({
    pattern: 'install ?(.*)',
    fromMe: true,
    dontAdCommandList: true
}, (async (core, input) => {
    if (input[1] === '') return await assist.textsend(core, 'Need Cmd Url. And Use => .install url')
    try {
        var url = new URL(input[1]);
    } catch {
        return await assist.textsend(core, 'invalid url.. please store your code in gits.github.com');
    }
    if (url.host === 'gist.github.com') {
        url.host = 'gist.githubusercontent.com';
        url = url.toString() + '/raw'
    } else {
        url = url.toString()
    }
    var response = await got(url);
    if (response.statusCode == 200) {
        var new_commnad = response.body.match(/IntroduceCMD\({.*pattern: ["'](.*)["'].*}/);
        if (new_commnad.length >= 1) {
            new_commnad = "__" + new_commnad[1];
        } else {
            new_commnad = "__" + Math.random().toString(36).substring(8);
        }

        fs.writeFileSync('./Commands/' + new_commnad + '.js', response.body);
        try {
            require('./' + new_commnad);
        } catch (e) {
            fs.unlinkSync('./Commands/' + new_commnad + '.js');
            return await assist.textsend(core, 'This Cmd has Some Error' + ' ```' + e + '```');
        }
        var cmddata = new_commnad + '/=/' + url
        var cmdbas;
        var test = await getdatafromSewQueenDatabase('commands')
        if (test.includes('no-saved-data-for-commands')) {
            cmdbas = cmddata
        } else {
            cmdbas = test + ',' + cmddata
        }
        await sendDataToSewQueenDatabase('commands', cmdbas)
        return await assist.textsend(core, 'Extrenal Cmd Successfully Installed');
    }
}));
SewQueen['IntroduceCMD']({
    pattern: 'mycmd',
    fromMe: true,
    dontAdCommandList: true
}, (async (core, input) => {
    var msg = 'Your All Extrenal CMD\n\n\n';
    var cmdss = await getdatafromSewQueenDatabase('commands')
    if (cmdss.includes('no-saved-data-for-commands')) return await assist.textsend(core, 'No Any Author Extra Cmd');
    if (!cmdss.includes(',')) return await assist.textsend(core, msg + cmdss.spit('/=/')[0] + ' : ' + cmdss.spit('/=/')[1] + '\n\n');
    var commandss = cmdss.split(',')
    commandss.map(async (command) => {
        if (command) {
            msg += command.spit('/=/')[0] + ' : ' + command.spit('/=/')[1] + '\n\n';
        }
    });
    return await assist.textsend(core, msg);
}));

SewQueen['IntroduceCMD']({
    pattern: 'remove ?(.*)',
    fromMe: true,
    dontAdCommandList: true
}, (async (core, input) => {
    if (input[1] === '') return await assist.textsend(core, 'Need extrenal Cmd');
    if (!input[1].startsWith('__')) input[1] = '__' + input[1];
    var cmdss = await getdatafromSewQueenDatabase('commands')
    if (cmdss.includes('no-saved-data-for-commands')) return await assist.textsend(core, 'Not Found');
    var remcmd, set, data;
    if (!cmdss.includes(',')) {
        if (cmdss.split('/=/')[0] == input[1]) {
            remcmd = 'no-saved-data'
            data = input[1]
        }
    } else {
        var mapcmd = cmdss.split(',')
        mapcmd.map(async (cmdk) => {
            if (cmdk) {
                if (cmdk.split('/=/')[0] == input[1]) {
                    set = cmdk;
                    data = input[1]
                }
            }
        })
    }
    if (set) remcmd = cmdss.replace(set, '')
    await sendDataToSewQueenDatabase('commands', remcmd)
    if (data) {
        delete require.cache[require.resolve('./' + remcmd + '.js')]
        fs.unlinkSync('./Commands/' + remcmd + '.js');
        await assist.textsend(core, 'Successfully Deleted!');
        await new Promise(r => setTimeout(r, 1000));
        await assist.textsend(core, 'Restarting');
        console.log(baseURI);
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await assist.textsend(core, error.message);
        });
    }

}));