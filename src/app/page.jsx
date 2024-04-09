import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
//MONGODB_URI="mongodb+srv://a1847115:Jiayu@cluster0.oneyoul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//const client = new MongoClient("mongodb+srv://a1847115:Jiayu@cluster0.oneyoul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();




//insert
/* async function run() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("MCI2024");
    const timesheet = database.collection("timesheet");
    // Create an array of documents to insert
    const docs = [
      { name: "a18111111", Day: "Monday" , Date: "2024-4-1", Task:"Learn MonongoDB"},
      { name: "a18111112", Day: "Tuesday" , Date: "2024-4-2"},
      { name: "a18111113", Day: "Wednesday" , Date: "2024-4-1", Task:"Learn MonongoDB"},
      { name: "a18111112", Day: "Thursday" , Date: "2024-4-5", Task:"Learn MonongoDB"},
      { name: "a18111115", Day: "Friday" , Date: "2024-4-6", Task:"Learn MonongoDB"},
      { name: "a18111112", Day: "Saturday" , Date: "2024-4-7", Task:"Learn MonongoDB"},
      { name: "a18111116", Day: "Sunday" , Date: "2024-4-3", Task:"Learn MonongoDB3" }
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
run().catch(console.dir); */

// update
/* async function run() {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("MCI2024");
    const timesheet = database.collection("timesheet");
    // Create a filter to update all names with a 'a18111112' rating
    const filter = { name: "a18111112" };
    // Create an update document specifying the change to make
    const updateDoc = {
      $set: {
        Task: `After reviewing I am ${
          100 * Math.random()
        }% more satisfied with process.`,
      },
    };
    // Update the documents that match the specified filter
    const result = await timesheet.updateMany(filter, updateDoc);
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    // Close the database connection on completion or error
    await client.close();
  }
}
run().catch(console.dir);  */

// delete
 async function run() {
    try {
      const database = client.db("MCI2024");
      const timesheet = database.collection("timesheet");
      /* Delete all documents that match the specified regular
      expression in the title field from the "timesheet" collection */
      const query = { Task: { $regex: "After" } };
      const result = await timesheet.deleteMany(query);
      // Print the number of deleted documents
      console.log("Deleted " + result.deletedCount + " documents");
    } finally {
      // Close the connection after the operation completes
      await client.close();
    }
 }
 // Run the program and print any thrown exceptions
 run().catch(console.dir);

export default function Page() {
  return <p>TODO hello</p>
}