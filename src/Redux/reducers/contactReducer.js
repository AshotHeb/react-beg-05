import actionTypes from '../actionTypes';
import {
    isRequired,
    maxLength,
    minLength,
    emailValidation
} from '../../helpers/validators';
const maxLength25 = maxLength(25);
const minLength3 = minLength(3);

const initialState = {
    formData: {
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
        }
    }
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_INPUT_VALUE: {
            const { value, name } = action.target;
            let error = null;
            //validators
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
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [name]: {
                        value,
                        valid: !!!error,
                        error
                    }
                }
            }
        }
        default: return state;
    }
}

export default contactReducer;