"use server"

import { StudentDoc, upsertStudent } from "../../database/student"

export async function formAction(formData) {
  const { Readable } = require('stream');
  const csvParser = require("csv-parser");

  const csv = formData.get("csv");
  for await (const data of Readable.from(Buffer.from(await csv.arrayBuffer())).pipe(csvParser())) {
	await upsertStudent(new StudentDoc({
		name: data["Name"],
		id: data["StudentID"],
		group: data["GroupNumber"],
		email: data["Email"],
		client: data["Client"],
		}))
  }

  return "Form request received, file content logged.";
}
