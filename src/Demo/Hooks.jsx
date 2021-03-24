import { useState, useRef  ,useContext} from 'react';
import "../Context/ContextDemo";
import { HooksContext } from '../Context/ContextDemo';


//exacmple 1

// const Hooks = (props) => {

//     return (

//         <HooksContext.Consumer>
//             {(context) => {
//                 console.log("Hooks Component Context", context);
//                 const { counter, setCounter } = context;
//                 return (
//                     <div>
//                         <div
//                             style={{ width: "50%", margin: "0 auto", border: "1px solid black" }}
//                         >
//                             <p>
//                                 Count : {counter}
//                             </p>
//                             <button onClick={() => setCounter(counter + 1)}>Plus</button>
//                             <button onClick={() => setCounter(counter - 1)}>Minus</button>
//                         </div>

//                     </div>
//                 )
//             }
//             }
//         </HooksContext.Consumer>

//     );
// }



const Hooks = (props) => {
    const context = useContext(HooksContext);
    return (
        <div>
            <div
                style={{ width: "50%", margin: "0 auto", border: "1px solid black" }}
            >
                <p>
                    Count : {context.counter}
                </p>
                <button onClick={() => context.setCounter(context.counter + 1)}>Plus</button>
                <button onClick={() => context.setCounter(context.counter - 1)}>Minus</button>
            </div>

        </div>


    );
}
export default Hooks;


