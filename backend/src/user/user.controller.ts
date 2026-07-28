import { Controller, Post, Body, ParseIntPipe, Patch, Param, Delete, UseGuards, Get, Query } from '@nestjs/common';
import { CreateUserDto, SearchUserDto, UpdatePasswordDto } from './dto';
import { AuditService } from 'src/audit/audit.service';
import { UserService } from './user.service';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards'
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Req } from '@nestjs/common';
import { UserRole } from 'src/db/enums';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Users")
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers(@Query() query: SearchUserDto) {
        return this.userService.getUsers(query);
    }

    // Only admins can create users
    @Post()
    @Roles(UserRole.ADMIN)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    // Logged-in user updates their own name
    @Patch("me/name")
    updateName(
        @Req() req: Request & { user: any },
        @Body() name: string
    ) {
        console.log(req.user)
        return this.userService.updateName(req.user.id, name);
    }

    // Logged-in user changes their own password
    @Patch("me/password")
    updatePassword(
        @Req() req: Request & { user: any },
        @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
        return this.userService.updatePassword(req.user.id, updatePasswordDto);
    }

    // Only admins can delete users
    @Delete(":id")
    @Roles(UserRole.ADMIN)
    deleteUser(@Param("id", ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
