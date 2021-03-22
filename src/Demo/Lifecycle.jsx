import React from 'react';

class LifeCycle extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Constructor");
        this.state = {
            count: 0
        }
    }
    static getDerivedStateFromProps(nextProps, nextState) {
        // console.log("getDerivedStateFromProps");
        // console.log("1 arg", nextProps);
        // console.log("2 arg", nextState);
        return null;
    }
    componentDidMount() {
        console.log("componentDidMount");
    }
    componentDidUpdate() {
        console.log("componentDidUpdate");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    render() {
        console.log("render", this.state);
        return (
            <div>
                <h1>Lifecycle</h1>
                {this.state.count}
                <div>
                    <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                        Plus
                    </button>
                </div>
            </div>
        );
    }
}

export default LifeCycle;