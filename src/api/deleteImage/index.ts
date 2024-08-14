import { Hono } from 'hono';
import { Collection, Document, MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
require('dotenv').config()


const deleteImage = new Hono();

const client = new MongoClient(process.env.URI!);

let db;
let imagesCollection: Collection<Document>;

client.connect().then(() => {
  db = client.db('pintrest');
  imagesCollection = db.collection('images');
  console.log('Connected to MongoDB');
});



deleteImage.delete('/delete/image/:id', async (c) => {
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

  export default deleteImage;