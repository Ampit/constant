import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userLoggedIn: false,
  tasks: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      // code
      break;
    case actionTypes.DELETE_TASK:
      // code
      break;
    case actionTypes.TASK_COMPLETE:
      //code
      break;
    case actionTypes.TASK_NOT_COMPLETE:
      // code
      break;
    default:
      return state;
  }
}
