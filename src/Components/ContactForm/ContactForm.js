import React, { createRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './form.module.css';
import { withRouter } from 'react-router-dom';
import {
    isRequired,
    maxLength,
    minLength,
    emailValidation
} from '../../helpers/validators';

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
            name: {
                value: "",
                valid: false,
                error: null
            },
            email: {
                value: "",
                valid: false,
                error: null
            },
            message: {
                value: "",
                valid: false,
                error: null
            },
            errorMessage: "",
            // isValid: false
        }

    }
    handleSubmit = () => {
        const formData = { ...this.state };
        delete formData.errorMessage;
        for (let key in formData) {
            formData[key] = formData[key].value;
        }

        (async () => {
            try {
                const response = await fetch("http://localhost:3001/form", {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (data.error) throw data.error;
                this.props.history.push("/");

            } catch (error) {
                this.setState({
                    errorMessage: error.message
                });
                console.log("Submit Contact Form Request Error", error);
            }
        })()


    }
    handleChange = (event) => {
        const { name, value } = event.target;
        let error = null;
        //validators
        const maxLength25 = maxLength(25);
        const minLength3 = minLength(3);

        switch (name) {
            case "name":
            case "email":
            case "message":
                error = isRequired(value) ||
                    (name === "email" && emailValidation(value)) ||
                    minLength3(value) ||
                    maxLength25(value);
                break;
            default: ;
        }

        this.setState({
            [name]: {
                value,
                valid: !!!error,
                error
            }

        }, () => {
            // this.setState({
            //     isValid: isAllValid(this.state)
            // })
        });

    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { name, email, message, errorMessage } = this.state;
        const isValid = name.valid && email.valid && message.valid;

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
                        value={this.state[input.name].value}
                    />
                    <Form.Text style={{ color: "red" }}>{this.state[input.name].error}</Form.Text>
                </Form.Group>

            );
        })
        return (
            <div style={{ width: "40%", margin: "0 auto" }}>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <p style={{ color: "#fb3838", textTransform: "uppercase" }}>
                        {errorMessage}
                    </p>
                    {inputs}
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.handleSubmit}
                        disabled={!isValid}
                    >
                        Submit
            </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(ContactForm);