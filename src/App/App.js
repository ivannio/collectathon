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

import MyNavBar from '../components/shared/MyNavBar/MyNavBar';
import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import Search from '../components/pages/Search/Search';
import Collection from '../components/pages/Collection/Collection';
import Footer from '../components/shared/Footer/Footer';

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
    currentPage: '',
  }

  setCurrentPage = (urlString) => {
    this.setState({ currentPage: urlString });
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
    const { currentPage } = this.state;
    const { authed } = this.state;
    const { uid } = this.state;
    return (
      <div className="App">
        <Router>
          <MyNavBar authed={authed} uid={uid}/>
          <Switch>
          <PrivateRoute path="/" exact component={Home} authed={authed} />
          <PublicRoute path="/auth" exact component={Auth} authed={authed} />
          <PrivateRoute path="/search/" setCurrentPage={this.setCurrentPage} exact component={Search} authed={authed} uid={uid} />
          <PrivateRoute path="/collection/" exact component={Collection} authed={authed} uid={uid} />
          </Switch>
          <Footer currentPage={currentPage}/>
        </Router>
      </div>
    );
  }
}

export default App;
