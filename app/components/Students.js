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

class Students extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getStudents();
  }

  render(){
    return (
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
            disabled={!this.props.selectedStudent.id}
            containerElement={<Link to={this.props.selectedStudent.id ? `/students/${this.props.selectedStudent.id}` : '/students'} /> }
          />
          <RaisedButton
            className="raised_button"
            label="Delete Student"
            primary={true}
            disabled={!this.props.selectedStudent.id}
            onClick={event => this.props.handleDelete(event, this.props.selectedStudent)}
          /><br>
          </br>
          <Subheader className='subheader'>Students</Subheader>
        </div>

        <StudentTable filter={this.props.students}/>
      </div>
    )
  }
}

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
    getStudents: function (){
      dispatch(fetchStudents());
    },
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

export default StudentsContainer;
