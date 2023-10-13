import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) {}

  login() {
    return 'login'
  }

  logout() {
    return 'logout'
  }
}
