import './App.css';
// import User from './Components/User';
// import SurName from './Components/SurName';
// import Age from './Components/Age.jsx';
import Card from './Components/Card';
// import './jsTests/classJs';
// import A from './test/A';
// import B from './test/B';
// import D from './test/D';
import Counter from './test/Counter';

function App() {
  const card1 = {
    imgUrl: 'https://onex.am/img/svg/step1.svg',
    imgAlt: 'World Countries',
    text: 'Card1 Description'
  };
  const card2 = {
    imgUrl: 'https://onex.am/img/svg/step2.svg',
    imgAlt: 'Shopping Pic',
    text: 'Card2 Description'
  };
  const card3 = {
    imgUrl: 'https://onex.am/img/svg/step3.svg',
    imgAlt: 'Smart Delivery',
    text: 'Card3 Description'
  };

  return (
    <div className="App">
      {/* <div className="card_wrapper">
        <Card img={card1.imgUrl} imgAlt={card1.imgAlt} text={card1.text} obj={card1} />
        <Card img={card2.imgUrl} imgAlt={card2.imgAlt} text={card2.text} />
        <Card img={card3.imgUrl} imgAlt={card3.imgAlt} text={card3.text} active={true} />
      </div> */}

      {/* <A />

      <B text={true}>
        <div className="">
          <h1>B Children</h1>
          <span>I am B Child</span>
        </div>
      </B>

      <D name="Name" username="username"/> */}

      <Counter counter={10}/>

    </div>
  )
}








export default App;
