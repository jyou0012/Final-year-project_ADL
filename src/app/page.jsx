import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
//MONGODB_URI="mongodb+srv://a1847115:Jiayu@cluster0.oneyoul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient("mongodb+srv://a1847115:Jiayu@cluster0.oneyoul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
await client.connect();




 
async function run() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("MCI2024");
    const timesheet = database.collection("timesheet");
    // Create an array of documents to insert
    const docs = [
      { name: "a18111111", Day: "Monday" , Date: "2024-4-1", Task:"Learn MonongoDB"},
      { name: "a18111112", Day: "Monday" , Date: "2024-4-2"},
      { name: "a18111113", Day: "Monday" , Date: "2024-4-3", Task:"Learn MonongoDB3" }
    ];
    // Prevent additional documents from being inserted if one fails
    const options = { ordered: true };
    // Execute insert operation
    const result = await timesheet.insertMany(docs, options);
   
    // Print result
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

export default function Page() {
  return <p>TODO hello</p>
}