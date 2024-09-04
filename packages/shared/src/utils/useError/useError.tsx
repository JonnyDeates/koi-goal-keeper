import {useState} from "react";
import {ErrorType} from "@repo/types";


export function useError <T extends string | number | symbol = string>() {
    const [error, setError] = useState<ErrorType<T>>({});

    const ErrorActions = ({
        reset: () => setError({}),
        set: (newErrorState: ErrorType<T>) => setError(newErrorState),
        add: (type: T, newError: string) =>
            setError(prevState =>
                ({...prevState, [type]: newError})
            ),
        remove: (type: T) => setError(prevSate => {
            const newState = {...prevSate};
            delete newState[type]
            return newState;
        })
    })

    return {error, ErrorActions}
}