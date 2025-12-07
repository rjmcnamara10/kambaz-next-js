/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { setQuizzes } from "./reducer";
import * as client from "./client";
import { FaPlus } from "react-icons/fa6";
import QuizListItem from "./QuizListItem";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  const sortedQuizzes = [...quizzes].sort(
    (a, b) =>
      new Date(a.available_date).getTime() -
      new Date(b.available_date).getTime()
  );

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const onRemoveQuiz = async (quizId: string) => {
    await client.deleteQuiz(cid as string, quizId);
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId)));
  };

  const onUpdateQuiz = async (quiz: any) => {
    await client.updateQuiz(cid as string, quiz);
    const newQuizzes = quizzes.map((q: any) => (q._id === quiz._id ? quiz : q));
    dispatch(setQuizzes(newQuizzes));
  };

  useEffect(() => {
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="wd-quizzes">
      {isFaculty && (
        <div className="d-flex justify-content-end">
          <Button
            variant="danger"
            size="lg"
            className="me-1"
            id="wd-add-quiz-btn"
            onClick={() => {
              redirect(`/Courses/${cid}/Quizzes/new/edit`);
            }}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        </div>
      )}
      <br />
      <ListGroup className="rounded-0" id="wd-groups">
        <ListGroupItem className="wd-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">Quizzes</div>
          <ListGroup className="wd-quizzes rounded-0">
            {isFaculty && sortedQuizzes.length === 0 ? (
              <div className="text-center py-4">
                Click <span className="fw-bold">+ Quiz</span> to create a quiz.
              </div>
            ) : (
              sortedQuizzes
                .filter((quiz) => isFaculty || quiz.published)
                .map((quiz: any) => (
                  <QuizListItem
                    key={quiz._id}
                    quiz={quiz}
                    cid={cid as string}
                    userId={currentUser._id}
                    isFaculty={isFaculty}
                    onDelete={(quizId) => {
                      onRemoveQuiz(quizId);
                    }}
                    onPublish={(publish) => {
                      onUpdateQuiz({ ...quiz, published: publish });
                    }}
                  />
                ))
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
