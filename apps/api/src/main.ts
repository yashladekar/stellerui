import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {add} from "@stellerui/sample-lib"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("add",add(1,2))
  await app.listen(3000);
}
bootstrap();
