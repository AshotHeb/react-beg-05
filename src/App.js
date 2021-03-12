import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
//Pages
import ToDo from './Components/pages/ToDo/ToDo';
import Contact from './Components/pages/Contact/Contact';
import About from './Components/pages/About/About';
import NotFound from './Components/pages/NotFound/NotFound';
import SingleTask from './Components/pages/SingleTask/SingleTask';


class App extends Component {

  render() {

    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" component={ToDo} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/about" component={About} exact />
          <Route path="/task/:id" component={SingleTask} exact />
          <Route path="/404" component={NotFound} exact />
          <Redirect to="/404" />
        </Switch>

      </div>
    )
  }
}





export default App;
