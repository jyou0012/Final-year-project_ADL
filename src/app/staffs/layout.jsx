import { Fragment } from "react";
import StaffInfoBar from "../../components/StaffInfoBar";
import MenuBar from '../../components/MenuBar'; 

export default function StudentsLayout({ children }) {
  return (
    <Fragment>
      <StaffInfoBar />
      {/* Layout UI */}
      {children}
    </Fragment>
  );
}
