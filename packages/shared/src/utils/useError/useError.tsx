import {useState} from "react";
import {type ErrorType} from "@repo/types";

export type ErrorActionsType<T> = {
    reset: ()=> void;
    set: (newErrorState: ErrorType<T>) => void,
    add: (type: T, newError: string)=> void,
    remove: (type: T) => void,
}


export function useError <T extends string | number | symbol = string>() {
    const [error, setError] = useState<ErrorType<T>>({});

    const ErrorActions: ErrorActionsType<T> = ({
        reset: () => { setError({}); },
        set: (newErrorState: ErrorType<T>) => { setError(newErrorState); },
        add: (type: T, newError: string) =>
            {
                setError(prevState => ({...prevState, [type]: newError}));

                },
        remove: (type: T) => { setError(prevSate => {
            const newState = {...prevSate};
            delete newState[type];
            return newState;
        }); }
    });

    const handleCatchError = ({response: {data: {error: newError}}}: {response: {data: {error: object | string}}}) => {
            if (typeof newError === 'object')
                ErrorActions.set(newError);
            else
                ErrorActions.add("request", newError);

        };

    return {error, ErrorActions, handleCatchError};
}