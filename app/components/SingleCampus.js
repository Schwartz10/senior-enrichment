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
import StudentTable from './StudentTable';


class SingleCampus extends Component {
  constructor(props){
    super(props)
    this.state = {showCheckboxes: true}
  }

  componentDidMount(){
    const path = this.props.location.pathname.split('/')
    const pathId = path[path.length-1];
    this.props.getSelectedCampus(pathId)
  }

  render(){
    return(
      <div>
        <h1>{this.props.selectedCampus.name}</h1>
        <Subheader className="subheader" inset={true}>{this.props.selectedCampus.description}</Subheader>
        <div>
          <RaisedButton
            className="raised_button"
            label="Edit Campus"
            primary={true}
            containerElement={<Link to={`/campuses/edit/${this.props.selectedCampus.id}`} />}
          />
          <RaisedButton
            className="raised_button"
            label="Delete Campus"
            primary={true}
            onClick={event => {
              this.props.handleDelete(event, this.props.selectedCampus)
              this.props.history.push('/campuses');
            }}
          />
          <RaisedButton
            className="raised_button"
            label="View Student"
            primary={true}
            disabled={this.props.selectedStudent.id ? false : true}
            containerElement={<Link to={`/students/${this.props.selectedStudent.id}`} /> }
          />
        </div>
        <StudentTable filter={this.props.students.filter(student => student.CampusId === this.props.selectedCampus.id)}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    selectedStudent: state.selectedStudent,
    selectedCampus: state.selectedCampus,
    students: state.students
  };
}

function mapDispatchToProps(dispatch){
  return {
    getSelectedCampus: function(campusId){
      dispatch(selectCampus(campusId));
    },
    handleDelete: function (e, campus){
      e.preventDefault();
      dispatch(deleteCampus(campus));
    }
  }
}

const SingleCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))

export default SingleCampusContainer;

// pass as a prop
