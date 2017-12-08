import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { selectedStudentFromList } from '../reducers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class StudentTable extends Component {

  constructor(props){
    super(props)
    this.state = {selectedRow: null}
  }

  componentDidMount(){
    this.props.clearSelectedStudent();
  }

  render() {

    if(this.props.students.length > 0){
      return (
          <Table
            onRowSelection={(row) => {
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
      )
    } else return <div><h1>Loading</h1></div>

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
      row.length ? dispatch(selectedStudentFromList(student)) : dispatch(selectedStudentFromList({}))
      this.setState({selectedRow: row[0]})
    },
    updatePage: function (nextProps){
      this.setState({selectedRow: null})
    }
  }
}

const StudentTableContainer = connect(mapStateToProps, mapDispatchToProps)(StudentTable);

export default StudentTableContainer;

// why does campus rendering of student table render each table selection 4 times, whereas the students version renders correctly?
