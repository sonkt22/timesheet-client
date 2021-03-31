import {
  Injectable,
  NestMiddleware,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import CONFIG from '../lib/config/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: Function) {
    console.log('RUN MiddlewareVerifyToken');
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            status: 'FORBIDDEN',
            message: 'Token must be provided',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      const cleanToken = token.replace('Bearer', '').trim();

      const decoded = jwt.verify(cleanToken, CONFIG.tokenSecret);

      req.headers['id'] = decoded['id'];

      return next();
    } catch (error) {
      if (error.message === 'jwt expired') {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            status: 'FORBIDDEN',
            message: 'Token expired',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      if (error.message === 'invalid signature') {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            status: 'FORBIDDEN',
            message: 'Token incorrect',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      if (error.message === 'jwt malformed') {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            status: 'FORBIDDEN',
            message: 'Token incorrect',
          },
          HttpStatus.FORBIDDEN,
        );
      }
      throw error;
    }
  }
}
