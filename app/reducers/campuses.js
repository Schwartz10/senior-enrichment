import { combineReducers } from 'redux';
import axios from 'axios';

const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const GOT_CAMPUS_FROM_SERVER = 'GOT_CAMPUS_FROM_SERVER';
const DELETED_CAMPUS = 'DELETED_CAMPUS';
const UPDATED_CAMPUS = 'UPDATED_CAMPUS';

export function gotCampusesFromServer(campuses){
  return {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses
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
  console.log('UPDATING', campus)
  return {
    type: UPDATED_CAMPUS,
    campus
  }
}

export function fetchCampuses(){
  return function thunk(dispatch){
    axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => dispatch(gotCampusesFromServer(campuses)))
    .catch(err => console.error(err));
  };
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
    .then(() => dispatch(deletedCampus(campus)))
    .catch(err => console.error(err));
  };
}

export function updateCampus(campus){
  return function thunk(dispatch){
    axios.put(`/api/campuses/edit/${campus.id}`, campus)
    .then(res => res.data)
    .then(newCampus => dispatch(updatedCampus(campus)))
    .catch(err => console.error(err));
  }
}

export default function campusReducer (state = [], action){
  let campusStateMap = state.map(campus => campus.id);
  let idx = campusStateMap.indexOf(action.id);
  switch (action.type){
    case GOT_CAMPUSES_FROM_SERVER:
      return action.campuses;
    case GOT_CAMPUS_FROM_SERVER:
      return [...state, action.campus];
    case DELETED_CAMPUS:
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case UPDATED_CAMPUS:
      return [...state.slice(0, idx), action.campus, ...state.slice(idx + 1)];
    default: return state;
  }
}
