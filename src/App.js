import React, { Component } from 'react';
import './App.css';
// import './jsTests/example';
// import User from './Components/User';
// import SurName from './Components/SurName';
// import Age from './Components/Age.jsx';
// import Card from './Components/Card';
// import './jsTests/classJs';
// import A from './test/A';
// import B from './test/B';
// import D from './test/D';
// import Counter from './test/Counter';
import ToDo from './Components/ToDo/ToDo';

class App extends Component {
  state = {
    login: false
  }
  toggleLogin = () => {
    this.setState({
      login: !this.state.login
    });
  }
  render() {
    //data
    // const cards = [
    //   {
    //     imgUrl: 'https://onex.am/img/svg/step1.svg',
    //     imgAlt: 'World Countries',
    //     text: 'Card1 Description'
    //   },
    //   {
    //     imgUrl: 'https://onex.am/img/svg/step2.svg',
    //     imgAlt: 'Shopping Pic',
    //     text: 'Card2 Description'
    //   },
    //   {
    //     imgUrl: 'https://onex.am/img/svg/step3.svg',
    //     imgAlt: 'Smart Delivery',
    //     text: 'Card3 Description'
    //   }
    // ]


    // const { login } = this.state;
    // const element = <p>Element P </p>;
    // const elements = cards.map((card, index) => {
    //   return (
    //     <Card
    //       key={index}
    //       img={card.imgUrl}
    //       text={card.text}
    //       imgAlt={card.imgAlt}
    //     />
    //   )
    // })



    return (

      <div className="App">

          <ToDo />





        {/* {element}

        <div className="card_wrapper">
          {login && elements}
        </div> */}

        {/* {
          login && <Card
            img={"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"}
            text="Test"
            imgAlt="pic"
          />
        } */}
        {/* <div>
          <button onClick={this.toggleLogin}>
            {login ? 'Logout' : 'Login'}
          </button>
        </div> */}
      </div>
    )
  }
}








export default App;
