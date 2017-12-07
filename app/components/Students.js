import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchStudents, selectedStudentFromList, deleteStudent } from '../reducers';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Switch, Link } from 'react-router-dom';
import StudentTable from './StudentTable'

const Students = (props) => (
  <div>
    <div>
      <RaisedButton
        label="Add Student"
        secondary={true}
        containerElement={<Link to="/add-student" />}
      />
      <RaisedButton
        label="View/Edit Student"
        secondary={true}
        disabled={!props.selectedStudent.id}
        containerElement={<Link to={`/students/${props.selectedStudent.id}`} /> }
      />
      <RaisedButton
        label="Delete Student"
        secondary={true}
        disabled={!props.selectedStudent.id}
        onClick={event => props.handleDelete(event, props.selectedStudent)}
      />
    </div>
    <StudentTable filter={null}/>
  </div>
)

function mapStateToProps(state){
  return {
    selectedStudent: state.selectedStudent
  };
}

function mapDispatchToProps(dispatch){
  return {
    handleDelete: function (e, student){
      e.preventDefault();
      dispatch(deleteStudent(student));
    },
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

export default StudentsContainer;
