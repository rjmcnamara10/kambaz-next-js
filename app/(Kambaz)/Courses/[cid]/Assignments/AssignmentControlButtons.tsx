import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
  isFaculty,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
  isFaculty: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmDelete = () => {
    deleteAssignment(assignmentId);
    closeConfirm();
  };

  return (
    <>
      <div className="float-end text-nowrap">
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
        {isFaculty && (
          <FaTrash
            className="text-danger me-2 mb-1"
            cursor={"pointer"}
            onClick={openConfirm}
          />
        )}
      </div>
      <Modal show={showConfirm} onHide={closeConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirm}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
