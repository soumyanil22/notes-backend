import Express from "express"

interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
}

export function sendResponse<T>(res: Express.Response, statusCode: number, message: string, data?: T): void {
    const response: ApiResponse<T> = {
        status: statusCode === 200 ? 'success' : 'error',
        message,
        data,
    };

    res.status(statusCode).json(response);
}