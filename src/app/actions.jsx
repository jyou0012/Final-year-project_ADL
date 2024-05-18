"use server";

import { redirect } from 'next/navigation'
import { getStudent } from "../database/student";
import { createSession } from "../session";

export default async function loginAction(formData) {
	console.log(formData)
	const student = getStudent(formData.password)
	if ( student.name == formData.username ) {
		createSession(formData.password)
		redirect("/students")
	}
}
