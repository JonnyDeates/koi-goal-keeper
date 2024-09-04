export const debounce = (func: Function, timeout = 300) => {
    let timer: ReturnType<typeof setInterval>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => { // @ts-ignore
            func.apply(this, args); }, timeout);
    };
};