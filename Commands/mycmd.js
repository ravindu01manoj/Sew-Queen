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
let DATA = DataHelp.dataGet('_plugin');
let NDATA = DataHelp.dataGet('updater');
let Heroku = require('heroku-client');
let Db = require('../DataBase/cmd');


let heroku = new Heroku({
    token: Details.HEROKU.API_KEY
});


let baseURI = '/apps/' + Details.HEROKU.APP_NAME;

let msg = Details.LANG == 'SI' || Details.LANG == 'EN' ? 'මෙම කමාන්ඩ් ස්තාපිත කළ හැක ' : '*This cmd is Approved!* ✅'
let unmsg = Details.LANG == 'SI' || Details.LANG == 'EN' ? 'මෙම කමාන්ඩ් ස්තාපිත කල නොහැක ' : '*This cmd is not Approved!* ❌'


SewQueen['IntroduceCMD']({pattern: 'install ?(.*)', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage('Need Cmd Url. And Use => .install url')
    try {
        var url = new URL(match[1]);
    } catch {
        return await message.sendMessage('invalid url.. pleas storeyour code in gits.github.com');
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
            new_commnad = "_____" + new_commnad[1];
        } else {
            new_commnad = "_____" + Math.random().toString(36).substring(8);
        }

        fs.writeFileSync('./Commands/' + new_commnad + '.js', response.body);
        try {
            require('./' + new_commnad);
        } catch (e) {
            fs.unlinkSync('./' + new_commnad);
            return await message.sendMessage('This Cmd has Some Error' + ' ```' + e + '```');
        }

        await Db.installPlugin(url, new_commnad);
        await message.client.sendMessage(message.jid, 'Extrenal Cmd Successfully Installed', MessageType.text);
    }
}));
SewQueen['IntroduceCMD']({pattern: 'mycmd', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
    var mesaj = 'Your All Extrenal CMD\n\n';
    var commandss = await Db.PluginDB.findAll();
    if (commandss.length < 1) {
        return await message.sendMessage('No Any Author Extra Cmd');
    } else {
        commandss.map(
            (command) => {
                mesaj += command.dataValues.name + ': ' + command.dataValues.url + '\n';
            }
        );
        return await message.client.sendMessage(message.jid, mesaj, MessageType.text);
    }
}));
SewQueen['IntroduceCMD']({pattern: 'remove(?: |$)(.*)', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage('need extrenal Cmd');
    if (!match[1].startsWith('_____')) match[1] = '_____' + match[1];
    var command = await Db.PluginDB.findAll({ where: {name: match[1]} });
    if (command.length < 1) {
        return await message.sendMessage(message.jid,'Not Found', MessageType.text);
    } else {
        await command[0].destroy();
        delete require.cache[require.resolve('./' + match[1] + '.js')]
        fs.unlinkSync('./Commands/' + match[1] + '.js');
        await message.client.sendMessage(message.jid, 'Successfully Deleted!', MessageType.text);
        
        await new Promise(r => setTimeout(r, 1000));
    
        await message.sendMessage('Restarting');

        console.log(baseURI);
        await heroku.delete(baseURI + '/dynos').catch(async (error) => {
            await message.sendMessage(error.message);

        });
    }

}));
