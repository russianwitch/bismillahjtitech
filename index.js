require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const cars = require("cors");
app.use(cars({origin:"*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const apiv1 = require('./api/v1/routing');
app.use('/api/v1', apiv1);

//hostname nya
let hostname;
if (process.env.VCAP_APPLICATION){
    const vcap = JSON.parse(process.env.VCAP_APPLICATION);
    hostname ='https://' + vcap.application_uris[0];
}

else {
    hostname = 'https://localhost:${port}';
}

app.listen(port, function(){
    console.log('Listeningg at port 3000 baby')
}
)

module.exports = app;