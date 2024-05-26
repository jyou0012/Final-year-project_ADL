import { Fragment } from "react";
import StaffInfoBar from "../../components/StaffInfoBar";
import MenuBar from "../../components/MenuBar";
import { verifySession } from "../../session";

export default async function StudentsLayout({ children }) {
  const session = await verifySession("staff");
  return (
    <Fragment>
      <StaffInfoBar />
      {/* Layout UI */}
      {children}
    </Fragment>
  );
}
