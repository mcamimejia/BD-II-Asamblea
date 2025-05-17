import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    validatePassword(inputPassword: string, hash: Buffer) {
        return bcrypt.compare(inputPassword, hash.toString());
    }
}
