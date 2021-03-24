import { createContext, useState } from 'react';
export const HooksContext = createContext();
console.log("context", HooksContext);

const HooksStateProvider = (props) => {
    const [counter, setCounter] = useState(0);
   
    return <HooksContext.Provider
        value={
            {
                counter,
                setCounter
            }
        }
    >
        {props.children}
    </HooksContext.Provider>
}


export default HooksStateProvider;