import { Module } from '@nestjs/common'
import { SystemModule } from './modules/system/system.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [SystemModule, UserModule]
})
export class AppModule {}
