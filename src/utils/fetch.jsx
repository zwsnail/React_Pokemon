import { useState, useEffect, useRef } from 'react';

// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [isPending, setIsPending] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const abortCont = new AbortController();

//         fetch(url, { signal: abortCont.signal })
//             .then(res => {
//                 if (!res.ok) { // error coming back from server
//                     throw Error('could not fetch the data for that resource');
//                 }
//                 return res.json();
//             })
//             .then(data => {
//                 setIsPending(false);
//                 setData(data);
//                 setError(null);
//             })
//             .catch(err => {
//                 if (err.name === 'AbortError') {
//                     console.log('fetch aborted')
//                 } else {
//                     // auto catches network / connection error       
//                     setIsPending(false);
//                     setError(err.message);
//                 }
//             })
//         // abort the fetch
//         return () => abortCont.abort();
//     }, [url])

//     return { data, isPending, error }
// }


// with cache fetch
const useFetch = (url) => {
    const cache = useRef({});
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('fetching');
            if (cache.current[url]) {
                const data = cache.current[url];
                setData(data);
                setStatus('fetched');
            } else {
                const response = await fetch(url);
                const data = await response.json();
                cache.current[url] = data; // set response in cache;
                setData(data);
                setStatus('fetched');
            }
        };

        fetchData();
    }, [url]);

    return { status, data };
};





export default useFetch;
