const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors({origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const apiV1 = require('./api/v1/routing');
app.use('/api/v1', apiV1);

//get hostname
let hostname;
if (process.env.VCAP_APPLICATION) {
    const vcap = JSON.parse(process.env.VCAP_APPLICATION);
    hostname = 'https://' + vcap.application_uris[0];
} else {
    hostname = 'https://localhost:${port}';
}

app.listen(port, function(){
    console.log('Listening at port 3000')
})

module.exports = app;