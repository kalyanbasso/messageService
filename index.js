require('dotenv/config')
const client = require("./api/services/client").initialize();
const app = require('./config/express')();
const port = app.get('port')

app.listen(port, () => {
    console.log(`Server port ${port}`);
});