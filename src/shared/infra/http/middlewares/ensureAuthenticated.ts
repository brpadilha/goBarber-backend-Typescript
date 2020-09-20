import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../errors/AppError';

import authConfig from '../../../../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function defaultAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const autheHeader = request.headers.authorization;

  if (!autheHeader) {
    throw new AppError('Token must be provided', 401);
  }

  // [bearer, token] - precisaremos somente do token, por isso somente um espaço em branco no primeiro
  const [, token] = autheHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; // forçando que o sub é do tipo TokenPayload pois ele vai identificar que é um objeto ou umas tring

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
