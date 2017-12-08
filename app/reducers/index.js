import { combineReducers } from 'redux';
import studentReducer from './students';
import campusReducer from './campuses';
import singleCampusReducer from './selectedCampus';
import singleStudentReducer from './selectedStudent';

const rootReducer = combineReducers({
  students: studentReducer,
  selectedStudent: singleStudentReducer,
  campuses: campusReducer,
  selectedCampus: singleCampusReducer
})

export default rootReducer;

export * from './students';
export * from './campuses';
export * from './selectedCampus';
export * from './selectedStudent';
