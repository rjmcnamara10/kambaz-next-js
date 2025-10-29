/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({
  children
}: Readonly<{ children: ReactNode; }>) {
  const { cid } = useParams();
  // const { cid } = await params;
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  const [showCourseNav, setShowCourseNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowCourseNav((s) => !s)}
          style={{ cursor: "pointer" }}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {showCourseNav && (
          <div className="d-none d-md-block">
            <CourseNavigation cid={cid as string} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
