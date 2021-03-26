import { useCallback, useEffect, useState } from 'react';


const UseCallback = () => {
    const [counter, setCounter] = useState(0);
    const [test, setTest] = useState(false);

    const plus = useCallback(() => {
        setCounter(counter + 1);
    }, [counter]);

    const minus = useCallback(() => {
        setCounter(counter - 1);

    },[counter]);

    useEffect(() => {
        console.log("minus");
    }, [minus]);

    useEffect(() => {
        console.log("plus");
    }, [plus]);

    return (
        <div>
            <h1>UseCallback</h1>
            <div style={{ border: "1px solid black", padding: "20px" }}>
                Counter : {counter}

                <button onClick={plus}>Plus</button>
                <button onClick={minus}>Minus</button>
                <p>
                    Test :{test ? "Corona" : "Voch Corona"}
                    <button onClick={() => setTest(!test)}>Change Test Result</button>
                </p>
            </div>
        </div >

    )
}
export default UseCallback;