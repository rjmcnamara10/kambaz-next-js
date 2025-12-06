/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { useParams } from "next/navigation";
import { Row, Col, Button } from "react-bootstrap";
import { setQuizzes } from "../reducer";
import * as client from "../client";

const QUIZ_TYPES = [
  { value: "GRADED_QUIZ", label: "Graded Quiz" },
  { value: "PRACTICE_QUIZ", label: "Practice Quiz" },
  { value: "GRADED_SURVEY", label: "Graded Survey" },
  { value: "UNGRADED_SURVEY", label: "Ungraded Survey" },
];

const SHOW_CORRECT_ANSWERS = [
  { value: "IMMEDIATELY", label: "Immediately" },
  { value: "AFTER_DUE_DATE", label: "After Due Date" },
  { value: "NEVER", label: "Never" },
];

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    setQuiz(quizzes.find((q: any) => q._id === qid));
  };

  const onPublishQuiz = async (quiz: any) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(cid as string, updatedQuiz);
    const newQuizzes = quizzes.map((q: any) =>
      q._id === updatedQuiz._id ? updatedQuiz : q
    );
    dispatch(setQuizzes(newQuizzes));
    setQuiz(updatedQuiz);
  };

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreview = () => {
    redirect(`/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleEdit = () => {
    redirect(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
      <Row className="mb-3">
        <Col sm={4}>
          <h2 className="mb-3">{quiz.title}</h2>
        </Col>
        <Col sm={8}>
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant={quiz.published ? "danger" : "primary"}
              size="lg"
              className="me-1"
              id="wd-publish-btn"
              onClick={() => onPublishQuiz(quiz)}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              id="wd-preview-btn"
              onClick={handlePreview}
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="me-1"
              id="wd-edit-btn"
              onClick={handleEdit}
            >
              Edit
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Quiz Type
        </Col>
        <Col sm={4}>
          {QUIZ_TYPES.find((qt) => qt.value === quiz.type)?.label}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Points
        </Col>
        <Col sm={4}>{quiz.points}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Assignment Group
        </Col>
        <Col sm={4}>{quiz.assignment_group}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Shuffle Answers
        </Col>
        <Col sm={4}>{quiz.shuffle_answers ? "Yes" : "No"}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Time Limit
        </Col>
        <Col sm={4}>{quiz.time_limit ? "Yes" : "No"}</Col>
      </Row>
      {quiz.time_limit && (
        <Row className="mb-3">
          <Col sm={3} className="fw-bold text-end">
            Time Limit (minutes)
          </Col>
          <Col sm={4}>{quiz.time_limit_min}</Col>
        </Row>
      )}
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Multiple Attempts
        </Col>
        <Col sm={4}>{quiz.multiple_attempts ? "Yes" : "No"}</Col>
      </Row>
      {quiz.multiple_attempts && (
        <Row className="mb-3">
          <Col sm={3} className="fw-bold text-end">
            Number of Attempts
          </Col>
          <Col sm={4}>{quiz.number_attempts}</Col>
        </Row>
      )}
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Show Correct Answers
        </Col>
        <Col sm={4}>
          {
            SHOW_CORRECT_ANSWERS.find(
              (sca) => sca.value === quiz.show_correct_answers
            )?.label
          }
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Access Code
        </Col>
        <Col sm={4}>{quiz.access_code || "None"}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          One Question at a Time
        </Col>
        <Col sm={4}>{quiz.one_q_at_time ? "Yes" : "No"}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Webcam Required
        </Col>
        <Col sm={4}>{quiz.webcam_required ? "Yes" : "No"}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Lock Questions After Answering
        </Col>
        <Col sm={4}>{quiz.lock_questions ? "Yes" : "No"}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Due
        </Col>
        <Col sm={4}>
          {new Date(quiz.due_date).toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date(quiz.due_date).getDate()} at{" "}
          {new Date(quiz.due_date)
            .toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .toLowerCase()}{" "}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Available from
        </Col>
        <Col sm={4}>
          {new Date(quiz.available_date).toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date(quiz.available_date).getDate()} at{" "}
          {new Date(quiz.available_date)
            .toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .toLowerCase()}{" "}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} className="fw-bold text-end">
          Until
        </Col>
        <Col sm={4}>
          {new Date(quiz.available_until).toLocaleString("default", {
            month: "long",
          })}{" "}
          {new Date(quiz.available_until).getDate()} at{" "}
          {new Date(quiz.available_until)
            .toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .toLowerCase()}{" "}
        </Col>
      </Row>
    </div>
  );
}
