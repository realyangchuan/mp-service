import { Controller, Post, Headers } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('info')
  getUserInfo(@Headers('x-wx-openid') openid: string) {
    return this.userService.getUserInfoByWxOpenid(openid)
  }
}
