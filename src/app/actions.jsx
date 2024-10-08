"use server";

import { redirect } from "next/navigation";
import { getStudent } from "../database/student";
import { getStaff } from "../database/staff";
import { createSession } from "../session";

export default async function loginAction(formData) {
  const role = formData.get("role");
  const username = formData.get("username");
  const password = formData.get("password");

  if (role === "student") {
    const student = await getStudent(password);
    if (student && student.name === username) {
      createSession("student", password);
      redirect("/students");
    }
  } else if (role === "staff") {
    const staff = await getStaff(username);
    if (staff && staff.name === username) {
      createSession("staff", staff.name);
      redirect("/staff/overview");
    }
  }
}
