import { Fragment } from "react";
import StaffInfoBar from "../../components/StaffInfoBar";
import MenuBar from "../../components/MenuBar";
import { verifySession } from "../../session";
import { getStaff } from "../../database/staff";

export default async function StudentsLayout({ children }) {
  const session = await verifySession("staff");
  const staff = await getStaff(session.userId);

  return (
    <Fragment>
      <StaffInfoBar staff={staff} />
      {/* Layout UI */}
      {children}
    </Fragment>
  );
}
