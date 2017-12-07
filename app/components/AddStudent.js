import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fetchCampuses, postStudent } from '../reducers';
import { connect } from 'react-redux';


class AddStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      name: '',
      email: '',
      gpa: '',
      campus: null
    }
    this.handleTextChange = this.props.handleTextChange.bind(this)
  }

  componentDidMount(){
    this.props.getCampuses();
    this.props.clearStateOnMount.call(this)
  }

  render (){
    return(
      <div>
        <h1> ADD A STUDENT! </h1><br />
        <br />
        <TextField
          value={this.state.name}
          hintText="Student Name"
          onChange={(event) => this.handleTextChange(event, 'name')}
        /><br />
        <br />
        <TextField
          value={this.state.email}
          hintText="Student Email"
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
          <MenuItem value={null} primaryText='SELECT ONE'/>
          {this.props.campuses.map((campus)=> {
            return (
              <MenuItem key={campus.id} value={campus} primaryText={campus.name} />
            )
          })}
        </SelectField><br />
        <br />
        <RaisedButton
          label="Add Student"
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
    students: state.students
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
      const CampusId = this.state.campus.id || null

      const student = {firstName, lastName, gpa, email, CampusId}

      dispatch(postStudent(student));
      this.setState({
        id: null,
        name: '',
        email: '',
        gpa: '',
        campus: null
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
    clearStateOnMount: function(){
      this.setState({
        name: '',
        campus: null
      })
    }
  }
}

const AddStudentContainer = connect(mapStateToProps, mapDispatchToProps)(AddStudent)



export default AddStudentContainer;



// should put in error handling on the front end
// could make the GPA a dropdown menu
// set the first element on the campus selector to be a campus
