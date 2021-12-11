const SESSION_FILE_PATH = "../../session.json";
const fs = require('fs');
const { Client, Location, List, Buttons } = require('whatsapp-web.js');
const service = require("./service.js")

let sessionCfg;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}


var client

const initialize = () => {
    client = new Client({ puppeteer: { headless: false }, session: sessionCfg });

    client.initialize();

    client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        console.log('QR RECEIVED', qr);
    });

    client.on('authenticated', (session) => {
        console.log('AUTHENTICATED', session);
        sessionCfg=session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.error(err);
            }
        });
    });

    client.on('auth_failure', msg => {
        console.log("object");
        // Fired if session restore was unsuccessfull
        console.error('AUTHENTICATION FAILURE', msg);
    });

    client.on('ready', () => {
        console.log('READY');
    });

    client.on('message', async msg => {
        console.log('MESSAGE RECEIVED', msg);

        if(msg.body.toLocaleLowerCase() === 'info cargas'){
            const contact = await msg.getContact();
            const response = await service.getInfo(0, contact.number);
            
            if(response){
                let rascunho = `Cargas:\n${response.nao_iniciado} = Não Iniciada\n` +
                `${response.na_unidade} = Na Unidade\n` +
                `${response.descarga} = Em Descarga\n` +
                `${response.atrasado} = Atrasada\n` +
                `${response.em_andamento} = Em Andamento\n` +
                `${response.finalizado} = Finalizada`
                msg.reply(rascunho);
            }
            
        } else if (msg.body.toLocaleLowerCase() === 'info veiculos') {
            const contact = await msg.getContact();
            const response = await service.getInfo(1, contact.number);
            
            if(response){
                let rascunho = `Veiculos:\n` + 
                `${response.comalerta} = Com Alerta\n` +
                `${response.semcarga} = Sem Carga\n` +
                `${response.emcarga} = Com Carga\n` +
                `${response.offpos} = Sem Posição\n` +
                `${response.offtemp} = Sem Temperatura`
                msg.reply(rascunho);
            }
        } else if (msg.body.toLocaleLowerCase().indexOf("info") !== -1) {
            rascunho = "Info necessita de um parametro\n" +
            "info cargas = informações de cargas\n" +
            "info veiculos = informações de veículos"
            msg.reply(rascunho);
        }
    });

    client.on('message_create', (msg) => {
        // Fired on all message creations, including your own
        if (msg.fromMe) {
            // do stuff here
        }
    });

    client.on('message_revoke_everyone', async (after, before) => {
        // Fired whenever a message is deleted by anyone (including you)
        console.log(after); // message after it was deleted.
        if (before) {
            console.log(before); // message before it was deleted.
        }
    });

    client.on('message_revoke_me', async (msg) => {
        // Fired whenever a message is only deleted in your own view.
        console.log(msg.body); // message before it was deleted.
    });

    client.on('message_ack', (msg, ack) => {
        /*
            == ACK VALUES ==
            ACK_ERROR: -1
            ACK_PENDING: 0
            ACK_SERVER: 1
            ACK_DEVICE: 2
            ACK_READ: 3
            ACK_PLAYED: 4
        */

        if(ack == 3) {
            // The message was read
        }
    });

    client.on('group_join', (notification) => {
        // User has joined or been added to the group.
        console.log('join', notification);
        // notification.reply('User joined.');
    });

    client.on('group_leave', (notification) => {
        // User has left or been kicked from the group.
        console.log('leave', notification);
        // notification.reply('User left.');
    });

    client.on('group_update', (notification) => {
        // Group picture, subject or description has been updated.
        console.log('update', notification);
    });

    client.on('change_battery', (batteryInfo) => {
        // Battery percentage for attached device has changed
        const { battery, plugged } = batteryInfo;
        console.log(`Battery: ${battery}% - Charging? ${plugged}`);
    });

    client.on('change_state', state => {
        console.log('CHANGE STATE', state );
    });

    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
    });
}

const sendMessage = async (number = null, text = null) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`
    const message = text;
    
    client.sendMessage(number, message);
}

module.exports = {
    initialize,
    sendMessage
}