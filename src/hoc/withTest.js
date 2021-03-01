import React from 'react';

const withTest = (Component) => {
    return class extends React.Component {
        state = {
            test: true
        }
        render() {
            return <Component
                {...this.props}
                test={this.state.test}
            />;
        }
    }
};

export default withTest;