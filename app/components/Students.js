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
import StudentTable from './StudentTable';
import Subheader from 'material-ui/Subheader';

const Students = (props) => (
  <div>
    <div className="listViewButtons">
      <RaisedButton
        className="raised_button"
        label="Add Student"
        primary={true}
        containerElement={<Link to="/add-student" />}
      />
      <RaisedButton
        className="raised_button"
        label="View/Edit Student"
        primary={true}
        disabled={!props.selectedStudent.id}
        containerElement={<Link to={props.selectedStudent.id ? `/students/${props.selectedStudent.id}` : '/students'} /> }
      />
      <RaisedButton
        className="raised_button"
        label="Delete Student"
        primary={true}
        disabled={!props.selectedStudent.id}
        onClick={event => props.handleDelete(event, props.selectedStudent)}
      /><br>
      </br>
      <Subheader className='subheader'>Students</Subheader>
    </div>

    <StudentTable filter={props.students}/>
  </div>
)

function mapStateToProps(state){
  return {
    selectedStudent: state.selectedStudent,
    students: state.students
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
