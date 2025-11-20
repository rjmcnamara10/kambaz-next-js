/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../../Account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    let firstName = user.firstName;
    let lastName = user.lastName;
    let updatedEmail = user.email;
    let updatedRole = user.role;

    if (editing) {
      [firstName, lastName] = name.split(" ");
    }
    if (editingEmail) {
      updatedEmail = email;
    }
    if (editingRole) {
      updatedRole = role;
    }
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email: updatedEmail,
      role: updatedRole,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    setEditingEmail(false);
    setEditingRole(false);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  useEffect(() => {
    if (user) {
      setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
      setEmail(user.email ?? "");
      setRole(user.role ?? "");
    }
  }, [user]);

  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Email:</b>
      <span className="wd-email">
        {!editingEmail && (
          <FaPencil
            onClick={() => setEditingEmail(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editingEmail && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editingEmail && (
          <div className="wd-email" onClick={() => setEditingEmail(true)}>
            {user.email}
          </div>
        )}
        {user && editingEmail && (
          <FormControl
            type="email"
            className="w-50 wd-edit-email"
            defaultValue={user.email}
            required
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.currentTarget.checkValidity()) {
                  saveUser();
                }
              }
            }}
          />
        )}
      </span>
      <br />
      <b>Roles:</b>
      <span className="wd-roles">
        {!editingRole && (
          <FaPencil
            onClick={() => setEditingRole(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editingRole && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editingRole && (
          <div className="wd-role" onClick={() => setEditingRole(true)}>
            {user.role}
          </div>
        )}
        {user && editingRole && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select float-start wd-edit-role"
          >
            <option value="STUDENT">Student</option>
            <option value="TA">Assistant</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrator</option>
          </select>
        )}
      </span>
      <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
