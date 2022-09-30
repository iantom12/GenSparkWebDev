import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserComponent from "./UserComponent";
import UserComponentDetails from "./UserComponentDetails";
class UserRouter extends React.Component {
  render() {
    return (
      <Router>
        <>
          <h1>Instructor Application</h1>
          <Switch>
            <Route path='/' exact component={UserComponent} />
            <Route path='/users' exact component={UserComponentDetails} />
            <Route path='/users/:id' component={UserComponentDetails} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default UserRouter;
