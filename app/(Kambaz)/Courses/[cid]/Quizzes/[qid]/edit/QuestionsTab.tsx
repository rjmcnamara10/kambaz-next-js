/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  FormSelect,
  FormControl,
  Row,
  Col,
  FormLabel,
  FormCheck,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

const QUESTION_TYPES = [
  { value: "MC", label: "Multiple Choice" },
  { value: "TF", label: "True/False" },
  { value: "FIB", label: "Fill in the Blank" },
];

export default function QuestionsTab({
  questions,
  setQuestions,
  setPoints,
}: {
  questions: any[];
  setQuestions: (qs: any[]) => void;
  setPoints: (points: number) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editQTitle, setEditQTitle] = useState("");
  const [editQPoints, setEditQPoints] = useState(0);
  const [editQText, setEditQText] = useState("");
  const [editQType, setEditQType] = useState("MC");
  const [editQMCOptions, setEditQMCOptions] = useState<string[]>(["", "", "", ""]); // multiple choice
  const [editQMCCorrect, setEditQMCCorrect] = useState(""); // multiple choice
  const [editQTFCorrect, setEditQTFCorrect] = useState(true); // true/false
  const [editQFIBCorrect, setEditQFIBCorrect] = useState<string[]>([""]); // fill in the blank

  const handleAddQuestion = () => {
    setEditQTitle("");
    setEditQPoints(0);
    setEditQText("");
    setEditQType("MC");
    setEditQMCOptions(["", "", "", ""]);
    setEditQMCCorrect("");
    setEditQTFCorrect(true);
    setEditQFIBCorrect([""]);
    const newQ = {
      title: "",
      points: 0,
      question: "",
      type: "MC",
      mcOptions: [""],
      mcCorrect: "",
    };
    setQuestions([...questions, newQ]);
    setEditingIndex(questions.length);
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    const editQ = questions[idx];
    setEditQTitle(editQ.title || "");
    setEditQPoints(editQ.points || 0);
    setEditQText(editQ.question || "");
    setEditQType(editQ.type || "MC");
    setEditQMCOptions(editQ.mcOptions || ["", "", "", ""]);
    setEditQMCCorrect(editQ.mcCorrect || "");
    setEditQTFCorrect(editQ.tfCorrect || true);
    setEditQFIBCorrect(editQ.fibCorrect || [""]);
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const saveQ: any = {
        title: editQTitle,
        points: editQPoints,
        question: editQText,
        type: editQType,
      };

      if (editQType === "MC") {
        saveQ["mcOptions"] = editQMCOptions;
        saveQ["mcCorrect"] = editQMCCorrect;
      } else if (editQType === "TF") {
        saveQ["tfCorrect"] = editQTFCorrect;
      } else if (editQType === "FIB") {
        saveQ["fibCorrect"] = editQFIBCorrect;
      }

      const updated = [...questions];
      updated[editingIndex] = saveQ;
      setQuestions(updated);
      setEditingIndex(null);
    }
  };

  const handleDelete = (idx: number) => {
    const updated = questions.filter((_, i) => i !== idx);
    setQuestions(updated);
    setEditingIndex(null);
  }

  const handleCancel = () => {
    setEditingIndex(null);
  };

  useEffect(() => {
    setPoints(questions.reduce((sum, q) => sum + (q.points || 0), 0));
  }, [questions, setPoints]);

  const renderEditor = () => {
    return (
      <div className="border p-3 mb-3">
        <Row className="mb-2">
          <Col sm={7}>
            <FormControl
              placeholder="Question title"
              value={editQTitle}
              onChange={(e) => setEditQTitle(e.target.value)}
            />
          </Col>
          <Col sm={3}>
            <FormSelect
              value={editQType}
              onChange={(e) => setEditQType(e.target.value)}
            >
              {QUESTION_TYPES.map((qt) => (
                <option key={qt.value} value={qt.value}>
                  {qt.label}
                </option>
              ))}
            </FormSelect>
          </Col>
          <Col sm={2}>
            <div className="d-flex align-items-center">
              <FormLabel className="mb-0 me-2" style={{ whiteSpace: "nowrap" }}>
                Points:
              </FormLabel>
              <FormControl
                type="number"
                value={editQPoints}
                onChange={(e) => setEditQPoints(Number(e.target.value))}
                placeholder="Points"
              />
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={12}>
            <FormControl
              as="textarea"
              placeholder="Enter question here..."
              rows={5}
              value={editQText}
              onChange={(e) => setEditQText(e.target.value)}
            />
          </Col>
        </Row>
        {editQType === "MC" && (
          <div>
            {editQMCOptions.map((option: string, idx: number) => (
              <Row key={idx} className="mb-1">
                <div className="d-flex align-items-center gap-2">
                  <Col sm={10}>
                    <FormControl
                      value={option}
                      placeholder={`Option ${idx + 1}`}
                      onChange={(e) => {
                        const options = [...editQMCOptions];
                        options[idx] = e.target.value;
                        setEditQMCOptions(options);
                        if (!options.includes(editQMCCorrect)) {
                          setEditQMCCorrect("");
                        }
                      }}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const options = editQMCOptions.filter(
                          (_: any, i: number) => i !== idx
                        );
                        setEditQMCOptions(options);
                      }}
                      disabled={editQMCOptions.length <= 1}
                    >
                      Remove
                    </Button>
                  </Col>
                </div>
              </Row>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setEditQMCOptions([...editQMCOptions, ""])}
            >
              Add Option
            </Button>
            <Row>
              <Col sm={10}>
                <FormLabel className="mt-2">Correct Answer</FormLabel>
                <FormSelect
                  value={editQMCCorrect}
                  onChange={(e) => setEditQMCCorrect(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {editQMCOptions.map((option: string, idx: number) => (
                    <option key={idx} value={option}>
                      {option || `Option ${idx + 1}`}
                    </option>
                  ))}
                </FormSelect>
              </Col>
            </Row>
          </div>
        )}
        {editQType === "TF" && (
          <div>
            <FormLabel>Correct Answer</FormLabel>
            <FormSelect
              value={editQTFCorrect ? "true" : "false"}
              onChange={(e) =>
                setEditQTFCorrect(e.target.value === "true" ? true : false)
              }
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </FormSelect>
          </div>
        )}
        {editQType === "FIB" && (
          <div>
            {editQFIBCorrect.map((answer: string, idx: number) => (
              <Row key={idx} className="mb-1">
                <Col sm={10}>
                  <FormControl
                    value={answer}
                    placeholder={`Answer ${idx + 1}`}
                    onChange={(e) => {
                      const answers = [...editQFIBCorrect];
                      answers[idx] = e.target.value;
                      setEditQFIBCorrect(answers);
                    }}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      const answers = editQFIBCorrect.filter(
                        (_: any, i: number) => i !== idx
                      );
                      setEditQFIBCorrect(answers);
                    }}
                    disabled={editQFIBCorrect.length <= 1}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setEditQFIBCorrect([...editQFIBCorrect, ""])}
            >
              Add Answer
            </Button>
          </div>
        )}
        <div className="d-flex gap-2 justify-content-end mt-3">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    );
  };

  const renderSavedQuestion = (q: any, idx: number) => {
    return (
      <div className="border p-3 mb-3">
        <Row className="mb-2">
          <Col sm={7}>
            <span className="fw-bold fs-5">
              {q.title || "Untitled Question"}
            </span>
          </Col>
          <Col sm={3}>
            <span>
              {QUESTION_TYPES.find((qt) => qt.value === q.type)?.label}
            </span>
          </Col>
          <Col sm={2}>
            <span>Points: {q.points}</span>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col>
            <span className="text-muted fst-italic">{q.question}</span>
          </Col>
        </Row>
        {q.type === "MC" && (
          <div className="mt-2">
            {q.mcOptions.map((option: string, idx: number) => {
              return (
                <FormCheck
                  key={idx}
                  type="radio"
                  id={`mc-option-${idx}`}
                  label={option || `Option ${idx + 1}`}
                  className="mb-1"
                  name={`mc-options-${idx}`}
                />
              );
            })}
            <div>
              <span className="fw-semibold">Correct Answer:</span>{" "}
              {q.mcCorrect || "No correct answer selected"}
            </div>
          </div>
        )}
        {q.type === "TF" && (
          <div>
            <span className="mt-2">
              Correct Answer:{" "}
              {q.tfCorrect !== undefined
                ? q.tfCorrect
                  ? "True"
                  : "False"
                : "No correct answer selected"}
            </span>
          </div>
        )}
        {q.type === "FIB" && (
          <div>
            <span>Correct Answers:</span>
            {q.fibCorrect.map((answer: string, idx: number) => (
              <div key={idx}>{answer}</div>
            ))}
          </div>
        )}
        <div className="d-flex gap-2 justify-content-end mt-3">
          <Button variant="danger" onClick={() => handleDelete(idx)}>Delete</Button>
          <Button onClick={() => handleEdit(idx)}>Edit</Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {questions.map((q, idx) =>
        editingIndex === idx ? renderEditor() : renderSavedQuestion(q, idx)
      )}
      <div className="d-flex justify-content-center align-items-center">
        <Button variant="secondary" size="lg" onClick={handleAddQuestion}>
          <FaPlus className="me-2" />
          New Question
        </Button>
      </div>
    </div>
  );
}
