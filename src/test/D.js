import React, { Component } from 'react';

class D extends Component {
    // constructor(props){
    //     // this.props = props;
    // }
    render() {
        console.log("this.props", this.props);
        const { name, username } = this.props;
        return (
            <div>
                <h1>I am D Class Component</h1>
                <p>Name = {name} </p>
                <p>UserName ={username}</p>
            </div>
        )
    }
}

export default D;