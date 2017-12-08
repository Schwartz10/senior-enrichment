import { combineReducers } from 'redux';
import axios from 'axios';

const SELECTED_SINGLE_CAMPUS = 'SELECTED_SINGLE_CAMPUS';

export function selectedSingleCampus(selectedCampus){
  return {
    type: SELECTED_SINGLE_CAMPUS,
    selectedCampus
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

export default function singleCampusReducer(state = {}, action){
  switch (action.type){
    case SELECTED_SINGLE_CAMPUS:
      return action.selectedCampus;
    default: return state;
  }
}
