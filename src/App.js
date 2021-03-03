import React, { Component } from 'react';
import './App.css';
import ToDo from './Components/ToDo/ToDo';
// import Row from './Demo/Row';


class App extends Component {

  render() {
    // const style = {
    //   width: "50px",
    //   height: "50px",
    //   backgroundColor: "red"
    // }
    return (
      <div className="App">
        <ToDo />
        {/* <Row>
          <div style={style}></div>
          <div style={style}></div>
        </Row>

        <Row>
          <div style={style}></div>
          <div style={style}></div>
        </Row> */}
      </div>
    )
  }
}





export default App;
