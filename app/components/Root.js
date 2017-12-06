import React, { Component } from 'react';
import TabsComponent from './Tabs';
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Standin from './Standin';
import Home from './Home';
import Campuses from './Campuses';
import Students from './Students';
import AddStudent from './AddStudent';
import SingleStudent from './SingleStudent';


export default class Root extends Component {
  constructor(props){
    super(props)
    // this.state = store.getState()
  }

  render(){
    console.log(this.context)
    return (
      <Router>
        <MuiThemeProvider >
          <div>
            <div>
              <TabsComponent />
            </div>
            <div>
              <Switch>
                <Route exact path={'/campuses'} component={Campuses} />
                <Route exact path={'/campuses/:id'} component={Standin} />
                <Route exact path={'/students'} component={Students} />
                <Route exact path={'/students/:id'} component={SingleStudent} />
                <Route exact path={'/add-student'} component={AddStudent} />
                <Route exact path={'/'} component={Home} />
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}
