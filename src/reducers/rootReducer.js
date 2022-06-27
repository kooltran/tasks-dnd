import combineReducers from "react-combine-reducers";

import { taskReducer } from "./taskReducer";

const taskInitState = {
  loading: false,
  data: null,
  fail: null,
};

const [rootReducer, initialStateCombined] = combineReducers({
  task: [taskReducer, taskInitState],
});

export { rootReducer, initialStateCombined };
