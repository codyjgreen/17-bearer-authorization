'use strict'; 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes');


app.use(bodyParser.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
