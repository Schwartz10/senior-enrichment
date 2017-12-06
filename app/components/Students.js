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
    this.state = {showCheckboxes: true}
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
            disabled={this.props.selectedStudent.id ? false : true}
            containerElement={<Link to={`/students/${this.props.selectedStudent.id}`} /> }
          />
          <RaisedButton
            label="Delete Student"
            secondary={true}
            disabled={this.props.selectedStudent.id ? false : true}
            onClick={event => {this.props.handleDelete(event, this.props.selectedStudent)}}
          />
        </div>
        <Table
          onCellClick={(rowNum)=>this.props.selectStudent(this.props.students[rowNum])}
          className="student_table">

          <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
            <TableRow >
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Campus</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={true}>
            {this.props.students.map(student => {
              return (
                <TableRow key={student.id}>
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
    }
  }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students)

export default StudentsContainer;
