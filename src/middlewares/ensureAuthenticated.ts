import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

export default function (
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new Error('JWT is missing');
  }

  // const token = authHeaders?.split(' ')[1];
  const [, token] = authHeaders?.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    req.customer = { id: sub };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
