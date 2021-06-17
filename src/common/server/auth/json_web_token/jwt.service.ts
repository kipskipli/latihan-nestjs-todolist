import { Injectable } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(
    private jwtService: JWTService
  ) {}

  async sign(payload): Promise<string> {
      return this.jwtService.signAsync(payload)
  }
}