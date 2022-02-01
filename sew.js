/*Sew Queen Whatsapp Bot    

Telegram: https://t.me/RavinduManoj
Facebook: https://www.facebook.com/ravindu.manoj.79
Licensed under the  GPL-3.0 License
Coded By Ravindu Manoj
*/
let DataPack = require('sew-queen-pro/export/output');
let SewQueen = require('sew-queen-pro/sources/dc/handler');
let Details = require('sew-queen-pro/sources/dc/Details');
let GBLACK =require('blocked-s/grp')
let SOL =require('sew-queen-pro/console')
let {CheckUpdatesWeb, sendMessageownerMSG, sendMessageADSMSG, sendMessageBotOn, sendMessageGreetingMSG, sendMessageMSGMSG, sendMessageBlackListMSG, sendMessageBIOMSG} = require('sew-queen-pro/sources/dc/sew')
let fs = require('fs'); let os = require('os'); let got = require('got'); let path = require("path"); let chalk = require('chalk');
let SQQA = require('./SQ-QA')
let {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@ravindu01manoj/sew-queen-web');  
let {Message, StringSession, Image, Video} =  require('sew-queen-pro/sources/dc/Wa-Base/');
let { DataTypes } = require('sequelize'); let { getMessage } = require("./DataBase/greetings");
let Heroku = require('heroku-client'); let simpleGit = require('simple-git'); let git = simpleGit();
let heroku = new Heroku({ token: Details.HEROKU.API_KEY}); let baseURI = '/apps/' + Details.HEROKU.APP_NAME;
fs.readdirSync('./DataBase/').forEach(cmdall => { if (path.extname(cmdall).toLowerCase() == '.js') {
                require('./DataBase/' + cmdall)
}})
let Commandsdb = require('./DataBase/cmd');
String.prototype.format = function () {
        var i = 0,
                args = arguments;
        return this.replace(/{}/g, function () {
                return typeof args[i] != 'undefined' ? args[i++] : '';
        })
};
if (!Date.now) {
        Date.now = function () {
                return new Date().getTime();
        }
}
Array.prototype.remove = function () {
        var what, a = arguments,
                L = a.length,
                ax;
        while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                        this.splice(ax, 1);
                }
        }
        return this;
};
async function sewQueen() {
        const CheckWebUpdate = await CheckUpdatesWeb()
        await Details.DATABASE.sync();
        const DataKey = new WAConnection();
        DataKey.version = CheckWebUpdate;
        let Session = new StringSession();
        await sendMessageownerMSG(DataKey); await sendMessageADSMSG(DataKey)
        DataKey.logger.level = Details.DEBUG ? 'debug' : 'warn';
        if (Details.SESSION) {DataKey.loadAuthInfo(Session.deCrypt(Details.SESSION));
        } else { console.log('Need SEW_QUEEN_SESSION \n'.repeat(50));return;}
        DataKey.on('credentials-updated', async () => {
                let authInfo = DataKey.base64EncodedAuthInfo();
        })
        DataKey.on('connecting', async () => {
                console.log(SOL.LOGING);
        });
        DataKey.on('open', async () => {
                console.log(SOL.LOG); console.log(SOL.PASSC);
                if (Details.SEWRR == 'raviya') {
                        console.log(SOL.PASSD)
                } else if (Details.SEWRR !== 'raviya') {
                        throw new Error(SOL.PASSW); return;
                }
            console.log(SOL.INSTCL); console.log(SOL.INSTC); console.log(SOL.INSTL);
                var Commands = await Commandsdb.PluginDB.findAll();
                Commands.map(async (allcmd) => {
                        if (!fs.existsSync('./Commands/' + allcmd.dataValues.name + '.js')) {
                                console.log(allcmd.dataValues.name);
                                var response = await got(allcmd.dataValues.url);
                                if (response.statusCode == 200) {
                                        fs.writeFileSync('./Commands/' + allcmd.dataValues.name + '.js', response.body);
                                        require('./Commands/' + allcmd.dataValues.name + '.js');
                                }
                        }
                });
   
                fs.readdirSync('./Commands').forEach(allcmd => { if (path.extname(allcmd).toLowerCase() == '.js') {
                                require('./Commands/' + allcmd);
                }});
                console.log(SOL.COUNTY); console.log(SOL.TYPEW); //  await sendMessageBIOMSG(DataKey);
                await sendMessageBotOn(DataKey)})
        DataKey.on('chat-update', async m => {
                if (!m.hasNewMessage) return;
                if (!m.messages && !m.count) return;
                let msg = m.messages.all()[0];
                if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
                if (Details.NO_ONLINE) { await DataKey.updatePresence(msg.key.remoteJid, Presence.unavailable)}
                await sendMessageGreetingMSG(DataKey, getMessage, msg)
                if (GBLACK.ALL_GROUP !== 'raviya') {     
                var grp = GBLACK.ALL_GROUP + ',' + Details.BLOCKCHAT;var sup = grp.split(',')
                if(msg.key.remoteJid.includes('g.us') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return}
                await sendMessageMSGMSG(DataKey, msg, 'sew', SQQA)
                });
        try {
        await DataKey.connect();
    } catch {return;}};
    sewQueen()
