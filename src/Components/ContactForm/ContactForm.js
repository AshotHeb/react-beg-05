import React, { createRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './form.module.css';

const inputsInfo = [
    {
        name: "name",
        controlId: "formBasicName",
        label: "Name",
        type: "text",
    },
    {
        name: "email",
        controlId: "formBasicEmail",
        label: "Email",
        type: "email",
    },
    {
        name: "phoneNumber",
        controlId: "formBasicNumber",
        label: "Phone Number",
        type: "number",
    },
    {
        name: "message",
        controlId: "textareaForContactPage",
        label: "Message",
        as: "textarea",
        rows: 3,
        maxLength: 100,
    },

]
class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            message: ""
        }

    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const inputs = inputsInfo.map((input, index) => {
            return (
                <Form.Group
                    controlId={input.controlId}
                    className={styles.formGroup}
                    key={index}
                >
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                        name={input.name}
                        type={input.type}
                        placeholder={input.label}
                        as={input.as}
                        rows={input.rows}
                        maxLength={input.maxLength}
                        ref={!index ? this.inputRef : null}
                        onChange={this.handleChange}
                        value={this.state[input.name]}
                    />
                </Form.Group>

            );
        })
        return (
            <div style={{ width: "40%", margin: "0 auto" }}>
                <Form>
                    {inputs}
                    <Button variant="primary" type="submit">
                        Submit
            </Button>
                </Form>
            </div>
        );
    }
}

export default ContactForm;