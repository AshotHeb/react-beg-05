
const B = (props) => {
    console.log('props B'  ,props);
    return (
        <div className="B">
            <h1>B Component</h1>
            <div>{props.children.props.children[0]}</div>
        </div>
    )
}

export default B;