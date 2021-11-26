
const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();

    // cn = {
    //     'host': 'devweb.chiqahlpkytu.sa-east-1.rds.amazonaws.com',
    //     'port': 5432,
    //     'database': 'postgres',
    //     'user': 'root',
    //     'password': '123456789'
    // };

    // const db = pgp(cn);
    app.set('port', process.env.PORT);
    // app.db = db;
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    consign({cwd: 'api'})
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
}