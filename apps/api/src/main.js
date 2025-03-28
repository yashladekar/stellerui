"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const sample_lib_1 = require("@stellerui/sample-lib");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log('add', (0, sample_lib_1.add)(1, 2));
    await app.listen(3000);
}
bootstrap();
