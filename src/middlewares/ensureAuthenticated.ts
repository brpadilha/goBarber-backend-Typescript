import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function defaultAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const autheHeader = request.headers.authorization;

  if (!autheHeader) {
    throw new Error('Token must be provided');
  }

  //[bearer, token] - precisaremos somente do token, por isso somente um espaço em branco no primeiro
  const [, token] = autheHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; //forçando que o sub é do tipo TokenPayload pois ele vai identificar que é um objeto ou umas tring

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT Token');
  }
}
