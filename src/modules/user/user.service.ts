import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 通过userId查询用户信息
   */
  async getUserInfoByUserId(userId: string) {
    if (!userId) {
      return null
    }

    const userInfo = await this.prisma.user.findFirst({
      where: { userId }
    })

    return userInfo
  }

  /**
   * 通过微信openid查询用户信息
   */
  async getUserInfoByWxOpenid(wxOpenid: string) {
    if (!wxOpenid) {
      return null
    }

    const userInfo = await this.prisma.user.findFirst({
      where: { wxOpenid }
    })

    return userInfo
  }
}
