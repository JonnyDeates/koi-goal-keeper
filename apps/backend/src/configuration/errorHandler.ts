import {Request, Response} from "express";

const errorHandler = (error: {status: number, message: string}, req: Request, res: Response) => {
    const code = error.status || 500;

    if (process.env.NODE_ENV === 'production') {
        error.message = code === 500 ? 'internal server error' : error.message;
    } else {
        console.error(error);
    }
    res.status(code);
    res.json({message: error.message});
}
export default  errorHandler;