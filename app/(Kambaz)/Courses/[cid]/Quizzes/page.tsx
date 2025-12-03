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

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

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
            {quizzes.map((quiz: any) => (
              <div key={quiz._id}></div>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
