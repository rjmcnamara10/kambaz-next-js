/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  FormSelect,
  FormControl,
  Row,
  Col,
  FormLabel,
} from "react-bootstrap";

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
  const [editQuestion, setEditQuestion] = useState<any>(null);

  const handleAddQuestion = () => {
    const newQ = {
      type: "MC",
      text: "",
      choices: [""],
      answer: "",
      points: 0,
    };
    setQuestions([...questions, newQ]);
    setEditingIndex(questions.length);
    setEditQuestion(newQ);
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setEditQuestion({ ...questions[idx] });
  };

  const handleSave = () => {
    const updated = [...questions];
    updated[editingIndex!] = editQuestion;
    setQuestions(updated);
    setEditingIndex(null);
    setEditQuestion(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditQuestion(null);
  };

  useEffect(() => {
    setPoints(questions.reduce((sum, q) => sum + (q.points || 0), 0));
  }, [questions, setPoints]);

  const renderEditor = () => {
    if (!editQuestion) return null;
    return (
      <div className="border p-3 mb-3">
        <Row className="mb-2">
          <Col sm={8}>
            <FormControl
              placeholder="Question text"
              value={editQuestion.text}
              onChange={(e) =>
                setEditQuestion({ ...editQuestion, text: e.target.value })
              }
            />
          </Col>
          <Col sm={4}>
            <FormSelect
              value={editQuestion.type}
              onChange={(e) =>
                setEditQuestion({ ...editQuestion, type: e.target.value })
              }
            >
              {QUESTION_TYPES.map((qt) => (
                <option key={qt.value} value={qt.value}>
                  {qt.label}
                </option>
              ))}
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col sm={4}>
            <FormControl
              type="number"
              value={editQuestion.points}
              onChange={(e) =>
                setEditQuestion({
                  ...editQuestion,
                  points: Number(e.target.value),
                })
              }
              placeholder="Points"
            />
          </Col>
        </Row>
        {editQuestion.type === "MC" && (
          <div>
            {editQuestion.choices.map((choice: string, idx: number) => (
              <Row key={idx} className="mb-1">
                <Col sm={10}>
                  <FormControl
                    value={choice}
                    placeholder={`Choice ${idx + 1}`}
                    onChange={(e) => {
                      const choices = [...editQuestion.choices];
                      choices[idx] = e.target.value;
                      setEditQuestion({ ...editQuestion, choices });
                    }}
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      const choices = editQuestion.choices.filter(
                        (_: any, i: number) => i !== idx
                      );
                      setEditQuestion({ ...editQuestion, choices });
                    }}
                    disabled={editQuestion.choices.length <= 1}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                setEditQuestion({
                  ...editQuestion,
                  choices: [...editQuestion.choices, ""],
                })
              }
            >
              Add Choice
            </Button>
            <Row>
              <FormLabel className="mt-2">Correct Answer</FormLabel>
              <FormSelect
                value={editQuestion.answer}
                onChange={(e) =>
                  setEditQuestion({ ...editQuestion, answer: e.target.value })
                }
              >
                {editQuestion.choices.map((choice: string, idx: number) => (
                  <option key={idx} value={choice}>
                    {choice || `Choice ${idx + 1}`}
                  </option>
                ))}
              </FormSelect>
            </Row>
          </div>
        )}
        {editQuestion.type === "TF" && (
          <div>
            <FormLabel>Correct Answer</FormLabel>
            <FormSelect
              value={editQuestion.answer}
              onChange={(e) =>
                setEditQuestion({ ...editQuestion, answer: e.target.value })
              }
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </FormSelect>
          </div>
        )}
        {editQuestion.type === "FIB" && (
          <div>
            <FormLabel>Correct Answer</FormLabel>
            <FormControl
              value={editQuestion.answer}
              onChange={(e) =>
                setEditQuestion({ ...editQuestion, answer: e.target.value })
              }
              placeholder="Correct answer"
            />
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

  return (
    <div>
      {questions.map((q, idx) =>
        editingIndex === idx ? (
          renderEditor()
        ) : (
          <div key={idx} className="border p-2 mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <strong>{q.text || "Untitled Question"}</strong> (
                {QUESTION_TYPES.find((t) => t.value === q.type)?.label})
              </span>
              <span>{q.points} pts</span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleEdit(idx)}
              >
                Edit
              </Button>
            </div>
          </div>
        )
      )}
      <div className="d-flex justify-content-center">
        <Button variant="secondary" size="lg" onClick={handleAddQuestion}>
          New Question
        </Button>
      </div>
    </div>
  );
}
