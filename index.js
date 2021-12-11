require('dotenv/config')
require("./api/services/client").initialize();
require("./api/services/telegram").initialize();
const app = require('./config/express')();
const port = app.get('port')


app.listen(port, () => {
    console.log(`Server port ${port}`);
});