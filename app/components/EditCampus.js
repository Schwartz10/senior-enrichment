import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { updateCampus, selectCampus } from '../reducers';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'


class AddCampus extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      name: '',
      description: '',
      imageUrl: '',
      dirty: false
    }
    this.handleTextChange = this.props.handleTextChange.bind(this)
  }

  componentDidMount(){
    this.props.clearStateOnMount.call(this);
    this.props.setReduxStateOnMount.call(this);
  }

  componentWillUpdate(nextProps){
    if(nextProps.selectedCampus !== this.props.selectedCampus){
      this.setState({
        id: nextProps.selectedCampus.id,
        name: nextProps.selectedCampus.name,
        description: nextProps.selectedCampus.description,
        imageUrl: nextProps.selectedCampus.imageUrl,
        dirty: false
      })
    }
  }

  render (){
    return (
      <div>
        <h1> EDIT THIS CAMPUS! </h1><br />
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
          label="Edit Campus"
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
    selectedCampus: state.selectedCampus
  };
}

function mapDispatchToProps(dispatch){
  return {
    handleSubmit: function (event){
      event.preventDefault();
      const id = this.state.id
      const name = this.state.name;
      const description = this.state.description;
      const imageUrl = this.state.imageUrl;
      const campus = {id, name, imageUrl, description};

      dispatch(updateCampus(campus));
    },
    handleTextChange: function (event, stateProperty){
      const newStateObj = {};
      newStateObj[stateProperty] = event.target.value;
      newStateObj.dirty = true;
      this.setState(newStateObj);
    },
    clearStateOnMount: function(){
      this.setState({
        name: '',
        campus: {},
        dirty: true
      })
    },
    setReduxStateOnMount: function(){
      const path = this.props.location.pathname.split('/')
      const campusId = path[path.length-1]
      dispatch(selectCampus(campusId))
    }
  }
}

const AddCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddCampus))



export default AddCampusContainer;



// should put in error handling on the front end
// could make the GPA a dropdown menu
// set the first element on the campus selector to be a campus
