import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import { fetchCampuses } from '../reducers';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Switch, Link } from 'react-router-dom';

const styles = {
  // root: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  // },
  // gridList: {
  //   width: 80,
  //   height: 450,
  //   overflowY: 'auto',
  // },
};
class Campuses extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getCampuses();
  }

  render(){
    return(
      <div>
        <RaisedButton
          label="Add Campus"
          secondary={true}
          containerElement={<Link to="/add-campus" />}
        />
        <div style={styles.root}>
          <GridList cellHeight={350} style={styles.gridList} >
            <Subheader>Campuses</Subheader>
            {this.props.campuses.map((campus) => (
              <GridTile
                key={campus.id}
                className="campus_grid_tile"
                title={campus.name}
                subtitle={<span> See More </span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img src={campus.imageUrl} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
  )}
}

function mapStateToProps(state){
  return {
    campuses: state.campuses
  };
}

function mapDispatchToProps(dispatch){
  return {
    getCampuses: function (){
      dispatch(fetchCampuses());
    },
  }
}

const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses)



export default CampusesContainer;
