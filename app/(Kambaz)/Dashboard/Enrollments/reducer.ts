/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: uuidv4(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter((e: any) => e._id !== enrollmentId);
    },
  },
});

export const { addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
