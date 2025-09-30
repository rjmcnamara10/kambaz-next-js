import {
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="d-flex flex-column gap-3">
      <div>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl defaultValue="A1" />
      </div>
      <FormControl
        as="textarea"
        rows={10}
        defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- A list of links to navigate to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
      />
      <Row className="mb-3" controlId="points">
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={10}>
          <FormControl type="number" defaultValue="100" />
        </Col>
      </Row>
      <Row className="mb-3" controlId="assignment-group">
        <FormLabel column sm={2}>
          Assignment Group
        </FormLabel>
        <Col sm={10}>
          <FormSelect>
            <option value="ASSIGNMENTS" defaultChecked>
              ASSIGNMENTS
            </option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3" controlId="grade-display">
        <FormLabel column sm={2}>
          Display Grade as
        </FormLabel>
        <Col sm={10}>
          <FormSelect>
            <option value="PERCENTAGE" defaultChecked>
              Percentage
            </option>
            <option value="DECIMAL">Decimal</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3" controlId="submission-type">
        <FormLabel column sm={2}>
          Submission Type
        </FormLabel>
        <Col sm={10} className="d-flex flex-column gap-3">
          <FormSelect>
            <option value="ONLINE" defaultChecked>
              Online
            </option>
          </FormSelect>
          <div>
            <FormLabel>Online Entry Options</FormLabel>
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="Text Entry"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={true}
              label="Website URL"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="Media Recordings"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="Student Annotation"
            />
            <FormCheck
              type="checkbox"
              defaultChecked={false}
              label="File Uploads"
            />
          </div>
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
            <FormControl type="date" defaultValue="2024-05-13" />
          </div>
          <Row>
            <Col sm={6}>
              <FormLabel>Available from</FormLabel>
              <FormControl type="date" defaultValue="2024-05-06" />
            </Col>
            <Col sm={6}>
              <FormLabel>Until</FormLabel>
              <FormControl type="date" defaultValue="2024-05-20" />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
