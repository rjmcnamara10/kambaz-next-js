import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl className="mb-2" defaultValue="alice" />
      <FormControl className="mb-2" type="password" defaultValue="123" />
      <FormControl className="mb-2" defaultValue="Alice" />
      <FormControl className="mb-2" defaultValue="Wonderland" />
      <FormControl className="mb-2" type="date" defaultValue="2000-01-01" />
      <FormControl
        className="mb-2"
        type="email"
        defaultValue="alice@wonderland.com"
      />
      <FormSelect className="mb-2">
        <option value="USER" defaultChecked>
          User
        </option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link className="btn btn-danger w-100 mb-2" href="/Account/Signin">
        Sign out
      </Link>
    </div>
  );
}
