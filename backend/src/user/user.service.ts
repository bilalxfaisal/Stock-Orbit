import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, SearchUserDto, UpdatePasswordDto } from './dto';
import { User } from 'src/db/schema';
import { db } from 'src/db/db';
import { eq, ilike, SQL, and } from 'drizzle-orm';
import bcrypt from "bcrypt"
import { AuditService } from 'src/audit/audit.service';
import { AuditAction, AuditEntity, UserRole } from 'src/db/enums';

// Manages Users

@Injectable()
export class UserService {

    constructor(private readonly auditService: AuditService) { }

    async getUsers(query?: SearchUserDto) {
        const conditions: SQL[] = [];

        if (query?.name) {
            conditions.push(
                ilike(User.name, `%${query.name}%`)
            );
        }
        if (query?.role) {
            conditions.push(
                eq(User.role, query.role)
            );
        }

        return await db
            .select({
                id: User.id,
                name: User.name,
                email: User.email,
                phoneNumber: User.phoneNumber,
                role: User.role,
            })
            .from(User)
            .where(
                conditions.length
                    ? and(...conditions)
                    : undefined
            );
    }
    async createUser(createUserDto: CreateUserDto) {

        const [existingUser] = await db.select().from(User)
            .where(eq(User.email, createUserDto.email));

        if (existingUser) {
            throw new BadRequestException("User with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const [newUser] = await db
            .insert(User)
            .values({
                ...createUserDto,
                password: hashedPassword,
            })
            .returning();

        this.auditService.log({
            action: AuditAction.CREATE,
            entity: AuditEntity.USER,
            entityId: newUser.id,
            role: newUser.role as UserRole,
            description: `ADMIN created new ${newUser.role} #${newUser.id}.`
        })

        const { password, ...user } = newUser
        return user;
    }

    async updateName(id: number, newName: string) {

        const user = await this.userExists(id);

        const [updatedUser] = await db.update(User).set({
            name: newName,
        })

        this.auditService.log({
            action: AuditAction.UPDATE,
            entity: AuditEntity.USER,
            entityId: user.id,
            role: user.role as UserRole,
            description: `${user.role} #${user.id} updated thier name.`
        })

        return {
            message: "Name updated",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        }
    }

    async updatePassword(id: number, passwordDto: UpdatePasswordDto) {

        const user = await this.userExists(id);

        const passwordIsCorrect = await bcrypt
            .compare(passwordDto.oldPassword, user.password);

        if (!passwordIsCorrect) {
            throw new BadRequestException("Current password is incorrect!")
        }

        const passwordIsSame = await bcrypt
            .compare(passwordDto.newPassword, user.password);

        if (passwordIsSame) {
            throw new BadRequestException("New password must be different then current password!")
        }

        const hashedNewPassword = await bcrypt.hash(passwordDto.newPassword, 10);

        const [updatedUser] = await db.update(User).set({
            password: hashedNewPassword,
        }).where(eq(User.id, id)).returning();

        this.auditService.log({
            action: AuditAction.UPDATE,
            entity: AuditEntity.USER,
            entityId: updatedUser.id,
            role: updatedUser.role as UserRole,
            description: `${updatedUser.role} #${updatedUser.id} updated thier password.`
        })

        return {
            message: "Password updated!"
        }
    }

    async deleteUser(id: number) {

        // 1. Check User
        const existingUser = await this.userExists(id);

        // 2. Delete User
        const [deletedUser] = await db
            .delete(User)
            .where(eq(User.id, id))
            .returning();

        // 3. Don't return password
        const { password, ...user } = deletedUser;

        this.auditService.log({
            action: AuditAction.DELETE,
            entity: AuditEntity.USER,
            entityId: deletedUser.id,
            role: deletedUser.role as UserRole,
            description: `ADMIN deleted ${deletedUser.role} #${deletedUser.id}.`
        })

        return {
            message: "User deleted successfully.",
            user,
        };
    }

    private async userExists(id: number) {

        const [existingUser] = await db
            .select()
            .from(User)
            .where(eq(User.id, id));

        if (!existingUser) {
            throw new NotFoundException("User not found!");
        }

        return existingUser;
    }
}
