
const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT);
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    consign({cwd: 'api'})
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
}