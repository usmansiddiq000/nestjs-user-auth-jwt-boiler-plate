import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

interface IUserRequest extends Request {
    user: any
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
   constructor(private readonly jwtService: JwtService ){}

  use(req: IUserRequest, res: Response, next: NextFunction) {
    const token = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(!token) return next();
    const user = this.jwtService.verify(token);
    req.user = user;
    next();
  }
}
