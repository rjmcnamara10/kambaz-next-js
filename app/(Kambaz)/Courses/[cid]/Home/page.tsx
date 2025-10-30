/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Modules from "../Modules/page";
import CourseStatus from "./Status";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";

export default function Home() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const blocked = useRef(false);

  useEffect(() => {
    const enrolled = enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === cid
    );
    if ((!currentUser || !enrolled) && !blocked.current) {
      blocked.current = true;
      alert("You are not enrolled in this course.");
      redirect("/Dashboard");
    }
  }, [currentUser, enrollments, cid]);

  return (
    <div id="wd-home">
      <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-lg-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
