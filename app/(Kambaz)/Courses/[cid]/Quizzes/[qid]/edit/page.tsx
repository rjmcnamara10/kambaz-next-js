/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { useParams } from "next/navigation";
import { setQuizzes } from "../../reducer";
import {
  FormLabel,
  FormControl,
  FormSelect,
  Row,
  Col,
  Button,
  Tab,
  Tabs,
} from "react-bootstrap";
import { FaCircleCheck, FaBan } from "react-icons/fa6";
import QuestionsTab from "./QuestionsTab";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const isNew = qid === "new";
  const existing = quizzes.find((q: any) => q._id === qid);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [points, setPoints] = useState(0);
  const [timeLimit, setTimeLimit] = useState(true);
  const [timeLimitMin, setTimeLimitMin] = useState(20);

  const [type, setType] = useState("GRADED_QUIZ");
  const [assignmentGroup, setAssignmentGroup] = useState("QUIZZES");

  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [numberAttempts, setNumberAttempts] = useState(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("IMMEDIATELY");
  const [accessCode, setAccessCode] = useState("");
  const [oneQAtTime, setOneQAtTime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestions, setLockQuestions] = useState(false);

  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const [questions, setQuestions] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const onCreateQuizForCourse = async (quiz: any) => {
    if (!cid) return;
    const createdQuiz = await client.createQuizForCourse(cid as string, quiz);
    dispatch(setQuizzes([...quizzes, createdQuiz]));
    return createdQuiz;
  };

  const onUpdateQuiz = async (quiz: any) => {
    await client.updateQuiz(cid as string, quiz);
    const newQuizzes = quizzes.map((q: any) => (q._id === quiz._id ? quiz : q));
    dispatch(setQuizzes(newQuizzes));
  };

  useEffect(() => {
    if (!isNew) {
      if (existing) {
        setTitle(existing.title);
        setDescription(existing.description);
        setPublished(existing.published);
        setPoints(existing.points);
        setTimeLimit(existing.time_limit);
        setTimeLimitMin(existing.time_limit_min || 20);
        setType(existing.type);
        setAssignmentGroup(existing.assignment_group);
        setShuffleAnswers(existing.shuffle_answers);
        setMultipleAttempts(existing.multiple_attempts);
        setNumberAttempts(existing.number_attempts || 1);
        setShowCorrectAnswers(existing.show_correct_answers);
        setAccessCode(existing.access_code);
        setOneQAtTime(existing.one_q_at_time);
        setWebcamRequired(existing.webcam_required);
        setLockQuestions(existing.lock_questions);
        setDueDate(existing.due_date ? existing.due_date.slice(0, 16) : "");
        setAvailableFrom(
          existing.available_date ? existing.available_date.slice(0, 16) : ""
        );
        setAvailableUntil(
          existing.available_until ? existing.available_until.slice(0, 16) : ""
        );
        setQuestions(existing.questions || []);
      } else {
        fetchQuizzes();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, existing]);

  if (!currentUser?.role || currentUser.role !== "FACULTY") {
    return <div>You are not authorized to view this page</div>;
  }
  if (!isNew && !existing) {
    return <div>Quiz not found</div>;
  }

  const buildQuizObject = (publish?: boolean) => ({
    ...(isNew ? {} : existing),
    title,
    description,
    published: publish === undefined ? published : publish,
    points,
    time_limit: timeLimit,
    time_limit_min: timeLimitMin,
    type,
    assignment_group: assignmentGroup,
    shuffle_answers: shuffleAnswers,
    multiple_attempts: multipleAttempts,
    number_attempts: numberAttempts,
    show_correct_answers: showCorrectAnswers,
    access_code: accessCode,
    one_q_at_time: oneQAtTime,
    lock_questions: lockQuestions,
    webcam_required: webcamRequired,
    due_date: dueDate,
    available_date: availableFrom,
    available_until: availableUntil,
    questions,
  });

  const saveQuiz = async (publish?: boolean) => {
    const quizObj = buildQuizObject(publish);
    let quiz_id = qid;
    if (isNew) {
      const createdQuiz = await onCreateQuizForCourse(quizObj);
      quiz_id = createdQuiz._id;
    } else {
      await onUpdateQuiz(quizObj);
    }
    if (publish) {
      redirect(`/Courses/${cid}/Quizzes`);
    } else {
      redirect(`/Courses/${cid}/Quizzes/${quiz_id}`);
    }
  };

  const handleSave = () => saveQuiz();
  const handleSavePublish = () => saveQuiz(true);
  const handleCancel = () => {
    redirect(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quizzes-editor" className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-end align-items-center gap-4 mb-2">
        <span>Points: {points}</span>
        {published ? (
          <span className="d-flex align-items-center text-success">
            <FaCircleCheck className="me-2" />
            Published
          </span>
        ) : (
          <span className="d-flex align-items-center text-secondary">
            <FaBan className="me-2" />
            Not Published
          </span>
        )}
      </div>
      <Tabs defaultActiveKey="details" className="mb-3">
        <Tab eventKey="details" title="Details">
          <div>
            <FormLabel>Quiz Title</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <FormLabel>Quiz Instructions</FormLabel>
          <FormControl
            as="textarea"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Row className="mb-3" controlId="quiz-type">
            <FormLabel column sm={2}>
              Quiz Type
            </FormLabel>
            <Col sm={10}>
              <FormSelect
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3" controlId="assignment-group">
            <FormLabel column sm={2}>
              Assignment Group
            </FormLabel>
            <Col sm={10}>
              <FormSelect
                value={assignmentGroup}
                onChange={(e) => setAssignmentGroup(e.target.value)}
              >
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECT">Project</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={timeLimit}
                  id="timeLimit"
                  onChange={(e) => setTimeLimit(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="timeLimit">
                  Time Limit
                </label>
              </div>
              {timeLimit && (
                <div className="mt-2">
                  <FormLabel>Time Limit (minutes)</FormLabel>
                  <FormControl
                    type="number"
                    value={timeLimitMin}
                    min={1}
                    onChange={(e) => setTimeLimitMin(Number(e.target.value))}
                  />
                </div>
              )}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={shuffleAnswers}
                  id="shuffleAnswers"
                  onChange={(e) => setShuffleAnswers(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="shuffleAnswers">
                  Shuffle Answers
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={multipleAttempts}
                  id="multipleAttempts"
                  onChange={(e) => setMultipleAttempts(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="multipleAttempts">
                  Multiple Attempts
                </label>
              </div>
              {multipleAttempts && (
                <div className="mt-2">
                  <FormLabel>Number of Attempts Allowed</FormLabel>
                  <FormControl
                    type="number"
                    value={numberAttempts}
                    min={1}
                    onChange={(e) => setNumberAttempts(Number(e.target.value))}
                  />
                </div>
              )}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={oneQAtTime}
                  id="oneQAtTime"
                  onChange={(e) => setOneQAtTime(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="oneQAtTime">
                  One Question at a Time
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={webcamRequired}
                  id="webcamRequired"
                  onChange={(e) => setWebcamRequired(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="webcamRequired">
                  Webcam Required
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={lockQuestions}
                  id="lockQuestions"
                  onChange={(e) => setLockQuestions(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="lockQuestions">
                  Lock Questions After Answering
                </label>
              </div>
            </Col>
          </Row>
          <Row className="mb-3" controlId="show-correct-answers">
            <FormLabel column sm={2}>
              Show Correct Answers
            </FormLabel>
            <Col sm={10}>
              <FormSelect
                value={showCorrectAnswers}
                onChange={(e) => setShowCorrectAnswers(e.target.value)}
              >
                <option value="IMMEDIATELY">Immediately</option>
                <option value="AFTER_DUE_DATE">After Due Date</option>
                <option value="NEVER">Never</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3" controlId="access-code">
            <FormLabel column sm={2}>
              Access Code
            </FormLabel>
            <Col sm={10}>
              <FormControl
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
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
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <QuestionsTab
            questions={questions}
            setQuestions={setQuestions}
            setPoints={setPoints}
          />
        </Tab>
      </Tabs>
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
          id="wd-save-publish-btn"
          onClick={handleSavePublish}
        >
          Save and Publish
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
