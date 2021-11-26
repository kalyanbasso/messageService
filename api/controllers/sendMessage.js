const client = require("../services/client")
module.exports = app => {
    const controller = {}

    controller.sendMessage = function(req, res) {
        console.log(req.body);
        var {number, message} = req.body;
        number = number.replace(/\D/g,'');
        if(number.length === 12){
            client.sendMessage(number, message)
            res.status(200).json({msg: "ok"});
        } else {
            res.status(500).json({msg: "Erro: número inválido"});
        }
        
    }

    return controller
}