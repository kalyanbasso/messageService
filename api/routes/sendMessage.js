module.exports = app => {

    const controller = app.controllers.sendMessage

    app.route('/sendMessage')
        .post(controller.sendMessage)
}