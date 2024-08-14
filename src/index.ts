import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { Collection, Document, MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
import 'dotenv/config'
import { basicAuth } from 'hono/basic-auth'

require('dotenv').config()

const app = new Hono();

app.use('*', async (c, next) => {
  c.res.headers.set('Access-Control-Allow-Origin', '*');
  c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  if (c.req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  return next();
});


app.use(
  '/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

const client = new MongoClient(process.env.URI!);

let db;
let imagesCollection: Collection<Document>;

client.connect().then(() => {
  db = client.db('pintrest');
  imagesCollection = db.collection('images');
  console.log('Connected to MongoDB');
});

app.get('/', async (c) => {
  return c.text('hello venky')
})

app.post('/postImage', async (c) => {
  const { title, imageUrl } = await c.req.json();
  const newImage = { title, imageUrl };
  
  await imagesCollection.insertOne(newImage); 
  const images = await imagesCollection.find({}).toArray();
  console.log(images);
  return c.json(images);
});

app.get("/secret/hello", async (c) => {
  return c.text("hello world")
})

app.get('/getImages', async (c) => {
  const images = await imagesCollection.find({}).toArray();
  return c.json(images);
});

app.post('/getImage', async (c) => {
  const { searchTitle } = await c.req.json();
  console.log(searchTitle);
  const searchImage = await imagesCollection.find({
    title: { $regex: searchTitle, $options: 'i' }
  }).toArray();
  return c.json(searchImage);
});

app.delete('/deleteImage/:id', async (c) => {
  const { id } = c.req.param();
  try {
    const result = await imagesCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return c.json({ message: 'No image found with that id' }, 404);
    }
    const images = await imagesCollection.find({}).toArray();
    console.log(images);
    return c.json(images);
  } catch (error) {
    console.error('Error deleting image:', error);
    return c.json({ message: 'Error deleting image' }, 500);
  }
});


console.log("Server is running");

const port = 3000;
serve({
  fetch: app.fetch,
  port
});

export default app;
