const TelegramBot = require("node-telegram-bot-api")
const service = require("./service");

const token = process.env.TELEGRAM;

const bot = new TelegramBot(token, {polling:true})


const initialize = () => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id
        let response = ""
        let rascunho = "";
        
        if(msg.text.toLocaleLowerCase() === "info cargas"){
            response = await service.getInfo(0, chatId);

            rascunho = `Cargas:\n${response.nao_iniciado} = Não Iniciada\n` +
                `${response.na_unidade} = Na Unidade\n` +
                `${response.descarga} = Em Descarga\n` +
                `${response.atrasado} = Atrasada\n` +
                `${response.em_andamento} = Em Andamento\n` +
                `${response.finalizado} = Finalizada`;
                
            bot.sendMessage(chatId, rascunho);

        }else if (msg.text.toLocaleLowerCase() === "info veiculos"){
            response = await service.getInfo(1, chatId);

            rascunho = `Veiculos:\n` + 
                `${response.comalerta} = Com Alerta\n` +
                `${response.semcarga} = Sem Carga\n` +
                `${response.emcarga} = Com Carga\n` +
                `${response.offpos} = Sem Posição\n` +
                `${response.offtemp} = Sem Temperatura`;

            bot.sendMessage(chatId, rascunho);

        }else if(msg.text.toLocaleLowerCase().indexOf("info") !== -1){

            rascunho = "Info necessita de um parametro\n" +
            "info cargas = informações de cargas\n" +
            "info veiculos = informações de veículos";
            
            bot.sendMessage(chatId, rascunho);
        }
        
        return true;
    })
}

const sendMessage = async (chatId = null, text = null) => {
    bot.sendMessage(chatId, text);
}



module.exports = {
    initialize,
    sendMessage
}