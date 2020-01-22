import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Search from '../components/pages/Search/Search';
import Collection from '../components/pages/Collection/Collection';

import './App.scss';
import authData from '../helpers/data/authData';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

firebaseConnection();

class App extends React.Component {
  state = {
    authed: false,
    uid: '',
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        this.setState({ uid: authData.getUid() });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const { uid } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
          <PrivateRoute path="/" exact component={Home} authed={authed} uid={uid} />
          <PublicRoute path="/auth" exact component={Auth} authed={authed} />
          <PrivateRoute path="/search" exact component={Search} authed={authed} />
          <PrivateRoute path="/collection/:uid" exact component={Collection} authed={authed} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
