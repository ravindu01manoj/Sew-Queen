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

var description = ''
var bit = ''
if (Details.LANG == 'SI') description = 'ස්කන්ධය පරිවර්තනය.', bit = 'දත්ත පරිවර්තනය.'
if (Details.LANG == 'EN') description = 'Converts weight units.', bit = 'Converts data units.'

SewQueen['IntroduceCMD']({pattern: 'unit ?(.*)', fromMe: WorkType, desc: description, usage: 'unit 1 kg mg // unit <number> <unit1> <unit2>'}, (async (message, input) => {
  var splitted_text = input[1].split(' ')
  var auth_messages = await DataPack.unit_message(Details.LANG)
  if (splitted_text.length < 3) {
    return await message.client.sendMessage(message.jid,auth_messages.unsuccess + auth_messages.values, MessageType.text)
  }
  var unitter = await DataPack.unit(splitted_text[0], splitted_text[1], splitted_text[2])
  if (unitter.error) {
    return await message.client.sendMessage(message.jid,auth_messages.unsuccess + auth_messages.values, MessageType.text)
  }
  var string_result = unitter.result.toString()
  var formatter = auth_messages.success.replace('{number}', splitted_text[0]).replace('{unit1}', splitted_text[1]).replace('{unit2}', splitted_text[2]).replace('{result}', string_result)
  await message.client.sendMessage(message.jid, formatter, MessageType.text, { quoted: message.data })
}));
SewQueen['IntroduceCMD']({pattern: 'bitunit ?(.*)', fromMe: WorkType, desc: bit, usage: 'bitunit 1 gb mb // bitunit <number> <unit1> <unit2>'}, (async (message, input) => {
  var splitted_text = input[1].split(' ')
  var auth_messages = await DataPack.unit_byte_msg(Details.LANG)
  if (splitted_text.length < 3) {
    return await message.client.sendMessage(message.jid,auth_messages.unsuccess + auth_messages.values, MessageType.text)
  }
  var unitter = await DataPack.unit_byte(splitted_text[0], splitted_text[1], splitted_text[2])
  if (unitter.error) {
    return await message.client.sendMessage(message.jid,auth_messages.unsuccess + auth_messages.values, MessageType.text)
  }
  var string_result = unitter.result.toString()
  var formatter = auth_messages.success.replace('{number}', splitted_text[0]).replace('{unit1}', splitted_text[1]).replace('{unit2}', splitted_text[2]).replace('{result}', string_result)
  await message.client.sendMessage(message.jid, formatter, MessageType.text, { quoted: message.data })
}));

