import { Fragment } from "react";
import StaffInfoBar from "../../components/StaffInfoBar";

export default function StudentsLayout({ children }) {
  return (
    <Fragment>
      <StaffInfoBar />
      {/* Layout UI */}
      {children}
    </Fragment>
  );
}
