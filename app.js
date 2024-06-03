const application = {};
const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
  const conn = await MongoClient.connect("mongodb://127.0.0.1:27017/clientesCollection?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6")
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("Studio Dev");
  return global.db;
}
var app = require('./config/server')
const express = require('express');
const app = express();         
const port = 3000; 
app.use(require('cors')());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


	const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));


app.use('/', router);
app.listen(3000, function(){
	console.log("Servidor ON");
});