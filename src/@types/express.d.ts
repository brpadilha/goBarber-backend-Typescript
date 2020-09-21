declare namespace Express {
  // iremos sobrescrever a tipagem express
  export interface Request {
    // irá anexar essa tipagem no request do express
    user: {
      id: string;
    };
  }
}
