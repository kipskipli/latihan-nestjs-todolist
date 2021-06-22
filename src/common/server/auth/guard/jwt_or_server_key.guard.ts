
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrServerKeyAuthGuard extends AuthGuard(['jwt', 'api-key']) {}