import React from 'react';

class LifeCycle extends React.Component {
    constructor(props) {
        // console.log('Constructor');
        super(props);
        this.state = {
            test: false
        }
    }

    toggleTest = () => {
        this.setState({
            test: !this.state.test
        });
    }
    static getDerivedStateFromProps(nextProps, nextState) {
        // console.log('getDerivedStateFromProps');
        // console.log('nextProps', nextProps);
        // console.log('nextState', nextState);
        return null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Math.random() > 0.5) return true;
        return false;
    }
    render() {
        // console.log('Render');
        return (
            <div>
                <h1>LifeCycle Component</h1>
                <div>
                    <button onClick={this.toggleTest}>{this.state.test ? 'True' : 'False'}</button>
                </div>
            </div>
        );
    }
    componentDidMount() {
        // console.log('ComponentDidMount');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return 'SnapShot';
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('componentDidUpdate');
        // console.log('prevProps', prevProps);
        // console.log('prevState', prevState);
        // console.log('snapshot' ,snapshot);
    }
    componentWillUnmount() {
        // console.log('componentWillUnmount');
    }


};

export default LifeCycle;

