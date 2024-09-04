import { KeyboardEvent } from "react";

export const handleNextFocusEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        const form = (event.target as HTMLFormElement).form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
};
