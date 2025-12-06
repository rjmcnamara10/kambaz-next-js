/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { redirect } from "next/dist/client/components/navigation";
import { FaCircleCheck, FaBan } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./index.css";

export default function QuizMenu({
  quiz,
  cid,
  onDelete,
  onPublish,
}: {
  quiz: any;
  cid: string;
  onDelete: (id: string) => void;
  onPublish: (publish: boolean) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="d-flex align-items-center">
      {quiz.published ? (
        <FaCircleCheck className="text-success me-2" title="Published" />
      ) : (
        <FaBan className="text-secondary me-2" title="Unpublished" />
      )}
      <Dropdown show={showMenu} onToggle={() => setShowMenu(!showMenu)}>
        <Dropdown.Toggle
          as={Button}
          variant="link"
          onClick={() => setShowMenu(!showMenu)}
          className="p-0 m-0 no-caret"
          id={`quiz-menu-${quiz._id}`}
        >
          <BsThreeDotsVertical className="fs-4 text-dark" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              redirect(`/Courses/${cid}/Quizzes/${quiz._id}/edit`);
            }}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(quiz._id)}>
            Delete
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onPublish(!quiz.published)}>
            {quiz.published ? "Unpublish" : "Publish"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
