const express = require('express');
const cors = require('cors');
const db = require('./db/db');
const PORT = process.env.PORT || 5000;
const user = require('./routes/user');

const app = express();

app.use(cors())
app.use(express.json());

app.use('/user', user);

app.listen(PORT, (req, res) => {
    console.log(`app is listening to PORT ${5000}`);
});

