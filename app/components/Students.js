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

class Students extends Component {
  constructor(props){
    super(props)
    this.state = {selectedRow: null}
  }

  componentDidMount(){
    this.props.getStudents();
    this.props.clearSelectedStudent();
  }

  render(){
    return(
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
            disabled={!this.props.selectedStudent.id}
            containerElement={<Link to={`/students/${this.props.selectedStudent.id}`} /> }
          />
          <RaisedButton
            label="Delete Student"
            secondary={true}
            disabled={!this.props.selectedStudent.id}
            onClick={event => {this.props.handleDelete(event, this.props.selectedStudent)}}
          />
        </div>
        <Table
          onRowSelection={(row) => {
            console.log(row)
            this.props.handleRowSelection.call(this, row, this.props.students[row])} }
          className="student_table">

          <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
            <TableRow >
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Campus</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody deselectOnClickaway={false} displayRowCheckbox={true}>
            {this.props.students.map((student, idx) => {
              return (
                <TableRow key={student.id} selected={idx === this.state.selectedRow}>
                  <TableRowColumn>{student.id}</TableRowColumn>
                  <TableRowColumn>{student.name}</TableRowColumn>
                  <TableRowColumn>{student.Campus ? student.Campus.name : 'NONE'}</TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    students: state.students,
    selectedStudent: state.selectedStudent
  };
}

function mapDispatchToProps(dispatch){
  return {
    getStudents: function (){
      dispatch(fetchStudents());
    },
    selectStudent: function(student){
      dispatch(selectedStudentFromList(student));
    },
    clearSelectedStudent: function (){
      dispatch(selectedStudentFromList({}));
    },
    handleDelete: function (e, student){
      e.preventDefault();
      dispatch(deleteStudent(student))
    },
    handleRowSelection: function (row, student){
      row.length ? dispatch(selectedStudentFromList(student)) : dispatch(selectedStudentFromList([]))
      this.setState({selectedRow: row[0]})
    }
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

export default StudentsContainer;
