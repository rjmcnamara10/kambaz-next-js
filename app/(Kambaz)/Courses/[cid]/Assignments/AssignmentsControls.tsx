import { Button, InputGroup, FormControl } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useParams } from "next/navigation";
import { redirect } from "next/dist/client/components/navigation";

export default function AssignmentsControls() {
  const { cid } = useParams();

  return (
    <div
      id="wd-assignments-controls"
      className="d-flex justify-content-between align-items-center"
    >
      <InputGroup className="me-2" size="lg" style={{ width: "400px" }}>
        <InputGroupText>
          <FaSearch />
        </InputGroupText>
        <FormControl placeholder="Search..." id="wd-search-assignment" />
      </InputGroup>
      <div>
        <Button
          variant="secondary"
          size="lg"
          className="me-1"
          id="wd-add-group-btn"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </Button>
        <Button
          variant="danger"
          size="lg"
          className="me-1"
          id="wd-add-assignment-btn"
          onClick={() => {
            redirect(`/Courses/${cid}/Assignments/new`);
          }}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      </div>
    </div>
  );
}
