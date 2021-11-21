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

let Heroku = require('heroku-client');
let {secondsToHms} = require('./afk');
let sql = require('../DataBase/greetings');
let DATA = DataHelp.dataGet('heroku');
let Langr = DataHelp.dataGet('lydia');

let heroku = new Heroku({
    token: Details.HEROKU.API_KEY
});


let baseURI = '/apps/' + Details.HEROKU.APP_NAME;

SewQueen['IntroduceCMD']({pattern: 'restart$', fromMe: true, desc: DATA.RESTART_DESC}, (async (message, input) => {

    await message.client.sendMessage(message.jid,DATA.RESTART_MSG, MessageType.text);
    console.log(baseURI);
    await heroku.delete(baseURI + '/dynos').catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

SewQueen['IntroduceCMD']({pattern: 'shutdown$', fromMe: true, desc: DATA.SHUTDOWN_DESC}, (async(message, input) => {

    await heroku.get(baseURI + '/formation').then(async (formation) => {
        forID = formation[0].id;
        await message.client.sendMessage(message.jid,DATA.SHUTDOWN_MSG, MessageType.text);
        await heroku.patch(baseURI + '/formation/' + forID, {
            body: {
                quantity: 0
            }
        });
    }).catch(async (err) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

    SewQueen['IntroduceCMD']({pattern: 'dyno$', fromMe: true, desc: DATA.DYNO_DESC}, (async (message, input) => {

        heroku.get('/account').then(async (account) => {
            // have encountered some issues while calling this API via heroku-client
            // so let's do it manually
            url = "https://api.heroku.com/accounts/" + account.id + "/actions/get-quota"
            headers = {
                "User-Agent": "Chrome/80.0.3987.149 Mobile Safari/537.36",
                "Authorization": "Bearer " + Details.HEROKU.API_KEY,
                "Accept": "application/vnd.heroku+json; version=3.account-quotas",
            }
            await got(url, {headers: headers}).then(async (res) => {
               let resp = JSON.parse(res.body);
               total_quota = Math.floor(resp.account_quota);
               quota_used = Math.floor(resp.quota_used);         
               percentage = Math.round((quota_used / total_quota) * 100);
               remaining = total_quota - quota_used;
               await message.client.sendMessage(
                    message.jid,
                    DATA.DYNO_TOTAL + ": ```{}```\n\n".format(secondsToHms(total_quota))  + 
                    DATA.DYNO_USED + ": ```{}```\n".format(secondsToHms(quota_used)) +  
                    DATA.PERCENTAGE + ": ```{}```\n\n".format(percentage) +
                    DATA.DYNO_LEFT + ": ```{}```\n".format(secondsToHms(remaining)),
                    MessageType.text
               );
            }).catch(async (err) => {
                await message.client.sendMessage(message.jid,err.message, MessageType.text);     
            });        
        });
    }));

SewQueen['IntroduceCMD']({pattern: 'setvar ?(.*)', fromMe: true, desc: DATA.SETVAR_DESC}, (async(message, input) => {

    if (input[1] === '') return await message.client.sendMessage(message.jid,DATA.KEY_VAL_MISSING, MessageType.text);

    
    // ================================================== END CONFIG SCANNER ==================================================

    if ((varKey = input[1].split(':')[0]) && (varValue = input[1].split(':')[1])) {
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,DATA.SET_SUCCESS.format(varKey, varValue), MessageType.text);
        });
    } else {
        await message.client.sendMessage(message.jid,DATA.INVALID, MessageType.text);
    }
}));
SewQueen['IntroduceCMD']({pattern: 'var ?(.*)', fromMe: true, desc: DATA.SETVAR_DESC}, (async(message, input) => {

    if (input[1] === '') return await message.client.sendMessage(message.jid,DATA.KEY_VAL_MISSING, MessageType.text);

if ((varKey = input[1].split(':')[0]) && (varValue = input[1].split(':')[1])) {
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,DATA.SET_SUCCESS.format(varKey, varValue), MessageType.text);
        });
    } else {
        await message.client.sendMessage(message.jid,DATA.INVALID, MessageType.text);
    }
}));


SewQueen['IntroduceCMD']({pattern: 'delvar ?(.*)', fromMe: true, desc: DATA.DELVAR_DESC}, (async (message, input) => {

    if (input[1] === '') return await message.client.sendMessage(message.jid,DATA.KEY_VAL_MISSING, MessageType.text);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        key = input[1].trim();
        for (vr in vars) {
            if (key == vr) {
                await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        [key]: null
                    }
                });
                return await message.client.sendMessage(message.jid,DATA.DEL_SUCCESS.format(key), MessageType.text);
            }
        }
        await message.client.sendMessage(message.jid,DATA.NOT_FOUND, MessageType.text);
    }).catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });

}));

SewQueen['IntroduceCMD']({pattern: 'getvar ?(.*)', fromMe: true, desc: DATA.GETVAR_DESC}, (async (message, input) => {

    if (input[1] === '') return await message.client.sendMessage(message.jid,DATA.KEY_VAL_MISSING, MessageType.text);
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        for (vr in vars) {
            if (input[1].trim() == vr) return await message.sendMessage("```{} - {}```".format(vr, vars[vr]));
        }
        await message.client.sendMessage(message.jid,DATA.NOT_FOUND, MessageType.text);
    }).catch(async (error) => {
        await message.client.sendMessage(message.jid,error.message, MessageType.text);
    });
}));

SewQueen['IntroduceCMD']({pattern: 'conimg ?(.*)', fromMe: true, dontAdCommandList: true}, (async(message, input) => {
    if (input[1] === '') return
if (input[1].includes('/-/')) {
let gggs = input[1].split('/-/')[0]
let gggr = input[1].split('/-/')[1]
 if(gggr == 'alive') {
const varKey = 'ALIVE_LOGO'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
       
 if(gggr == 'main') {
const varKey = 'MAIN_LOGO'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
       
       
 if(gggr == 'well') {
const varKey = 'Y_WELLCOME'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
 if(gggr == 'gbye') {
const varKey = 'Y_GOODBYE'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
       
 if(gggr == 'video') {
const varKey = 'IMAGE_YTV'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
       
 if(gggr == 'song') {
const varKey = 'IMAGE_SONG'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
       
 if(gggr == 'fb') {
const varKey = 'IMAGE_FB'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
        
        
 if(gggr == 'tiktok') {
const varKey = 'IMAGE_TIKTOK'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }
       
 if(gggr == 'warn') {
const varKey = 'IMAGE_WARN'
const varValue = gggs
        await heroku.patch(baseURI + '/config-vars', {
            body: {
                [varKey]: varValue
            }
        }).then(async (app) => {
            await message.client.sendMessage(message.jid,'Image Successful Changed Please Wait 30 sec For Restart', MessageType.text);
        });
        
       }}
}));
