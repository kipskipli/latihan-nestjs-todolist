import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InspigoJwtService {
  constructor(
    private jwtService: JwtService
  ) {}

  async sign(payload): Promise<string> {
    delete payload.exp;
    delete payload.iat;
    delete payload.iss;
    return await this.jwtService.sign(payload)
  }
}