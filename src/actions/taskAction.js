import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAIL,
  ADD_NEW_TASK,
} from "../constants";

const getTaskRequest = () => ({
  type: GET_TASK_REQUEST,
});

const getTaskSuccess = (payload) => ({
  type: GET_TASK_SUCCESS,
  payload,
});

const getTaskFail = (payload) => ({
  type: GET_TASK_FAIL,
  payload,
});

const addNewTask = (payload) => ({
  type: ADD_NEW_TASK,
  payload,
});

export { getTaskRequest, getTaskSuccess, getTaskFail, addNewTask };
