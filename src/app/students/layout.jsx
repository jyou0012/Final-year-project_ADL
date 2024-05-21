import { Fragment } from "react";
import { verifySession } from "../../session";
import { getStudent } from "../../database/student";
import StudentInfoBar from "../../components/StudentInfoBar";

export default async function StudentsLayout({ children }) {
  const session = await verifySession();
  const student = await getStudent(session.userId);

  return (
    <Fragment>
      <StudentInfoBar student={JSON.parse(JSON.stringify(student))} />
      {/* Layout UI */}
      {children}
    </Fragment>
  );
}
