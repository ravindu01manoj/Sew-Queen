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
const { DataTypes } = require('sequelize');

const FiltersDB = Details.DATABASE.define('filter', {
    chat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pattern: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    regex: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false
    }
});

async function getFilter(jid = null, filter = null) {
    var Wher = {chat: jid};
    if (filter !== null) Wher.push({pattern: filter});
    var Msg = await FiltersDB.findAll({
        where: Wher
    });

    if (Msg.length < 1) {
        return false;
    } else {
        return Msg;
    }
}


async function setFilter(jid = null, filter = null, tex = null, regx = false) {
    var Msg = await FiltersDB.findAll({
        where: {
            chat: jid,
            pattern: filter
        }
    });

    if (Msg.length < 1) {
        return await FiltersDB.create({ chat: jid, pattern: filter, text: tex, regex: regx });
    } else {
        return await Msg[0].update({ chat: jid, pattern: filter, text: tex, regex: regx });
    }
}

async function deleteFilter(jid = null, filter) {
    var Msg = await FiltersDB.findAll({
        where: {
            chat: jid,
            pattern: filter
        }
    });
    if (Msg.length < 1) {
        return false;
    } else {
        return await Msg[0].destroy();
    }
}

module.exports = {
    FiltersDB: FiltersDB,
    getFilter: getFilter,
    setFilter: setFilter,
    deleteFilter: deleteFilter
};
