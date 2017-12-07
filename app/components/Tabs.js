import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = {
  headline: {
    fontSize: 30,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    height: 25
  },
};

const TabsComponent = (props) => {
  const currentPath = props.location.pathname.split('/')[1]

  return (

    <Tabs value={currentPath}>
      <Tab containerElement={<Link to={'/'} />} label="Home" value=""></Tab>

      <Tab containerElement={<Link to={'/campuses'} />} label="Campuses" value="campuses">
        <div>
        </div>
      </Tab>

      <Tab containerElement={<Link to="/students" />} label="Students" value="students">
        <div>
        </div>
      </Tab>

    </Tabs>
  );
}

const TabsComponentContainer = withRouter(connect()(TabsComponent))

export default TabsComponentContainer;
