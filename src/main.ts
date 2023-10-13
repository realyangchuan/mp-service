import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { AuthGuard } from './guards/auth.guard'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    cors: true
  })

  app.use(helmet())
  app.useGlobalGuards(new AuthGuard())
  app.disable('x-powered-by')

  const port = process.env.PORT ?? 8848
  await app.listen(port, () => {
    console.log(`🚀【App Launched】Now listening on port [${port}]`)
  })
}
bootstrap()
