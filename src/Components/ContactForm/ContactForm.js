import React, { createRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './form.module.css';
import { withRouter } from 'react-router-dom';

import { ContactContext } from '../../Context/ContactPageContext';

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
const ContactForm = () => {
    const context = useContext(ContactContext);
    const {
        formData,
        errorMessage,
        handleChange,
        handleSubmit
    } = context;
    const { name, email, message } = formData;
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
                    value={formData[input.name].value}
                    onChange={handleChange}

                />
                <Form.Text style={{ color: "red" }}>{formData[input.name].error}</Form.Text>
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
                    onClick={handleSubmit}
                    disabled={!isValid}
                >
                    Submit
            </Button>
            </Form>
        </div>
    );

}

export default withRouter(ContactForm);