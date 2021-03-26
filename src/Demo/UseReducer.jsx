import { useEffect, useReducer, useRef } from 'react';

const initialState = {
    counter: 0
}
const reducer = (state, action) => {
    switch (action.type) {
        case "+":
            return {
                ...state,
                counter: state.counter + 1
            }
        case "-":
            return {
                ...state,
                counter: state.counter - 1
            }
        case "ankap":
            return {
                ...state,
                ankap: true
            }
        case "setCount":
            return {
                ...state,
                counter: action.count
            }
        default:
            throw new Error();
    }
}


const UseReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const countInput = useRef(null);


    const handelSetCount = () => {
        // const action3 = {
        //     type: "setCount",
        //     count: +countInput.current.value
        // }
        dispatch({
            type: "setCount",
            count: +countInput.current.value
        });
        countInput.current.value = "";
    }
    return (
        <div>
            <h1>UseReducer</h1>
            <div style={{ border: "1px solid black", padding: "20px" }}>
                Counter : {state.counter}

                <div>
                    <button onClick={() => dispatch({ type: "+" })}>+</button>
                    <button onClick={() => dispatch({ type: "-" })}>-</button>
                    <button onClick={() => dispatch({ type: "ankap" })}>Ankap</button>
                </div>
                <div>
                    <input type="number" ref={countInput} />
                    <button onClick={handelSetCount}>Set</button>
                </div>
            </div>
        </div>
    )
}
export default UseReducer;