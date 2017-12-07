import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchStudents, selectedStudentFromList, selectCampus, deleteCampus } from '../reducers';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import Subheader from 'material-ui/Subheader';


class SingleCampus extends Component {
  constructor(props){
    super(props)
    this.state = {showCheckboxes: true}
  }

  componentDidMount(){
    const path = this.props.location.pathname.split('/')
    const pathId = path[path.length-1];
    this.props.getSelectedCampus(pathId)
    this.props.getStudents();
    this.props.clearSelectedStudent()
  }

  render(){
    return(
      <div>
        <h1>{this.props.selectedCampus.name}</h1>
        <Subheader inset={true}>{this.props.selectedCampus.description}</Subheader>
        <div>
          <RaisedButton
            className="raised_button"
            label="Edit Campus"
            secondary={true}
            containerElement={<Link to={`/campuses/edit/${this.props.selectedCampus.id}`} />}
          />
          <RaisedButton
          className="raised_button"
            label="Delete Campus"
            secondary={true}
            onClick={event => {
              this.props.handleDelete(event, this.props.selectedCampus);
              this.props.history.push('/campuses');
            }}
          />
          <RaisedButton
            className="raised_button"
            label="View Student"
            secondary={true}
            disabled={this.props.selectedStudent.id ? false : true}
            containerElement={<Link to={`/students/${this.props.selectedStudent.id}`} /> }
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
            {this.props.students
              //add filter in here to check if student.campus id === campus id
              .filter(student => this.props.selectedCampus.id === student.CampusId)
              .map(student => {
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
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus
  };
}

function mapDispatchToProps(dispatch){
  return {
    getStudents: function (){
      dispatch(fetchStudents());
    },
    getSelectedCampus: function(campusId){
      dispatch(selectCampus(campusId));
    },
    selectStudent: function(student){
      dispatch(selectedStudentFromList(student));
    },
    clearSelectedStudent: function (){
      dispatch(selectedStudentFromList({}));
    },
    handleDelete: function (e, campus){
      e.preventDefault();
      dispatch(deleteCampus(campus));
    }
  }
}

const SingleCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))

export default SingleCampusContainer;

