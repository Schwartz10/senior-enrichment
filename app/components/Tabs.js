import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Route, Switch, Link } from 'react-router-dom';

const styles = {
  headline: {
    fontSize: 30,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    height: 25
  },
};

const TabsComponent = () => {
  return (

    <Tabs>
      <Tab containerElement={<Link to="/" />} label="Home" value="a"></Tab>

      <Tab containerElement={<Link to="/campuses" />} label="Campuses" value="b">
        <div>
        </div>
      </Tab>

      <Tab containerElement={<Link to="/students" />} label="Students" value="c">
        <div>
        </div>
      </Tab>

    </Tabs>
  );
}

export default TabsComponent;
