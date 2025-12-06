/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import QuizMenu from "./QuizMenu";

export default function QuizListItem({
  quiz,
  cid,
  isFaculty,
  onDelete,
  onPublish,
}: {
  quiz: any;
  cid: string;
  isFaculty: boolean;
  onDelete: (quizId: string) => void;
  onPublish: (publish: boolean) => void;
}) {
  const now = new Date();

  return (
    <ListGroupItem className="wd-quiz p-3 ps-1 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3" />
        <div className="wd-quiz-info">
          {isFaculty ? (
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
              now <= new Date(quiz.available_until) && <>Available </>}
            {now < new Date(quiz.available_date) && (
              <>
                Not available until{" "}
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
      {isFaculty && (
        <QuizMenu
          quiz={quiz}
          cid={cid}
          onDelete={onDelete}
          onPublish={onPublish}
        />
      )}
    </ListGroupItem>
  );
}
