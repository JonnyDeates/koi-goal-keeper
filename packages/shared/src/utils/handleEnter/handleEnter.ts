export const handleEnter = <T>(event: KeyboardEvent, callback: ((x: T) => void), x: T) => {
    if (event.key === "Enter") {
        event.preventDefault();
        callback(x);
    }
};
