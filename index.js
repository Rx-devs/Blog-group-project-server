const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.dn7ou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('database connected');
        const database = client.db('Tech_blog_db');
        const usersCollection = database.collection('users');
        const allBlogsCollection = database.collection('allblogs');
        const programmingBlogsCollection = database.collection('programmingBlogs');
        const lifestyleBlogsCollection = database.collection('lifestyleBlogs');
        const carrierBlogsCollection = database.collection('carrierBlogs');

        // Load all Blogs
        app.get('/allblogs', async (req, res) => {
            const cursor = allBlogsCollection.find({});
            const allblogs = await cursor.toArray();
            res.send(allblogs);
        });
        // Load all programmingBlogs
        app.get('/programmingBlogs', async (req, res) => {
            const cursor = programmingBlogsCollection.find({});
            const programmingBlogs = await cursor.toArray();
            res.send(programmingBlogs);
        });
        // Load all lifestyleBlogs
        app.get('/lifestyleBlogs', async (req, res) => {
            const cursor = lifestyleBlogsCollection.find({});
            const lifestyleBlogs = await cursor.toArray();
            res.send(lifestyleBlogs);
        });
        // Load all Blogs
        app.get('/carrierBlogs', async (req, res) => {
            const cursor = carrierBlogsCollection.find({});
            const carrierBlogs = await cursor.toArray();
            res.send(carrierBlogs);
        });

        // get a single blog
        app.get('/allblogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await allBlogsCollection.findOne(query);
            res.json(blog);
        });

        // add a single blog
        app.post('/allblogs', async (req, res) => {
            const blog = req.body;
            const result = await allBlogsCollection.insertOne(product);
            res.json(result);
        });
        
        // delete a blog
        app.delete('/allblogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await allBlogsCollection.deleteOne(query);
            res.json(result);
        });

        

    }
    finally {
        // Ensures that the client will close when you finish/error.
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Tech Blogs Website!')
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`);
})