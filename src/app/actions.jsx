"use server";

import { redirect } from 'next/navigation'
import { getStudent } from "../database/student";
import { createSession } from "../session";

export default async function loginAction(formData) {
	const student = await getStudent(formData.get("password"))
	if ( student.name == formData.get("username") ) {
		createSession(formData.get("password"))
		redirect("/students")
	}
}
