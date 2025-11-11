/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import GroupControlButtons from "./GroupControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { setAssignments } from "./reducer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(
      setAssignments(assignments.filter((a: any) => a._id !== assignmentId))
    );
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="wd-assignments">
      {isFaculty && <AssignmentsControls />}
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-groups">
        <ListGroupItem className="wd-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS (40% of Total)
            <GroupControlButtons />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <div className="wd-assignment-info">
                      {currentUser?.role === "FACULTY" ? (
                        <Link
                          href={`/Courses/${cid}/Assignments/${assignment._id}`}
                          className="wd-assignment-link text-black text-decoration-none fw-bold"
                        >
                          {assignment.title}
                        </Link>
                      ) : (
                        <span className="text-black fw-bold">
                          {assignment.title}
                        </span>
                      )}
                      <p className="mb-0">
                        <span className="text-danger">
                          Multiple Assignments
                        </span>{" "}
                        | <b>Not available until</b>{" "}
                        {new Date(assignment.available_date).toLocaleString(
                          "default",
                          { month: "long" }
                        )}{" "}
                        {new Date(assignment.available_date).getDate()} at{" "}
                        {new Date(assignment.available_date)
                          .toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .toLowerCase()}{" "}
                        | <b>Due</b>{" "}
                        {new Date(assignment.due_date).toLocaleString(
                          "default",
                          { month: "long" }
                        )}{" "}
                        {new Date(assignment.due_date).getDate()} at{" "}
                        {new Date(assignment.due_date)
                          .toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .toLowerCase()}{" "}
                        | {assignment.points} pts
                      </p>
                    </div>
                  </div>
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    deleteAssignment={(assignmentId) => {
                      onRemoveAssignment(assignmentId);
                    }}
                    isFaculty={isFaculty}
                  />
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
