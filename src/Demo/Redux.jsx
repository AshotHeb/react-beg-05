import { connect } from 'react-redux';

const ReduxDemo = (props) => {
    console.log("ReduxDemo", props);
    const { helloText,
        counter,
        inputValue,
        minusCount,
        plusCount,
        setValue
    } = props;
    return (
        <div>
            <h1>Redux Demo Component</h1>
            <div>
                <p>
                    {helloText}
                </p>
                <p>
                    {counter}
                    <button onClick={plusCount}>+</button>
                    <button onClick={minusCount}>-</button>

                </p>
            </div>

            <div>
                <input
                    type="text"
                    name="text"
                    placeholder="Type A Text"
                    onChange={(e) => setValue(e.target.value)}
                    value={inputValue}
                />

            </div>
            <div>
                Value : {inputValue}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {

    return {
        helloText: state.helloText,
        counter: state.counter,
        inputValue: state.inputValue
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        plusCount: () => dispatch({ type: "plusCount" }),
        minusCount: () => dispatch({ type: "minusCount" }),
        setValue: (inputValue) => {
            dispatch({ type: "setInputValue", inputValue: inputValue })
        }
    }
}
const ReduxDemoWithState = connect(mapStateToProps, mapDispatchToProps)(ReduxDemo);

export default ReduxDemoWithState;