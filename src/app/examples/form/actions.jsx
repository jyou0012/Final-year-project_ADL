"use server";

export async function formAction(formData) {
  console.log(formData.get("end"));
  return "form request received";
}
