import { useEffect, useState, useRef } from 'react';

export const Timer = () => {
    // const [inputValue, setInputValue] = useState("");
    // const count = useRef(0);

    // useEffect(() => {
    //     count.current = count.current + 1;
    // });



    const [count, setCount] = useState(0);
    // Get the previous value (was passed into hook on last render)
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        console.log("useEffect");
        ref.current = count;
    }, [count]);

    return (
        <div>
            {/* <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            {console.log("inputValue", inputValue)}

            <h1>Render Count: {count.current} </h1> */}



            <div className="App">
                <h1>
                    Now: {count}, before: {ref.current}
                </h1>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>

        </div>
    )
}