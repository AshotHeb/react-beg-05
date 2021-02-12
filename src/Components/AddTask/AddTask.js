import React from 'react';


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
    render() {

        const { inputValue } = this.state;
        const { handleSubmit } = this.props;
        const handleS = () => {
            handleSubmit(inputValue);
            this.setState({
                inputValue: ''
            });
        }
        return (
            <div>
                <input
                    type="text"
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    value={inputValue}
                />
                <button
                    // onClick={()=>handleSubmit(inputValue)}
                    onClick={handleS}
                >
                    Add
                </button>
            </div>
        );
    }
}

export default AddTask;