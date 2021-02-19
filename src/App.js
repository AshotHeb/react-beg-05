import React, { Component } from 'react';
import './App.css';
import ToDo from './Components/ToDo/ToDo';
// import LifeCycle from './Demo/Lifecycle';


class App extends Component {
  state = {
    isLifeCycle: true
  }
  render() {

    return (

      <div className="App">
        <ToDo />
        {/* {this.state.isLifeCycle && <LifeCycle />} */}
      </div>
    )
  }
}








export default App;
