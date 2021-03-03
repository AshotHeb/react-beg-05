import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = {
            title: '',
            description: ''
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleS = ({ key, type }) => {
        const { title, description } = this.state;
        const { handleSubmit, onHide } = this.props;
        if (
            (type === 'keypress' && key !== 'Enter') ||
            (!title || !description)
        ) return;

        const formData = {
            title,
            description
        };
        handleSubmit(formData);
        onHide();

    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {

        const { title, description } = this.state;
        const { onHide } = this.props;

        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Task Modal
              </Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Form.Control
                        name="title"
                        type="text"
                        placeholder="Title"
                        onChange={this.handleChange}
                        onKeyPress={this.handleS}
                        value={title}
                        style={{ width: "70%" }}
                        ref={this.inputRef}
                    />
                    <Form.Control
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}
                        className="my-3"
                        as="textarea"
                        rows={3}
                        style={{ width: "70%", resize: "none" }}
                        value={description}
                    />
                </Modal.Body>
                <Modal.Footer>

                    <Button onClick={onHide} variant="secondary">Close</Button>
                    <Button
                        onClick={this.handleS}
                        variant="primary"
                        disabled={!!!title || !!!description}
                    >
                        Add
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddTask.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired
}
export default AddTask;