
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ServerKeyAuthGuard extends AuthGuard('api-key') {}