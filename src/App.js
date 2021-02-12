import React, { Component } from 'react';
import './App.css';
import ToDo from './Components/ToDo/ToDo';
// import A from './test/A';
// import image from './assets/images/person.jfif';
// import Grid from './test/Grid/Grid';

class App extends Component {
  state = {
    counter: 0
  }
  plusCounter = () => {
    this.setState({
      couter: this.state.counter + 1
    });
  }
  render() {

    return (

      <div className="App">
        {/* <Grid /> */}
        {/* <img src={image} alt="Person" /> */}
        <ToDo test={true}/>
        {/* <A /> */}
      </div>
    )
  }
}








export default App;
