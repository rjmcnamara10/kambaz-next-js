/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { addEnrollment, deleteEnrollment } from "./Enrollments/reducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const [showAllEnrollments, setShowAllEnrollments] = useState<any>(false);

  const toggleShowAllEnrollments = () => {
    setShowAllEnrollments(!showAllEnrollments);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }
  const isFaculty = currentUser?.role === "FACULTY";
  const visibleCourses = showAllEnrollments
    ? courses.map((course: any) => {
        const enrollment = enrollments.find(
          (e: any) => e.user === currentUser._id && e.course === course._id
        );
        return enrollment
          ? { ...course, enrollment_id: enrollment._id }
          : course;
      })
    : courses.filter((course: any) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
        <button
          className="btn btn-primary float-end"
          id="wd-enrollments-toggle-btn"
          onClick={toggleShowAllEnrollments}
        >
          {`Show ${showAllEnrollments ? "My Courses" : "All Courses"}`}
        </button>
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary" className="btn-sm">
                      Go
                    </Button>
                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end btn-sm"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end btn-sm"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {showAllEnrollments &&
                      (course.enrollment_id ? (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteEnrollment(course.enrollment_id));
                          }}
                          className="btn btn-danger ms-2 btn-sm"
                          id="wd-unenroll-click"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(
                              addEnrollment({
                                user: currentUser._id,
                                course: course._id,
                              })
                            );
                          }}
                          className="btn btn-success ms-2 btn-sm"
                          id="wd-enroll-click"
                        >
                          Enroll
                        </button>
                      ))}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
