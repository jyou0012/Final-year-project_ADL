import { Fragment } from "react";
import StudentInfoBar from "../../components/StudentInfoBar";

export default function StudentsLayout({ children }) {
  return (
    <Fragment>
      <StudentInfoBar />
      {/* Layout UI */}
      {children}
    </Fragment>
  );
}
