import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fetchCampuses, updateStudent, fetchStudent } from '../reducers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Route, Switch, Link } from 'react-router-dom';


class SingleStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      name: '',
      email: '',
      gpa: '',
      campus: null
    }
    this.handleTextChange = this.props.handleTextChange.bind(this);
  }

  componentDidMount(){
    this.props.getCampuses();
    this.props.setReduxStateOnMount.call(this)
  }

  componentWillUpdate(nextProps) {
    console.log('SINGLE STUDENT', nextProps)
    if(nextProps.selectedStudent !== this.props.selectedStudent){
      this.setState({
        id: nextProps.selectedStudent.id,
        name: nextProps.selectedStudent.name,
        email: nextProps.selectedStudent.email,
        gpa: nextProps.selectedStudent.gpa,
        campus: nextProps.selectedStudent.CampusId,
        dirty: false
      })
    }
  }

  render (){
    console.log('STATE', this.state)
    return(
      <div>
        <h1> Update Student </h1><br />
        <br />
        <TextField
          value={this.state.name}
          hintText={"Student Name"}
          onChange={(event) => this.handleTextChange(event, 'name')}
        /><br />
        <br />
        <TextField
          value={this.state.email}
          hintText={this.props.selectedStudent.email}
          onChange={(event) => this.handleTextChange(event, 'email')}
        /><br />
        <br />
        <TextField
          value={this.state.gpa}
          hintText="Student GPA"
          onChange={(event) => this.handleTextChange(event, 'gpa')}
        /><br />
        <br />
        <SelectField
          floatingLabelText="Campus"
          floatingLabelFixed={true}
          value={this.state.campus}
          onChange={this.props.handleSelectChange.bind(this)}
        >
          {this.props.campuses.map(campus => {
            return (<MenuItem key={campus.id} value={campus.id} primaryText={campus.name} />)
          })}
        </SelectField><br />
        <br />
        <RaisedButton
          label="View This Campus"
          secondary={true}
          containerElement={<Link to={`/campuses/${this.props.selectedStudent.CampusId}`} />}
          /><br />
        <br />
        <RaisedButton
          label="Update student"
          disabled={!this.state.dirty}
          primary={true}
          onClick={this.props.handleSubmit.bind(this)}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    campuses: state.campuses,
    students: state.students,
    selectedStudent: state.selectedStudent
  };
}

function mapDispatchToProps(dispatch){
  return {
    getCampuses: function (){
      dispatch(fetchCampuses());
    },
    handleSubmit: function (event){
      event.preventDefault();
      const [firstName, lastName] = this.state.name.split(' ')
      const gpa = Number(this.state.gpa)
      const email = this.state.email
      const CampusId = this.state.campus
      const id = this.state.id;

      const student = {firstName, lastName, gpa, email, CampusId, id}

      dispatch(updateStudent(student));
    },
    handleTextChange: function (event, stateProperty){
      const newStateObj = {};
      newStateObj[stateProperty] = event.target.value;
      newStateObj.dirty = true;
      this.setState(newStateObj);
    },
    handleSelectChange: function (event, index, value){
      this.setState({campus: value, dirty: true})
    },
    setReduxStateOnMount: function(){
      const path = this.props.location.pathname.split('/')
      const userId = path[path.length-1]
      dispatch(fetchStudent(userId))
    }
  }
}

const SingleStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent))



export default SingleStudentContainer;

// could it be that we're not rerendering the page after campuses are fetched?

