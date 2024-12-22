import { useEffect, useState } from "react";
import { DateToAgo, DateToFuture } from "../../Utils/DateTransformer";

const CountdownComponent = ({ time }) => {
    const [diff, setDiff] = useState(null);
    
    useEffect(() => {
        if(new Date(time) - Date.now() > 3600000) {
            setDiff(DateToFuture(time))
        }
        else {
            const interval = setInterval(() => setDiff(DateToFuture(time)), 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [time]);
    return <h1>
        {diff}
    </h1>
}

export default CountdownComponent;