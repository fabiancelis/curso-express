const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');
const serviceAccount = require('./firebase.config.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

module.exports = { firebase };

const port = 3100;
app.listen(port, () => {
    console.log(`aplicacion escuchando en el puerto ${port}`);
});

// sendMessage();

async function sendMessage(titulo, cuerpo) {
    let message = {
        token: 'dMym-B8zqs8HNSfrLo-KrU:APA91bFxRdKsMsJ1IL4aXiliDPXVmcswm8F-L5b53EA19nw_N9BkoSzW1CQWs9b70rauD2uXhDvhgO_5jkL91Izr7fSp-nipm-OOyCNgw2RuPuP80CJ6Q1vWGKeQyxfWyHpaZBLKrzgj',
        notification: {
            title: titulo,
            body: cuerpo
        }
    };
    
    try {
        
        const response = await firebase.messaging().send(message);
        console.log('Mensaje enviado', response);
        return response;
    } catch (error) {
        console.log('El mensaje no pudo ser enviado', error);
    }
}

app.post('/sendMsg', (req, res) => {
    sendMessage(req.body.titulo, req.body.cuerpo);
    res.send({res: 'Mensaje enviado con exito'});
});