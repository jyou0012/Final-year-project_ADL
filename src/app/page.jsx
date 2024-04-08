import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
//MONGODB_URI="mongodb+srv://a1847115:Jiayu@cluster0.oneyoul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient("mongodb+srv://a1847115:Jiayu@cluster0.oneyoul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
await client.connect();




 
async function run() {
  try {
    
    // Get the database and collection on which to run the operation
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // Query for movies that have a runtime less than 15 minutes
    const query = { runtime: { $lt: 15 } };
    const options = {
      // Sort returned documents in ascending order by title (A->Z)
      sort: { title: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    // Execute query 
    const cursor = movies.find(query, options);
    // Print a message if no documents were found
    if ((await movies.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    // Print returned documents
    for await (const doc of cursor) {
      console.dir(doc);
    }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

export default function Page() {
  return <p>TODO hello</p>
}