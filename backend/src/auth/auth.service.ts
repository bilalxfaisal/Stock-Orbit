import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { db } from 'src/db/db';
import { User } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import * as jwt from "jsonwebtoken"
import * as crypto from "crypto"
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity, UserRole } from 'src/db/enums';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly auditService: AuditService
    ) { }

    async login(loginDto: LoginDto) {

        const user = await this.verifyUser(loginDto);

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "10d",
            algorithm: "HS256",
        });

        this.auditService.log({
            action: AuditAction.LOG_IN,
            entity: AuditEntity.USER,
            entityId: user.id,
            role: user.role as UserRole,
            description: `${user.role} '${user.name}' logged in.`
        })

        return {
            access_token: token,
        };
    }

    private async verifyUser(loginDto: LoginDto) {

        const [user] = await db
            .select()
            .from(User)
            .where(eq(User.email, loginDto.email));

        if (!user) {
            throw new BadRequestException(
                "Invalid email or password."
            );
        }

        const validPassword = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!validPassword) {
            throw new BadRequestException(
                "Invalid email or password."
            );
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    }
}
