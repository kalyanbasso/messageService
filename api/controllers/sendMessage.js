const client = require("../services/client");
const telegram = require("../services/telegram")
module.exports = app => {
    const controller = {}

    controller.sendMessageWhatsapp = function(req, res) {
        var {number, message} = req.body;
        number = number.replace(/\D/g,'');

        if(number.length === 12){
            client.sendMessage(number, message)
            res.status(200).json({msg: "ok"});
        } else {
            res.status(500).json({msg: "Erro: número inválido"});
        }
        
    }

    controller.sendMessageTelegram = function(req, res) {
        console.log(req.body);
        var {chatId, message} = req.body;
        telegram.sendMessage(chatId, message)
        res.status(200).json({msg: "ok"});
    }

    return controller
}