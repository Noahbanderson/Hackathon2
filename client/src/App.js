import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Navbar from './components/Navbar';
import Login from './components/Login';
import User from './components/User'
import Register from './components/Register';
import View from './components/View'
import VideoForm from './components/VideoForm'
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";

const App = () => (
  <>
    <Navbar />
    <FetchUser>
      <Switch>
        <Route exact path="/view/:id" component={View} />
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/view/:id" component={View} />
          <Route exact path="/edit/:id" component={VideoForm} />
          <ProtectedRoute exact path="/user" component={User}/>
          <Route exact path="/uploadvideo" component={VideoForm}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NoMatch} />
        </Container>
      </Switch>
    </FetchUser>
  </>
)

export default App;