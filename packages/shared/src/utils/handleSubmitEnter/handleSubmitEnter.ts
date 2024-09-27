import { type FormEvent, type KeyboardEvent } from "react";

export const handleSubmitEnter = (event: KeyboardEvent, callback: (event: FormEvent<HTMLFormElement>) => void) => {
    if (event.key === "Enter") {
        event.preventDefault();
        callback(event as KeyboardEvent<HTMLFormElement>);
    }
};