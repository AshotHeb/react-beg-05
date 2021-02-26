import React, { Component } from 'react';
import './App.css';
import ToDo from './Components/ToDo/ToDo';
// import LifeCycle from './Demo/Lifecycle';
import Demo from './Demo/Demo';

class App extends Component {
  state = {
    isLifeCycle: true
  }
  render() {

    return (

      <div className="App">
        {/* <Demo /> */}
        <ToDo />
        {/* <LifeCycle /> */}
        {/* {this.state.isLifeCycle && <LifeCycle />} */}
      </div>
    )
  }
}








export default App;
