"use server";

export async function formAction({ fileContent }) {
  console.log(fileContent); 
  return "Form request received, file content logged.";
}
