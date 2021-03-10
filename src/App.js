import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
//Pages
import ToDo from './Components/pages/ToDo/ToDo';
import Contact from './Components/pages/Contact/Contact';
import About from './Components/pages/About/About';


class App extends Component {

  render() {

    return (
      <div className="App">
        <Navbar />
        <Switch>

          <Route path="/" component={ToDo} exact />
          <Route path="/contact" component={Contact} exact />
          <Route path="/about" component={About} exact />
          <Redirect to="/" />


          {/* 
            example 2 

            <Route path="/" exact>
              <ToDo />
            </Route>
            <Route path="/contact" exact>
              <Contact />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
             */}

          {/* 

          example 3
          <Route path="/" render={() => <ToDo />} exact />
          <Route path="/contact" render={() => <Contact />} exact />
          <Route path="/about" render={() => <About />} exact /> 
          */}

        </Switch>

      </div>
    )
  }
}





export default App;
