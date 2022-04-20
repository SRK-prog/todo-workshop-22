const data =
  localStorage.getItem("tododata") != null
    ? JSON.parse(localStorage.getItem("tododata")).user
    : [];

export default function userReducer(state = data, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    default:
      return state;
  }
}
