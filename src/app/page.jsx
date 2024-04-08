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
    // Query for a movie that has the title 'The Room'
    const query = { title: "The Room" };
    const options = {
      // Sort matched documents in descending order by rating
      sort: { "imdb.rating": -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, title: 1, imdb: 1 },
    };
    // Execute query
    const movie = await movies.findOne(query, options);
    // Print the document returned by findOne()
    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

export default function Page() {
  return <p>TODO hello</p>
}