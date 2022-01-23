import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, request, response, _) => {
  console.error('Error', error);

  const res: any = { message: 'Internal Server Error' };

  return response.status(500).json(res);
};

export default errorHandler;
