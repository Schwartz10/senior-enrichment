import { combineReducers } from 'redux';
import axios from 'axios';

const SELECTED_STUDENT_FROM_LIST = 'SELECTED_STUDENT_FROM_LIST';

export function selectedStudentFromList(selectedStudent){
  return {
    type: SELECTED_STUDENT_FROM_LIST,
    selectedStudent
  };
}
export function fetchStudent(studentId){
  return function thunk(dispatch){
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(student => dispatch(selectedStudentFromList(student)))
    .catch(err => console.error(err));
  };
}

export default function singleStudentReducer(state = {}, action){
  switch (action.type){
    case SELECTED_STUDENT_FROM_LIST:
      return action.selectedStudent;
    default: return state;
  }
}
