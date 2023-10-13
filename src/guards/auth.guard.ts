import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { isCloudrun } from 'src/constants/common.constants'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    // 微信云托管服务
    if (isCloudrun) {
      const req = context.switchToHttp().getRequest()
      const isCallContainer = !!req.headers['x-wx-source']
      // 仅支持微信云托管调用
      if (isCallContainer) {
        return true
      }
      return false
    }

    return true
  }
}
