import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipe - MiddleWare
  app.useGlobalPipes(new ValidationPipe({
    // 아무 Decorator도 없는 obj는 거른다.
    whitelist: true,
    // 잘못된 Req 요청 처리 x
    forbidNonWhitelisted: true,
    // Type 변환
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
