import { ADD_TASK, MODIFY_TASK, DELETE_TASK } from "../constants";

const data =
  localStorage.getItem("tododata") != null
    ? JSON.parse(localStorage.getItem("tododata")).user
    : [];

export default function userReducer(state = data, action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case MODIFY_TASK:
      return [...action.payload];
    case DELETE_TASK:
      return [...state.filter((item) => item.id !== action.payload)];
    default:
      return state;
  }
}
