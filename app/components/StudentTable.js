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
import { Route, Switch, Link } from 'react-router-dom';
const isEqual = require('lodash.isequal')


class StudentTable extends Component {

  constructor(props){
    super(props)
    this.state = {selectedRow: null, students: []}
  }

  componentDidMount(){
    this.props.clearSelectedStudent();
  }

  componentWillUpdate(nextProps){
    console.log('NEXTPROPS', nextProps)
    //checks to see if this component is being filtered, if it is, run the filter method
    if (nextProps.filter !== this.state.students){
      this.props.updatePage.call(this, nextProps);
    }
  }

  // shouldComponentUpdate(nextProps){
  //   console.log('!!!!!!!!!!!!', isEqual(nextProps.filter, this.state.students))

  //   return !isEqual(nextProps.filter, this.state.students)
  // }

  render() {
    return (
      <Table
        onRowSelection={(row) => {
        this.props.handleRowSelection.call(this, row, this.state.students[row])} }
        className="student_table">

        <TableHeader adjustForCheckbox={true} displaySelectAll={false}>
          <TableRow >
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Campus</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody deselectOnClickaway={false} displayRowCheckbox={true}>
          {this.state.students.map((student, idx) => {
            console.log(student, idx)
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
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    students: ownProps.filter,
    selectedStudent: state.selectedStudent
  };
}

function mapDispatchToProps(dispatch){
  return {
    clearSelectedStudent: function (){
      dispatch(selectedStudentFromList({}));
    },
    handleRowSelection: function (row, student){
      console.log(row, student)
      row.length ? dispatch(selectedStudentFromList(student)) : dispatch(selectedStudentFromList([]))
      this.setState({selectedRow: row[0]})
    },
    updatePage: function (nextProps){
      this.setState({selectedRow: null, students: nextProps.filter})
    }
  }
}

const StudentTableContainer = connect(mapStateToProps, mapDispatchToProps)(StudentTable)

export default StudentTableContainer;

// why does campus rendering of student table render each table selection 4 times, whereas the students version renders correctly?
