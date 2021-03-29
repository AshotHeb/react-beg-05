import { connect } from 'react-redux';

const ReduxDemo2 = (props) => {

    return (
        <div>
            <h1>Redux Demo 2  Component</h1>
            {props.counter}
            <div>
                <button onClick={props.plus}>plus</button>
                <button onClick={props.minus}>Minus</button>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        plus: () => dispatch({ type: "plusCount" }),
        minus: function () {
            dispatch({ type: "minusCount" });
        }
    }
}

const ReduxDemo2WithStore = connect(mapStateToProps, mapDispatchToProps)(ReduxDemo2);

export default ReduxDemo2WithStore;

