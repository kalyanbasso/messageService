module.exports = app => {

    const controller = app.controllers.sendMessage

    app.route('/sendMessageWhatsapp')
        .post(controller.sendMessageWhatsapp)

    app.route('/sendMessageTelegram')
        .post(controller.sendMessageTelegram)
}