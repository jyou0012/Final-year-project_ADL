import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const database = client.db("TimesheetDashboard");

export const staffCollection = database.collection("staff");

export function StaffDoc({ name, password }) {
  this.name = name;
  this.password = password;
}

export async function getStaff(password) {
  return await staffCollection.findOne({ password: password });
}

(async () => {
  await client.connect();
  await upsertStaff(new StaffDoc({ name: "Cruz", password: "staff123" }));
})();

export async function upsertStaff(staffDoc) {
  await staffCollection.updateOne(
    { name: staffDoc.name },
    {
      $set: {
        name: staffDoc.name,
        password: staffDoc.password,
      },
    },
    { upsert: true },
  );
}
