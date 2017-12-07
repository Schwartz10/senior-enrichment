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


class StudentTable extends Component {

  constructor(props){
    super(props)
    this.state = {selectedRow: null, students: []}
  }

  componentDidMount(){
    this.props.getStudents();
    this.props.clearSelectedStudent();
  }

  componentWillUpdate(nextProps){
    if (nextProps.filter !== this.props.filter) this.props.filterStudentSelection.call(this,nextProps)
    if (nextProps.students.length !== this.props.students.length){
      this.setState({selectedRow: null})
    }
  }

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

function mapStateToProps(state){
  return {
    students: state.students,
    selectedStudent: state.selectedStudent,
  };
}

function mapDispatchToProps(dispatch){
  return {
    getStudents: function (){
      dispatch(fetchStudents());
    },
    clearSelectedStudent: function (){
      dispatch(selectedStudentFromList({}));
    },
    handleRowSelection: function (row, student){
      row.length ? dispatch(selectedStudentFromList(student)) : dispatch(selectedStudentFromList([]))
      this.setState({selectedRow: row[0]})
    },
    filterStudentSelection: function (props){
      const studentList = props.students.filter(student => student.CampusId === props.filter);
      this.setState({students: studentList})
    }
  }
}

const StudentTableContainer = connect(mapStateToProps, mapDispatchToProps)(StudentTable)

export default StudentTableContainer;
