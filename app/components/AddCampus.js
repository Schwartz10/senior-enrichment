import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { fetchCampuses, postCampus } from '../reducers';
import { connect } from 'react-redux';


class AddCampus extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      imageUrl: '',
    }
    this.handleTextChange = this.props.handleTextChange.bind(this)
  }

  componentDidMount(){
    this.props.getCampuses();
    this.props.clearStateOnMount.call(this)
  }

  render (){
    console.log(this.state)
    return(
      <div>
        <h1> ADD A CAMPUS! </h1><br />
        <br />
        <TextField
          value={this.state.name}
          hintText="Campus Name"
          onChange={(event) => this.handleTextChange(event, 'name')}
        /><br />
        <br />
        <TextField
          multiLine={true}
          value={this.state.description}
          hintText="Campus Description"
          onChange={(event) => this.handleTextChange(event, 'description')}
        /><br />
        <br />
        <TextField
          multiLine={true}
          value={this.state.imageUrl}
          hintText="Campus imageUrl"
          onChange={(event) => this.handleTextChange(event, 'imageUrl')}
        /><br />
        <br />
        <RaisedButton
        label="Add Campus"
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
      const name = this.state.name;
      const description = this.state.description;
      const imageUrl = this.state.imageUrl;
      const campus = {name, imageUrl, description};

      dispatch(postCampus(campus));
      this.setState({
        id: null,
        name: '',
        description: '',
        imageUrl: '',
      })
    },
    handleTextChange: function (event, stateProperty){
      const newStateObj = {};
      newStateObj[stateProperty] = event.target.value;
      this.setState(newStateObj);
    },
    clearStateOnMount: function(){
      this.setState({
        name: '',
        campus: {}
      })
    }
  }
}

const AddCampusContainer = connect(mapStateToProps, mapDispatchToProps)(AddCampus)



export default AddCampusContainer;



// should put in error handling on the front end
// could make the GPA a dropdown menu
// set the first element on the campus selector to be a campus
