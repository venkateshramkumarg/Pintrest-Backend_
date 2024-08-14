import { Hono } from 'hono';
import { Collection, Document, MongoClient } from 'mongodb';
import 'dotenv/config'
require('dotenv').config()


const getImage = new Hono();

const client = new MongoClient(process.env.URI!);

let db;
let imagesCollection: Collection<Document>;

client.connect().then(() => {
  db = client.db('pintrest');
  imagesCollection = db.collection('images');
  console.log('Connected to MongoDB');
});

getImage.get('/images', async (c) => {
    const images = await imagesCollection.find({}).toArray();
    return c.json(images);
  });
  
  
  getImage.post('/search/image', async (c) => {
    const { searchTitle } = await c.req.json();
    const searchImage = await imagesCollection.find({
      title: { $regex: searchTitle, $options: 'i' }
    }).toArray();
    return c.json(searchImage);
  });

  export default getImage;