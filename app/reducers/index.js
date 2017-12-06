/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux';
import axios from 'axios';

//action types
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const SELECTED_STUDENT_FROM_LIST = 'SELECTED_STUDENT_FROM_LIST';
const GOT_STUDENT_FROM_SERVER = 'GOT_STUDENT_FROM_SERVER';
const DELETED_STUDENT = 'DELETED_STUDENT';
const UPDATED_STUDENT = 'UPDATED_STUDENT';
const SELECTED_SINGLE_CAMPUS = 'SELECTED_SINGLE_CAMPUS';
const GOT_CAMPUS_FROM_SERVER = 'GOT-CAMPUS_FROM_SERVER';
const DELETED_CAMPUS = 'DELETED_STUDENT';
const UPDATED_CAMPUS = 'UPDATED_CAMPUS';

//action creators
export function gotCampusesFromServer(campuses){
  return {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses
  };
}

export function gotStudentsFromServer(students){
  return {
    type: GOT_STUDENTS_FROM_SERVER,
    students
  };
}

export function selectedStudentFromList(selectedStudent){
  return {
    type: SELECTED_STUDENT_FROM_LIST,
    selectedStudent
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

export function selectedSingleCampus(selectedCampus){
  return {
    type: SELECTED_SINGLE_CAMPUS,
    selectedCampus
  };
}

export function gotCampusFromServer(campus){
  return {
    type: GOT_CAMPUS_FROM_SERVER,
    campus
  }
}

export function deletedCampus(campus){
  return {
    type: DELETED_CAMPUS,
    campus
  }
}

export function updatedCampus(campus){
  return {
    type: UPDATED_CAMPUS,
    campus
  }
}


// thunks
export function fetchCampuses(){
  return function thunk(dispatch){
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => dispatch(gotCampusesFromServer(campuses)))
    .catch(err => console.error(err));
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

export function fetchStudent(studentId){
  return function thunk(dispatch){
    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(student => dispatch(selectedStudentFromList(student)))
    .catch(err => console.error(err));
  };
}

export function updateStudent(student){
  return function thunk(dispatch){
    axios.put(`/api/students/${student.id}`, student)
    .then(res => res.data)
    .then(newStudent => dispatch(updatedStudent(newStudent)))
    .catch(err => console.error(err));
  };
}

export function selectCampus(campusId){
  return function thunk(dispatch){
    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then(campus => dispatch(selectedSingleCampus(campus)))
    .catch(err => console.error(err));
  }
}

export function postCampus(campus){
  return function thunk(dispatch){
    axios.post('/api/campuses', campus)
    .then(res => res.data)
    .then(campus => dispatch(gotCampusFromServer(campus)))
    .catch(err => console.error(err));
  }
}

export function deleteCampus(campus){
  return function thunk(dispatch){
    axios.delete(`/api/campuses/${campus.id}`)
    .then(() => dispatch(deleteCampus(campus)))
    .catch(err => console.error(err));
  };
}

export function updateCampus(campus){
  return function thunk(dispatch){
    axios.put(`/api/campuses/edit/${campus.id}`, campus)
    .then(campus => dispatch(updatedCampus(campus)))
    .catch(err => console.error(err));
  }
}

const initialState = {campuses: [], students: [], selectedCampus: {}, selectedStudent: {}};

// const campusReducer = function(state = [], action){
//   switch(action.type) {
//     case GOT_CAMPUSES_FROM_SERVER:
//       return Object.assign({}, state, { campuses: action.campuses });
//     default: return state
// }

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return Object.assign({}, state, { campuses: action.campuses });
    case GOT_STUDENTS_FROM_SERVER:
      return Object.assign({}, state, {students: action.students});
    case SELECTED_STUDENT_FROM_LIST:
      return Object.assign({}, state, {selectedStudent: action.selectedStudent});
    case GOT_STUDENT_FROM_SERVER:
      return Object.assign({}, state, {students: [...state.students, action.student]});
    case DELETED_STUDENT:
      let studentI = state.students.indexOf(action.student);
      let newStudents = [...state.students.slice(0, i), ...state.students.slice(i + 1)];
      return Object.assign({}, state, { students: newStudents} )
    case UPDATED_STUDENT:
      let idx = state.students.indexOf(action.student);
      let newStudentList = [...state.students.slice(0, i), action.student,...state.students.slice(i + 1)];
      return Object.assign({}, state, { students: newStudentList} )
    case SELECTED_SINGLE_CAMPUS:
      return Object.assign({}, state, { selectedCampus: action.selectedCampus} )
    case GOT_CAMPUS_FROM_SERVER:
      return Object.assign({}, state, {campuses: [...state.campuses, action.campus]})
    case DELETED_STUDENT:
      let campusI = state.campuses.indexOf(action.campus);
      let newCampuses = [...state.campuses.slice(0, i), ...state.campuses.slice(i + 1)];
      return Object.assign({}, state, { campuses: newCampuses} )
    case UPDATED_CAMPUS:
      let campusIdx = state.campuses.indexOf(action.campus);
      let newCampusList = [...state.campuses.slice(0, campusIdx), action.campus,...state.campuses.slice(campusIdx + 1)];
      return Object.assign({}, state, { campuses: newCampusList} )
    default: return state;
  }
};

export default rootReducer;

//should change teh name of selectedStudentFromList to just "selectedStudent"
