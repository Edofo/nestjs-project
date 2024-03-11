import { NestFactory, PartialGraphHost, SerializedGraph } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import { urlencoded, json } from "express";
import { writeFileSync } from "fs";
import helmet from "helmet";

import * as logger from "morgan";

import { AppModule } from "@modules/app.module";
import { LoggerService } from "@modules/logger/services/logger.service";

async function bootstrap() {
    const log = new LoggerService();
    const app = await NestFactory.create(AppModule, {
        snapshot: process.env.NODE_ENV === "dev",
        abortOnError: false,
        logger: false,
        // bufferLogs: true,
    });

    // App settings
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new ValidationPipe());
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: "1",
    });

    // Swagger
    const config = new DocumentBuilder()
        .setTitle("M1 - API " + process.env.NODE_ENV)
        .setDescription("Description de l'api de pour le cours de M1")
        .setVersion("1.0")
        .addServer(`http://localhost:${process.env.PORT || 4000}`, "Local server")
        .build();
    const options: SwaggerDocumentOptions = {
        deepScanRoutes: true,
        operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup("", app, document);

    // Middlewares
    app.use(logger("dev"));
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
    app.enableCors();
    app.use(helmet());
    app.enableShutdownHooks();
    app.useLogger(app.get(LoggerService));

    await app.listen(process.env.PORT || 4000);

    writeFileSync("./graph.json", app.get(SerializedGraph).toString());

    log.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(() => {
    writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
    process.exit(1);
});
