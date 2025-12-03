/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (courseId: string, quiz: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/quizzes/${quiz._id}`,
    quiz
  );
  return data;
};
