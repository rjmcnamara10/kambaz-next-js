/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect } from "next/dist/client/components/navigation";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { setQuizzes } from "./reducer";
import * as client from "./client";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  const now = new Date();

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
      <br />
      <ListGroup className="rounded-0" id="wd-groups">
        <ListGroupItem className="wd-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">Quizzes</div>
          <ListGroup className="wd-quizzes rounded-0">
            {sortedQuizzes.map((quiz: any) => (
              <ListGroupItem
                key={quiz._id}
                className="wd-quiz p-3 ps-1 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <div className="wd-quiz-info">
                    {currentUser?.role === "FACULTY" ? (
                      <Link
                        href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                        className="wd-quiz-link text-black text-decoration-none fw-bold"
                      >
                        {quiz.title || "Untitled Quiz"}
                      </Link>
                    ) : (
                      <span className="text-black fw-bold">
                        {quiz.title || "Untitled Quiz"}
                      </span>
                    )}
                    <p className="mb-0">
                      {now > new Date(quiz.available_until) && <>Closed </>}
                      {now >= new Date(quiz.available_date) &&
                        now <= new Date(quiz.available_until) && (
                          <>Available </>
                        )}
                      {now < new Date(quiz.available_date) && (
                        <>
                          Not available until{" "}
                          {new Date(quiz.available_date).toLocaleString(
                            "default",
                            {
                              month: "long",
                            }
                          )}{" "}
                          {new Date(quiz.available_date).getDate()} at{" "}
                          {new Date(quiz.available_date)
                            .toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .toLowerCase()}{" "}
                        </>
                      )}
                      | <b>Due</b>{" "}
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
                      | {quiz.points} pts | {quiz.questions.length} Questions
                    </p>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
