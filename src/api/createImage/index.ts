import { Hono } from 'hono';
import { Collection, Document, MongoClient } from 'mongodb';
import 'dotenv/config'
require('dotenv').config()


const createImage = new Hono();

const client = new MongoClient(process.env.URI!);

let db;
let imagesCollection: Collection<Document>;

client.connect().then(() => {
  db = client.db('pintrest');
  imagesCollection = db.collection('images');
  console.log('Connected to MongoDB');
});


createImage.post('/create/Image', async (c) => {
    const { title, imageUrl } = await c.req.json();
    const newImage = { title, imageUrl };
    
    await imagesCollection.insertOne(newImage); 
    const images = await imagesCollection.find({}).toArray();
    console.log(images);
    return c.json(images);
  });

export default createImage;