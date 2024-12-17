const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile((__dirname, '/public/index.html'));
})

console.log(__dirname + '/public/index.html');

const uri = "mongodb://127.0.0.1:27017";

mongoose.connect(uri, {})
.then(() => {
    console.log("MongoDB connected successfully")})
.catch(err => {console.error("MongoDB connection error:", err)});

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    email: String,
    phone: Number
});

const Data = mongoose.model("Data", dataSchema);

app.post('/submit', (req, res) => {
    const { name, email, phone } = req.body;
    console.log(req.body); // Log the incoming request data
    const newData = new Data({ name, email, phone });
    newData.save()
        .then(() => res.send('Data Submitted'))
        .catch((err) => res.status(500).send('Error saving data: ' + err));
});


app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
})