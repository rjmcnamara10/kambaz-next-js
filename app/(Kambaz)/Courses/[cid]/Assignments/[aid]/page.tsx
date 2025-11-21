/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { useParams } from "next/navigation";
import { setAssignments } from "../reducer";
import {
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const isNew = aid === "new";
  const existing = assignments.find((a: any) => a._id === aid);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<number | "">("");
  const [dueDate, setDueDate] = useState<string>("");
  const [availableFrom, setAvailableFrom] = useState<string>("");
  const [availableUntil, setAvailableUntil] = useState<string>("");

  const onCreateAssignmentForCourse = async (assignment: any) => {
    if (!cid) return;
    const createdAssignment = await client.createAssignmentForCourse(
      cid as string,
      assignment
    );
    dispatch(setAssignments([...assignments, createdAssignment]));
  };

  const onUpdateAssignment = async (assignment: any) => {
    await client.updateAssignment(cid as string, assignment);
    const newAssignments = assignments.map((a: any) =>
      a._id === assignment._id ? assignment : a
    );
    dispatch(setAssignments(newAssignments));
  };

  useEffect(() => {
    if (!isNew && existing) {
      setTitle(existing.title);
      setDescription(existing.description);
      setPoints(existing.points);
      setDueDate(existing.due_date ? existing.due_date.slice(0, 16) : "");
      setAvailableFrom(
        existing.available_date ? existing.available_date.slice(0, 16) : ""
      );
      setAvailableUntil(
        existing.available_until ? existing.available_until.slice(0, 16) : ""
      );
    } else if (isNew) {
      setTitle("");
      setDescription("");
      setPoints("");
      setDueDate("");
      setAvailableFrom("");
      setAvailableUntil("");
    }
  }, [isNew, existing]);

  if (!currentUser?.role || currentUser.role !== "FACULTY") {
    return <div>You are not authorized to view this page</div>;
  }
  if (!isNew && !existing) {
    return <div>Assignment not found</div>;
  }

  const handleSave = () => {
    if (isNew) {
      onCreateAssignmentForCourse({
        title,
        description,
        points: typeof points === "number" ? points : Number(points || 0),
        due_date: dueDate || undefined,
        available_date: availableFrom || undefined,
        available_until: availableUntil || undefined,
        course: cid,
      });
    } else {
      onUpdateAssignment({
        ...existing,
        title,
        description,
        points: typeof points === "number" ? points : Number(points || 0),
        due_date: dueDate || undefined,
        available_date: availableFrom || undefined,
        available_until: availableUntil || undefined,
      });
    }
    redirect(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    redirect(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="d-flex flex-column gap-3">
      <div>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <FormControl
        as="textarea"
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Row className="mb-3" controlId="points">
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={10}>
          <FormControl
            type="number"
            value={points}
            onChange={(e) =>
              setPoints(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
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
            <FormControl
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <Row>
            <Col sm={6}>
              <FormLabel>Available from</FormLabel>
              <FormControl
                type="datetime-local"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
              />
            </Col>
            <Col sm={6}>
              <FormLabel>Until</FormLabel>
              <FormControl
                type="datetime-local"
                value={availableUntil}
                onChange={(e) => setAvailableUntil(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="d-flex gap-2 justify-content-end">
        <Button
          variant="secondary"
          size="lg"
          className="me-1"
          id="wd-cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="me-1"
          id="wd-save-btn"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
