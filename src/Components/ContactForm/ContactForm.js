import React, { useContext, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Preloader from '../Preloader/Preloader';
import styles from './form.module.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ContactContext } from '../../Context/ContactPageContext';
import actionTypes from '../../Redux/actionTypes';
import { submitContactFormThunk } from '../../Redux/actions';
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
const ContactForm = (props) => {
    const nameInputRef = useRef(null);
    const context = useContext(ContactContext);

    useEffect(() => {
        nameInputRef.current.focus();
    }, []);

    const {
        formData,
        loading,
        //functions,
        changeInputValue,
        submitContactForm
    } = props;
    const {
        errorMessage,
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
                    ref={!!!index ? nameInputRef : null}
                    name={input.name}
                    type={input.type}
                    placeholder={input.label}
                    as={input.as}
                    rows={input.rows}
                    value={formData[input.name].value}
                    onChange={(e) => changeInputValue(e.target)}

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
                    onClick={() => submitContactForm(formData, props.history)}
                    disabled={!isValid}
                >
                    Submit
            </Button>
            </Form>
            {
                loading  && <Preloader />
            }
        </div>
    );

}
const mapStateToProps = (state) => {
    return {
        formData: state.contactState.formData,
        loading:state.todoState.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputValue: (target) => dispatch({ type: actionTypes.CHANGE_INPUT_VALUE, target }),
        submitContactForm: (formData, history) => dispatch(submitContactFormThunk(formData, history))

    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContactForm));