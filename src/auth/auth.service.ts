import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
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

  async login(user: any) {
    try {
      const payload = { username: user.username, sub: user.id };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });

      return {
        accessToken,
      };
    } catch (error) {
      throw new Error(`Failed to generate token. ${error.message}`);
    }
  }
}
