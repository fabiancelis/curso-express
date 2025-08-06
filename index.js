const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const port = 3100;
app.listen(port, () => {
    console.log(`aplicacion escuchando en el puerto ${port}`);
});
