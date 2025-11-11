/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
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
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "./Enrollments/reducer";
import * as client from "../Courses/client";

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
  const [showAllCourses, setShowAllCourses] = useState<any>(false);

  const fetchCourses = async () => {
    try {
      let courses;
      if (showAllCourses) {
        courses = await client.fetchAllCourses();
      } else {
        courses = await client.findMyCourses();
      }
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await client.fetchAllEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const status = await client.deleteCourse(courseId);
    dispatch(
      setCourses(courses.filter((course: any) => course._id !== courseId))
    );
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      )
    );
  };

  const onAddNewEnrollment = async (courseId: string) => {
    const newEnrollment = await client.createEnrollment(courseId);
    dispatch(setEnrollments([...enrollments, newEnrollment]));
  };

  const onDeleteEnrollment = async (enrollmentId: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const status = await client.deleteEnrollment(enrollmentId);
    dispatch(
      setEnrollments(
        enrollments.filter((enrollment: any) => enrollment._id !== enrollmentId)
      )
    );
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, showAllCourses]);

  const toggleShowAllEnrollments = () => {
    setShowAllCourses(!showAllCourses);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }
  const isFaculty = currentUser?.role === "FACULTY";

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
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
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
        Published Courses ({courses.length})
        <button
          className="btn btn-primary float-end"
          id="wd-enrollments-toggle-btn"
          onClick={toggleShowAllEnrollments}
        >
          {`Show ${showAllCourses ? "My Courses" : "All Courses"}`}
        </button>
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => {
            const enrollmentForCourse = enrollments.find(
              (e: any) => e.user === currentUser._id && e.course === course._id
            );
            return (
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
                              onDeleteCourse(course._id);
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
                      {showAllCourses &&
                        (enrollmentForCourse ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              onDeleteEnrollment(enrollmentForCourse._id);
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
                              onAddNewEnrollment(course._id);
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
            );
          })}
        </Row>
      </div>
    </div>
  );
}
