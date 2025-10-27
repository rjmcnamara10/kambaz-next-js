import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";

const store = configureStore({
  reducer: { coursesReducer },
});

export default store;
