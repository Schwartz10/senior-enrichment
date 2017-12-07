import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux';
import { fetchCampuses } from '../reducers';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import ActionInfo from 'material-ui/svg-icons/action/info';


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

  componentWillUpdate(nextProps){
    if (nextProps.campuses === this.props.campuses) this.props.getCampuses();
  }

  render(){
    return(
      <div>
        <RaisedButton
          className="raised_button"
          label="Add Campus"
          primary={true}
          containerElement={<Link to="/add-campus" />}
        />
        <div style={styles.root}>
          <GridList cellHeight={350} style={styles.gridList} >
            <Subheader className='subheader'>Campuses</Subheader>
            {this.props.campuses.map((campus) => (
              <GridTile
                containerElement={<Link to={`/campuses/${campus.id}`} />}
                key={campus.id}
                className="campus_grid_tile"
                title={campus.name}
                subtitle={<span> See More </span>}
                actionIcon={<IconButton><ActionInfo color="white" /></IconButton>}
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

const CampusesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Campuses));



export default CampusesContainer;
