const Row = (props) => {

    return (
        <div style={{ display: "flex", justifyContent: 'space-between', width: "100%", }}>
            <h1>Title</h1>
            {props.children}
        </div>
    )
};

export default Row;