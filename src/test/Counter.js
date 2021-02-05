import React, { Component } from 'react';
import Country from './Country';

class Counter extends Component {
    // constructor(props) {
    //     super();
    //     this.state = {
    //         counter: props.counter,
    //         componentName: 'Counter',
    //         isArmenia: true
    //     }
    //     this.toggleChangeCountry = this.toggleChangeCountry.bind(this)
    // }
    state = {
        counter: this.props.counter,
        componentName: 'Counter',
        isArmenia: true
    }
    setCounter = (SEvent) => {
        // this.state.counter = this.state.counter + 1;    Սխալ
        // console.log('state' , this.state);
        this.setState({
            counter: this.state.counter + 1
        })
    }
    toggleChangeCountry = () => {
        this.setState({
            isArmenia: !this.state.isArmenia
        })
    }
    render() {

        const { counter } = this.state;
        return (
            <div>
                <div>
                    <p>{counter}</p>
                    <button
                        onClick={this.setCounter}
                    >
                        +
                </button>
                </div>
                <Country
                    isArmenia={this.state.isArmenia}
                    toggleChangeCountry={this.toggleChangeCountry}
                />

            </div>
        )
    }
}



export default Counter;