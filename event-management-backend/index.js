import 'dotenv/config'
import express from 'express';
import cors from "cors"
import { MongoClient } from 'mongodb';

const client = new MongoClient(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ac-dyizrz2-shard-00-00.khhcdmh.mongodb.net:27017,ac-dyizrz2-shard-00-01.khhcdmh.mongodb.net:27017,ac-dyizrz2-shard-00-02.khhcdmh.mongodb.net:27017/?ssl=true&replicaSet=atlas-ej3urr-shard-0&authSource=admin`);
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  } 
}

connectToMongoDB();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
