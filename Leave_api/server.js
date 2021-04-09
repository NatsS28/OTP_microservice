const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');
app.use(cors());

const mainRoute = require('./router/user');



app.use('/', mainRoute);

const connectDB = async () => {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect('mongodb + srv://otp:otp@otp.n3jhu.mongodb.net/PhoneNumber?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Connection Estabilsed successfully");
    });

}

connectDB();

//mongodb + srv://otp:<password>@otp.n3jhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const PORT = process.env.PORT || 4999;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})