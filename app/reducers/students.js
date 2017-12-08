import { combineReducers } from 'redux';
import axios from 'axios';

const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_STUDENT_FROM_SERVER = 'GOT_STUDENT_FROM_SERVER';
const DELETED_STUDENT = 'DELETED_STUDENT';
const UPDATED_STUDENT = 'UPDATED_STUDENT';

export function gotStudentsFromServer(students){
  return {
    type: GOT_STUDENTS_FROM_SERVER,
    students
  };
}
export function gotStudentFromServer(student){
  return {
    type: GOT_STUDENT_FROM_SERVER,
    student
  };
}

export function deletedStudent(student){
  return {
    type: DELETED_STUDENT,
    student
  };
}

export function updatedStudent(student){
  return {
    type: UPDATED_STUDENT,
    student
  };
}

export function fetchStudents(){
  return function thunk(dispatch){
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => dispatch(gotStudentsFromServer(students)))
    .catch(err => console.error(err));
  };
}
export function postStudent(student){
  return function thunk(dispatch){
    axios.post('/api/students', student)
    .then(res => res.data)
    .then(student => dispatch(gotStudentFromServer(student)))
    .catch(err => console.error(err));
  };
}
export function deleteStudent(student){
  return function thunk(dispatch){
    axios.delete(`/api/students/${student.id}`)
    .then(() => dispatch(deletedStudent(student)))
    .catch(err => console.error(err));
  };
}
export function updateStudent(student){
  return function thunk(dispatch){
    axios.put(`/api/students/${student.id}`, student)
    .then(res => res.data)
    .then(newStudent => dispatch(updatedStudent(student)))
    .catch(err => console.error(err));
  };
}

export default function studentReducer (state = [], action) {
  console.log('STATE COMING IN', state)
  let studentStateMap = state.map(student => student.id);
  let idx = studentStateMap.indexOf(action.id);
  console.log('ACTION', action, studentStateMap, idx)
  switch(action.type) {
    case GOT_STUDENTS_FROM_SERVER:
      return action.students;
    case GOT_STUDENT_FROM_SERVER:
      return [...state, action.student];
    case DELETED_STUDENT:
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case UPDATED_STUDENT:
      return [...state.slice(0, idx), action.student, ...state.slice(idx + 1)];
    default: return state;
  }
}
