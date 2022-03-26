import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Service from "../service";
import Profile from "../profile.js";
import Appointment from "../appointment";


class RouterComponent extends React.Component {
  componentDidMount(){
    console.log(this.props.leftSideState)
  }
  render() {
    const currentkey = this.props.location.pathname;    
    return (        
      <TransitionGroup className="trantision-group">
        <CSSTransition key={currentkey} classNames="slide" timeout={1000}>
          <section className="route-section">
            <Switch location={this.props.location}>
              <Route exact path="/dashboard/services" render={(props) => <Service {...props} s={this.props.leftSideState} />}/>
              <Route exact path="/dashboard/services/top" render={(props) => <Service {...props} s={this.props.leftSideState} />}/>
              <Route exact path="/dashboard/services/about"  render={(props) => <Profile {...props} s={this.props.leftSideState} />}/>
              <Route exact path="/dashboard/services/skills" render={(props) => <Appointment {...props} s={this.props.leftSideState} />}/>              
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
export default withRouter(RouterComponent);
