import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async create(userId: string) {
    const value = this.jwtService.sign(
      { user: userId },
      { secret: process.env.TOKEN_HASH },
    );

    return value;
  }
}
