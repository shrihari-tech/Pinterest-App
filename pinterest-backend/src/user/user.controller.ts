import { Controller, Post, Param, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':id/follow')
  followUser(@Param('id') id: string, @Req() req: any) {
    return this.userService.followUser(req.user.id, id);
  }
}
