import React from 'react';
import { Form, Button } from 'react-bootstrap';

class AddTask extends React.Component {
    state = {
        inputValue: ''
    }
    handleChange = (event) => {
        const { value } = event.target;
        this.setState({
            inputValue: value
        });
    }
    handleS = ({ key, type }) => {
        if (type === 'keypress' && key !== 'Enter') return;

        const { inputValue } = this.state;
        const { handleSubmit } = this.props;

        handleSubmit(inputValue);
        this.setState({
            inputValue: ''
        });
    }
    render() {
        const { inputValue } = this.state;
        const { disabled } = this.props;


        return (
            <div className="d-flex justify-content-center mt-4">
                <Form.Control
                    type="text"
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    onKeyPress={this.handleS}
                    value={inputValue}
                    style={{ width: "70%" }}
                    disabled={disabled}

                />
                <Button
                    variant="primary"
                    onClick={this.handleS}
                    disabled={!!!inputValue}
                >
                    Add
                </Button>
            </div>
        );
    }
}

export default AddTask;