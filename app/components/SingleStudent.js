import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fetchCampuses, updateStudent, fetchStudent } from '../reducers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'


class SingleStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      name: '',
      email: this.props.selectedStudent.email,
      gpa: this.props.selectedStudent.gpa,
      campus: this.props.selectedStudent.Campus
    }
    this.handleTextChange = this.props.handleTextChange.bind(this)
  }

  componentDidMount(){
    this.props.getCampuses();
    this.props.setReduxStateOnMount.call(this)
  }

  componentWillUpdate(nextProps) {
    if(nextProps.selectedStudent !== props.selectedStudent){

    }
  }

  render (){
    return(
      <div>
        <h1> Update {this.props.selectedStudent.name} </h1><br />
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
          value={this.state.campus}
          onChange={this.props.handleSelectChange.bind(this)}
        >
          <MenuItem value={null} primaryText="Select One" />
          {this.props.campuses.map((campus)=> {
            return (
              <MenuItem key={campus.id} value={campus} primaryText={campus.name} />
            )
          })}
        </SelectField><br />
        <br />
        <RaisedButton
        label="Update student"
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
      const CampusId = this.state.campus.id
      const userId = this.state.userId;

      const student = {firstName, lastName, gpa, email, CampusId, userId}

      dispatch(updateStudent(student));
      this.setState({
        name: '',
        email: '',
        gpa: '',
        campus: {}
      })
    },
    handleTextChange: function (event, stateProperty){
      const newStateObj = {};
      newStateObj[stateProperty] = event.target.value;
      this.setState(newStateObj);
    },
    handleSelectChange: function (event, index, value){
      this.setState({campus: value})
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

// how can i add
