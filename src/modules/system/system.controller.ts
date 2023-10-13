import { Controller, Post } from '@nestjs/common'
import { SystemService } from './system.service'

@Controller()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post('login')
  login() {
    return this.systemService.login()
  }

  @Post('logout')
  logout() {
    return this.systemService.logout()
  }
}
