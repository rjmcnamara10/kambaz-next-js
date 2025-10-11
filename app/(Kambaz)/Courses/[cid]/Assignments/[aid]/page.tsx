"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";
import {
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
  Button
} from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.find((assignment) => assignment._id === aid);
  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="d-flex flex-column gap-3">
      <div>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl defaultValue={assignment.title} />
      </div>
      <FormControl
        as="textarea"
        rows={10}
        defaultValue={assignment.description}
      />
      <Row className="mb-3" controlId="points">
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={10}>
          <FormControl type="number" defaultValue={assignment.points} />
        </Col>
      </Row>
      <Row className="mb-3" controlId="assignment-group">
        <FormLabel column sm={2}>
          Assignment Group
        </FormLabel>
        <Col sm={10}>
          <FormSelect>
            <option value="ASSIGNMENTS" defaultChecked>
              ASSIGNMENTS
            </option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3" controlId="grade-display">
        <FormLabel column sm={2}>
          Display Grade as
        </FormLabel>
        <Col sm={10}>
          <FormSelect>
            <option value="PERCENTAGE" defaultChecked>
              Percentage
            </option>
            <option value="DECIMAL">Decimal</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3" controlId="submission-type">
        <FormLabel column sm={2}>
          Submission Type
        </FormLabel>
        <Col sm={10} className="d-flex flex-column gap-3">
          <FormSelect>
            <option value="ONLINE" defaultChecked>
              Online
            </option>
          </FormSelect>
          <div>
            <FormLabel>Online Entry Options</FormLabel>
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="Text Entry"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={true}
              label="Website URL"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="Media Recordings"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="Student Annotation"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="File Uploads"
            />
          </div>
        </Col>
      </Row>
      <Row className="mb-3" controlId="assign">
        <FormLabel column sm={2}>
          Assign
        </FormLabel>
        <Col sm={10} className="d-flex flex-column gap-3">
          <div>
            <FormLabel>Assign to</FormLabel>
            <FormControl defaultValue="Everyone" />
          </div>
          <div>
            <FormLabel>Due</FormLabel>
            <FormControl type="datetime-local" defaultValue={assignment.due_date?.slice(0, 16)} />
          </div>
          <Row>
            <Col sm={6}>
              <FormLabel>Available from</FormLabel>
              <FormControl type="datetime-local" defaultValue={assignment.available_date?.slice(0, 16)} />
            </Col>
            <Col sm={6}>
              <FormLabel>Until</FormLabel>
              <FormControl type="datetime-local" />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="d-flex gap-2 justify-content-end">
        <Link
          href={`/Courses/${cid}/Assignments`}
          id="wd-cancel-link"
        >
          <Button
            variant="secondary"
            size="lg"
            className="me-1 float-end"
            id="wd-cancel-btn"
          >
            Cancel
          </Button>
        </Link>
        <Link
          href={`/Courses/${cid}/Assignments`}
          id="wd-save-link"
        >
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-save-btn"
          >
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
}
