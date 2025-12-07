/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { setQuizzes } from "../../reducer";
import { FaCheck, FaTimes } from "react-icons/fa";
import * as client from "../../client";

export default function QuizViewer() {
  const { cid, qid } = useParams();
  const searchParams = useSearchParams();
  const showResults = searchParams.get("results") === "1";

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const fetchQuiz = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    setQuiz(quizzes.find((q: any) => q._id === qid));
  };

  const submission = !isFaculty && quiz?.submissions?.[currentUser._id];

  useEffect(() => {
    fetchQuiz();

    if (showResults && submission) {
      setAnswers(submission.answers || {});
      setScore(submission.score || 0);
      setSubmitted(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, submission]);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const question = quiz.questions[currentQuestionIdx];

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestionIdx]: value });
  };

  const handleEdit = () => {
    redirect(`/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const changeCurrentQuestion = (idx: number) => setCurrentQuestionIdx(idx);

  const handleSubmit = async () => {
    let curScore = 0;
    quiz.questions.forEach((q: any, idx: number) => {
      if (q.type === "MC" && answers[idx] === q.mcCorrect) {
        curScore += q.points;
      } else if (q.type === "TF" && answers[idx] === q.tfCorrect) {
        curScore += q.points;
      } else if (q.type === "FIB" && q.fibCorrect.includes(answers[idx])) {
        curScore += q.points;
      }
    });
    setScore(curScore);
    setSubmitted(true);

    if (!isFaculty) {
      const submissions = quiz.submissions ?? {};
      const prevSubmission = submissions[currentUser._id];
      const attempt = prevSubmission ? prevSubmission.attempt + 1 : 1;
      submissions[currentUser._id] = {
        attempt,
        score: curScore,
        answers,
      };

      const updatedQuiz = {
        ...quiz,
        submissions,
      };
      await client.updateQuiz(cid as string, updatedQuiz);
      const newQuizzes = quizzes.map((q: any) =>
        q._id === updatedQuiz._id ? updatedQuiz : q
      );
      dispatch(setQuizzes(newQuizzes));
      setQuiz(updatedQuiz);
    }
  };

  const getResultIcon = (idx: number) => {
    if (!submitted) return null;
    const q = quiz.questions[idx];
    let correct = false;
    if (q.type === "MC") correct = answers[idx] === q.mcCorrect;
    if (q.type === "TF") correct = answers[idx] === q.tfCorrect;
    if (q.type === "FIB") correct = q.fibCorrect.includes(answers[idx]);
    return correct ? (
      <span className="text-success ms-2">
        <FaCheck />
      </span>
    ) : (
      <span className="text-danger ms-2">
        <FaTimes />
      </span>
    );
  };

  const renderQuestion = (q: any, idx: number) => (
    <div>
      <h5>
        {q.title}
        {getResultIcon(idx)}
      </h5>
      <div className="mb-3">{q.question}</div>
      {q.type === "MC" &&
        q.mcOptions.map((opt: string, i: number) => (
          <div key={i} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`mc-${idx}`}
              id={`mc-${idx}-${i}`}
              value={opt}
              disabled={submitted}
              checked={answers[idx] === opt}
              onChange={() => handleAnswer(opt)}
            />
            <label className="form-check-label" htmlFor={`mc-${idx}-${i}`}>
              {opt}
            </label>
          </div>
        ))}
      {q.type === "TF" && (
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`tf-${idx}`}
              id={`tf-${idx}-true`}
              value="true"
              disabled={submitted}
              checked={answers[idx] === true}
              onChange={() => handleAnswer(true)}
            />
            <label className="form-check-label" htmlFor={`tf-${idx}-true`}>
              True
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`tf-${idx}`}
              id={`tf-${idx}-false`}
              value="false"
              disabled={submitted}
              checked={answers[idx] === false}
              onChange={() => handleAnswer(false)}
            />
            <label className="form-check-label" htmlFor={`tf-${idx}-false`}>
              False
            </label>
          </div>
        </div>
      )}
      {q.type === "FIB" && (
        <input
          className="form-control"
          type="text"
          value={answers[idx] || ""}
          disabled={submitted}
          onChange={(e) => handleAnswer(e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <h3>{quiz.title}</h3>
        </Col>
        <Col className="text-end">
          {isFaculty && (
            <Button variant="secondary" onClick={handleEdit}>
              Edit Quiz
            </Button>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {quiz.questions.map((_: any, idx: number) => (
            <Button
              key={idx}
              variant={idx === currentQuestionIdx ? "primary" : "outline-secondary"}
              className="me-2 mb-2"
              onClick={() => changeCurrentQuestion(idx)}
            >
              {idx + 1}
              {getResultIcon(idx)}
            </Button>
          ))}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>{renderQuestion(question, currentQuestionIdx)}</Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => changeCurrentQuestion(currentQuestionIdx - 1)}
            disabled={currentQuestionIdx === 0}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => changeCurrentQuestion(currentQuestionIdx + 1)}
            disabled={currentQuestionIdx === quiz.questions.length - 1}
          >
            Next
          </Button>
          {!submitted && (
            <Button variant="danger" onClick={handleSubmit} className="ms-2">
              Submit Quiz
            </Button>
          )}
        </Col>
      </Row>
      {submitted && (
        <Row className="mt-4">
          <Col>
            <Alert variant="info">
              <h5>
                Score: {score} /{" "}
                {quiz.questions.reduce(
                  (sum: number, q: any) => sum + (q.points || 0),
                  0
                )}
              </h5>
              {quiz.questions.map((q: any, idx: number) => (
                <div key={idx}>
                  <strong>{q.title}:</strong> {getResultIcon(idx)}
                  <br />
                  <span>
                    Your answer:{" "}
                    {q.type === "TF"
                      ? answers[idx]
                        ? "True"
                        : "False"
                      : answers[idx] || "No answer"}
                  </span>
                  <br />
                  <span>
                    {q.type === "MC" && "Correct answer: " + q.mcCorrect}
                    {q.type === "TF" &&
                      "Correct answer: " + (q.tfCorrect ? "True" : "False")}
                    {q.type === "FIB" &&
                      "Correct answer(s): " + q.fibCorrect.join(", ")}
                  </span>
                  <hr />
                </div>
              ))}
            </Alert>
          </Col>
        </Row>
      )}
    </div>
  );
}
