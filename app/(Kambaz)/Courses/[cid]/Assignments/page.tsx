import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls";
import GroupControlButtons from "./GroupControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
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
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    A1
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May
                    13 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    A2
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May
                    20 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    A3
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May
                    27 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            QUIZZES (10% of Total)
            <GroupControlButtons />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    Q1
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May
                    13 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    Q2
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May
                    20 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    Q3
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May
                    27 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            EXAMS (20% of Total)
            <GroupControlButtons />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    X1
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> October 24 at{" "}
                    12:00am | <b>Due</b> October 31 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    X2
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> December 8 at 12:00am | <b>Due</b>{" "}
                    December 10 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
        <ListGroupItem className="wd-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            PROJECT (30% of Total)
            <GroupControlButtons />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            <ListGroupItem className="wd-assignment p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="wd-assignment-info">
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-black text-decoration-none fw-bold"
                  >
                    P
                  </Link>
                  <p className="mb-0">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 6 at 12:00am | <b>Due</b> December 10 at 11:59pm | 100 pts
                  </p>
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
