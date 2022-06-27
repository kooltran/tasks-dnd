import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  ADD_NEW_TASK,
} from "../constants";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        fail: null,
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        loading: true,
        data: action.payload,
        fail: null,
      };
    case GET_TASK_FAIL:
      return {
        ...state,
        loading: true,
        data: null,
        fail: action.payload,
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        loading: false,
        data: action.payload,
        fail: null,
      };
    default:
      return state;
  }
};
