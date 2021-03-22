import { useState, useEffect, useRef } from 'react';


//useState
// const Hooks = () => {
//     const [counter, setCounter] = useState(0);
//     // const [inputValue, setValue] = useState("");
//     const [formData, setFormData] = useState({
//         name: "",
//         surname: "",
//         phoneNumber: ""
//     });
//     console.log("Hook Render");

//     const setFormValues = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value

//         });
//     }
//     return (
//         <div>
//             <h1>Hooks Demo</h1>
//             <div
//                 style={{ width: "50%", margin: "0 auto", border: "1px solid black" }}
//             >
//                 <p>
//                     Count : {counter}
//                 </p>
//                 <button onClick={() => setCounter(counter + 1)}>Plus</button>
//                 <button onClick={() => setCounter(counter - 1)}>Minus</button>
//             </div>

//             <div
//                 style={{ margin: "50px auto", border: "1px solid black" }}
//             >
//                 <input
//                     type="text"
//                     name="surname"
//                     placeholder="Surname"
//                     value={formData.surname}
//                     onChange={setFormValues}
//                 />
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={formData.name}
//                     onChange={setFormValues}
//                 />
//                 <p>
//                     :
//                 </p>
//             </div>
//         </div>
//     );
// }


const Hooks = () => {
    const [counter, setCounter] = useState(0);
    const [test, setTest] = useState(false);
    const focusInput = useRef(null);
    //ComponentDidUpdate
    useEffect(() => {
        console.log("ComponentDidUpdate");
        return function () {
            console.log("Component Died!Oxormi");

        }
    });

    useEffect(() => {
        console.log("useEffect  counter");
        if (counter === 5) setCounter(0);
        // if(test)console.log("Ayooo!!");
        return function () {
            console.log("Component Died!Oxormi 2 ");

        }
    }, [counter]);

    //componentDidMount
    useEffect(() => {
        console.log("componentDidMount");
        focusInput.current.focus();
        return function () {
            console.log("Component Died!hazar Oxormi");

        }
    }, []);

    return (
        <div>
            <div
                style={{ width: "50%", margin: "0 auto", border: "1px solid black" }}
            >
                <p>
                    Count : {counter}
                </p>
                <button onClick={() => setCounter(counter + 1)}>Plus</button>
                <button onClick={() => setCounter(counter - 1)}>Minus</button>
            </div>
            <div
                style={{ width: "50%", margin: "0 auto", border: "1px solid black" }}
            >
                <p>
                    Test : {test ? "true" : "false"}
                </p>
                <button onClick={() => setTest(!test)}>Change</button>

            </div>

            <div
                style={{ width: "50%", margin: "0 auto", border: "1px solid black" }}
            >
                <input
                    type="text"
                    placeholder="Focus"
                    ref={focusInput}

                />

            </div>
        </div>
    );
}


export default Hooks;


