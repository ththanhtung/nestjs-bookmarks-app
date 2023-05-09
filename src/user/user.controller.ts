import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

declare module 'express' {
  export interface Request {
    user: any;
  }
}

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    @Get('me')
    getMe(@getUser() user:User, @getUser('email') email){
        console.log(email);
        
        return user
    }

    @Patch()
    editUser(@getUser('id') userId:number ,@Body() dto:EditUserDto){
        return this.userService.editUser(userId, dto)
    }
}
