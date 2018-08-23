const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const DATABASE_NAME = 'devnotes'
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DATABASE_NAME}`;
const APP_PORT = process.env.PORT || 3000

const app = express();

app.use(express.static('client/build'));

let notes = null;
async function startDbAndServer() {
  const db = await mongodb.connect(MONGODB_URI);
  notes = db.collection('notes')

  await app.listen(APP_PORT);
  console.log('server started')
  console.log('Listening on port ' + APP_PORT);
};

startDbAndServer();

////////////////////////////////////////////////////////////////////////////////
/*
async function onLoadAll(req, res) {
  console.log("onLoadAll()");
  const result = await notes.find().toArray();
  res.json(result);
}
app.get("/loadAll", onLoadAll);
*/
async function onLoad(req, res) {
  console.log("onLoad()");
  console.log("date:" + req.params.date);
  const query = { date: req.params.date };
  const result = await notes.findOne(query);
  res.json(result);
}
app.get("/load/:date", onLoad);

async function onSave(req, res) {
  console.log("onSave()");
  const query = { date: req.body.date };
  const newDoc = {
    date: req.body.date,
    entry: req.body.entry
  };
  const params = { upsert: true };
  const result = await notes.update(query, newDoc, params);
  res.json(result);
}
app.post("/save", bodyParser.json(), onSave);
