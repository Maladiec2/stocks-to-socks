const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.options('*', cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const currenciesRouter = require('./routes/currencies');
const userLogsRouter = require('./routes/userLogs');
const userRouter = require('./routes/users');

app.use('/currencies', currenciesRouter);
app.use('/userLogs', userLogsRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});

require('./api/dataReciever');