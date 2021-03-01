import React from 'react';


const withScreenSizes = (Component) => {
    return class extends React.Component {
        state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        handleSetSizes = () => {
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        componentDidMount() {
            window.addEventListener('resize', this.handleSetSizes);
        }
        componentWillUnmount() {
            window.removeEventListener('resize', this.handleSetSizes);
        }
        render() {
            return <Component
                {...this.props}
                width={this.state.width}
                height={this.state.height}
            />
        }
    }
}

export default withScreenSizes;