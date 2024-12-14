import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private refreshTokens = new Map<string, string>();

  private users = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../users.json'), 'utf8'),
  );

  constructor(private jwtService: JwtService) {}

  findUser(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async validateUser(username: string, password: string) {
    const user = this.findUser(username);
    if (user && bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  generateTokens(user: any) {
    try {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      this.refreshTokens.set(user.id, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Failed to generate token. ${error.message}`);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      if (this.refreshTokens.get(decoded.sub) !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(decoded);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
