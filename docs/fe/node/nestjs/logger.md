## 日志记录

- [logger](https://nestjs.docs-hub.com/techniques/logger)

Nest 提供了一个内置的文本日志记录器，在应用程序引导和其他情况（如显示捕获的异常，即系统日志记录）中使用。该功能通过 @nestjs/common 包中的 Logger 类提供。您可以完全控制日志系统的行为，包括以下任何内容：

- 完全禁用日志记录
- 指定日志详细级别（例如，显示错误、警告、调试信息等）
- 覆盖默认日志记录器中的时间戳（例如，使用 ISO8601 标准作为日期格式）
- 完全覆盖默认日志记录器
- 通过扩展来自定义默认日志记录器
- 利用依赖注入简化应用程序的组成和测试
- 您还可以利用内置的日志记录器或创建自己的自定义实现，记录您自己的应用程序级事件和消息。

对于更高级的日志记录功能，您可以利用任何 Node.js 日志记录包，例如 [Winston](https://github.com/winstonjs/winston)，来实现完全自定义的生产级日志记录系统。

### 1.基础定制

#### 禁用日志记录

```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
+   logger: false
  });
  await app.listen(3000);
}
bootstrap();
```

#### 启用特定的日志记录级别

```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
+   logger: ['error', 'warn'],
  });
  await app.listen(3000);
}
bootstrap();
```

#### 禁用颜色

```js
set NO_COLOR=true
```

## 2.自定义实现

### 2.1 console

```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
+   logger: console
  });
  await app.listen(3000);
}
bootstrap();
```

### 2.2 自定义日志记录器

#### 2.2.1. main.ts

src/main.ts

```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
+import { MyLogger } from './my-logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
+   logger: new MyLogger()
  });
  await app.listen(3000);
}
bootstrap();
```

#### 2.2.2. app.controller.ts

src/app.controller.ts

```diff
+import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
+ private readonly logger = new Logger(AppController.name);
+ constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
+   this.logger.log('Hello world!');
    return this.appService.getHello();
  }
}
```

#### 2.2.3. my-logger.ts

src/my-logger.ts

```js
import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
    /**
     * 写入 'log' 级别日志。
     */
    log(message: any, ...optionalParams: any[]) {
        console.log(`[LOG] ${message}`, ...optionalParams);
    }

    /**
     * 写入 'fatal' 级别日志。
     */
    fatal(message: any, ...optionalParams: any[]) {
        console.error(`[FATAL] ${message}`, ...optionalParams);
    }

    /**
     * 写入 'error' 级别日志。
     */
    error(message: any, ...optionalParams: any[]) {
        console.error(`[ERROR] ${message}`, ...optionalParams);
    }

    /**
     * 写入 'warn' 级别日志。
     */
    warn(message: any, ...optionalParams: any[]) {
        console.warn(`[WARN] ${message}`, ...optionalParams);
    }

    /**
     * 写入 'debug' 级别日志。
     */
    debug?(message: any, ...optionalParams: any[]) {
        console.debug(`[DEBUG] ${message}`, ...optionalParams);
    }

    /**
     * 写入 'verbose' 级别日志。
     */
    verbose?(message: any, ...optionalParams: any[]) {
        console.log(`[VERBOSE] ${message}`, ...optionalParams);
    }
}
```

## 3.扩展内置日志记录器

### 3.1. extended-console-logger.ts

src/extended-console-logger.ts

```js
import { ConsoleLogger } from '@nestjs/common';
export class ExtendedConsoleLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string) {
        console.log(`[ExtendedConsoleLogger] ${message}`);
        super.error(message, stack, context);
    }
}
```

### 3.2. main.ts

src/main.ts

```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
+import { ExtendedConsoleLogger } from './extended-console-logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
+   logger: new ExtendedConsoleLogger()
  });
  await app.listen(3000);
}
bootstrap();
```

### 3.3. app.controller.ts

src/app.controller.ts

```diff
import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
+   this.logger.error('Hello world!');
    return this.appService.getHello();
  }
}
```

## 4.依赖注入

### 4.1. my-logger.service.ts

src/logger/my-logger.service.ts

```js
import { Inject, Injectable } from "@nestjs/common";
@Injectable()
export class MyLogger {
    @Inject('LOGGER_CONFIG') private readonly config: any;
    log(message: string) {
        console.log('isEnabled', this.config.isEnabled);
        console.log(message);
    }
}
```

### 4.2. extended-console-logger.ts

src/extended-console-logger.ts

```diff
+import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
+@Injectable()
export class ExtendedConsoleLogger extends ConsoleLogger {
    error(message: any, stack?: string, context?: string) {
        console.log(`[ExtendedConsoleLogger] ${message}`);
        super.error(message, stack, context);
    }
}
```

### 4.3. app.module.ts

src/app.module.ts

```diff
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
+import { LoggerModule } from './logger/logger.module';
@Module({
+ imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
+export class AppModule { }
```

### 4.4. main.ts

src/main.ts

```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
+import { MyLogger } from './logger/my-logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
+   bufferLogs: true,
  });
+ app.useLogger(app.get(MyLogger));
  await app.listen(3000);
}
bootstrap();
```

### 4.5. logger.module.ts

src/logger/logger.module.ts

```js
import { Global, Module } from '@nestjs/common';
import { MyLogger } from './my-logger.service';

@Module({
    providers: [
        {
            provide: 'LOGGER_CONFIG',
            useValue: {
                isEnabled: true
            }
        },
        MyLogger
    ],
    exports: [MyLogger],
})
export class LoggerModule { }
```

## 2.winston

`winston` 是一个非常流行的 Node.js 日志库，广泛应用于各种 Node.js 项目中。它提供了灵活、可扩展的日志功能，能够满足从简单的日志记录到复杂的分布式系统日志管理的需求。

### 2.1 主要特性

- **多传输方式 (Transports):** `winston` 支持多种日志传输方式（比如控制台、文件、HTTP、MongoDB 等）。传输方式定义了日志消息会被发送到哪里。

- **可配置的日志级别:** `winston` 支持多个日志级别（如 `error`, `warn`, `info`, `verbose`, `debug`, `silly`），并允许开发者根据环境或需求设置不同的日志级别。

- **格式化日志输出:** `winston` 提供了灵活的日志格式化功能，支持 JSON 格式、简单字符串格式等，并且允许自定义格式化方式。

- **多实例支持:** 你可以创建多个 `winston` 日志实例，每个实例可以独立配置传输方式和日志级别。

- **异步日志:** `winston` 的日志记录是异步的，能够有效提高性能。

- 安装

  ```bash
   npm install winston
  ```

### 2.2 创建基本的日志记录器

```javascript
// 引入 winston 模块
const winston = require('winston');

// 创建一个日志记录器实例
const logger = winston.createLogger({
    // 设置日志级别为 'info'
    level: 'info',
    // 设置日志格式为 JSON
    format: winston.format.json(),
    // 配置日志传输方式
    transports: [
        // 将日志输出到控制台
        new winston.transports.Console(),
        // 将日志记录到名为 'combined.log' 的文件中
        new winston.transports.File({ filename: 'combined.log' })
    ],
});
// 记录一条信息级别的日志消息
logger.info('This is an informational message');
```

### 2.3 使用不同的日志级别

```js
// 引入 winston 模块
const winston = require('winston');
// 创建一个日志记录器实例
const logger = winston.createLogger({
    // 设置日志级别为 'info'
    level: 'info',
    // 设置日志格式为 JSON 格式
    format: winston.format.json(),
    // 配置日志传输方式
    transports: [
        // 将日志输出到控制台
        new winston.transports.Console(),
        // 将日志记录到名为 'combined.log' 的文件中
        new winston.transports.File({ filename: 'combined.log' })
    ],
});
// 记录一条错误级别的日志消息
logger.error('This is an error message');
// 记录一条警告级别的日志消息
logger.warn('This is a warning message');
// 记录一条信息级别的日志消息
logger.info('This is an informational message');
// 记录一条详细级别的日志消息
logger.verbose('This is a verbose message');
// 记录一条调试级别的日志消息
logger.debug('This is a debug message');
// 记录一条无意义的日志消息（最低级别）
logger.silly('This is a silly message');
```

### 2.4 自定义格式化

`winston` 提供了多种预定义的格式化器，并且你也可以创建自己的格式化器。

```js
// 引入 winston 模块
const winston = require('winston');
// 从 winston.format 中提取 `combine`, `timestamp`, `printf` 方法
const { combine, timestamp, printf } = winston.format;
// 定义自定义的日志格式化函数 `myFormat`
const myFormat = printf(({ level, message, timestamp }) => {
    // 格式化日志输出，包含时间戳、日志级别和日志消息
    return `${timestamp} [${level}]: ${message}`;
});
// 创建一个日志记录器实例
const logger = winston.createLogger({
    // 配置日志格式，结合时间戳和自定义格式化函数
    format: combine(
        timestamp(), // 添加时间戳
        myFormat     // 应用自定义格式
    ),
    // 配置日志传输方式，将日志输出到控制台
    transports: [new winston.transports.Console()],
});
// 记录一条信息级别的日志消息
logger.info('Hello, Winston!');
```

### 2.5 添加更多的传输方式

你可以根据需求添加多个传输方式，`winston` 支持同时使用多种传输方式。

```js
// 引入 winston 模块
const winston = require('winston');
// 创建一个日志记录器实例
const logger = winston.createLogger({
    // 配置日志传输方式
    transports: [
        // 将日志输出到控制台
        new winston.transports.Console(),
        // 将错误级别的日志记录到名为 'error.log' 的文件中
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // 将所有级别的日志记录到名为 'combined.log' 的文件中
        new winston.transports.File({ filename: 'combined.log' })
    ],
});
// 记录一条信息级别的日志消息
logger.info('Hello, Winston!');
```

## 3.winston-daily-rotate-file

`winston-daily-rotate-file` 是一个用于 `winston` 日志库的传输方式插件，它允许将日志文件根据日期自动分割和轮换。这在处理长期运行的应用程序时非常有用，因为它可以防止单个日志文件过大，并且便于按日期查找和管理日志。

### 3.1 主要功能

1. **按日期自动轮换日志文件**：`winston-daily-rotate-file` 可以根据日期自动创建新的日志文件，通常是每天创建一个新文件。
2. **文件名模式**：可以通过设置文件名模式来指定日志文件的命名方式，比如按日期生成的文件名格式为 `application-%DATE%.log`，这里的 `%DATE%` 会被替换成实际的日期。
3. **文件保留**：你可以设置日志文件的保留天数，超过这个天数的日志文件会被自动删除，避免日志文件占用太多的存储空间。
4. **压缩旧日志文件**：支持对旧的日志文件进行压缩，从而进一步节省存储空间。
5. **灵活的日期格式**：允许自定义日期格式，适应不同的文件命名需求。

### 3.2 安装

要使用 `winston-daily-rotate-file`，首先需要安装它：

```bash
npm install winston-daily-rotate-file
```

### 3.3 基本用法

- **filename**: 日志文件的文件名模式，支持 `%DATE%` 占位符。
- **dirname**: 日志文件的存储目录。
- **datePattern**: 指定日期格式，默认是 `YYYY-MM-DD`，也可以使用更细粒度的格式，如 `YYYY-MM-DD-HH` 以每小时轮换。
- **maxSize**: 每个日志文件的最大大小，超过后会创建新文件。
- **maxFiles**: 指定要保留的最大日志文件数或天数。超过这个数量的日志文件会被删除。
- **zippedArchive**: 是否压缩旧的日志文件。

```js
const winston = require('winston');
require('winston-daily-rotate-file');
// 创建一个日志记录器实例
const logger = winston.createLogger({
    // 配置日志传输方式
    transports: [
        // 添加 winston-daily-rotate-file 传输方式
        new winston.transports.DailyRotateFile({
            // 指定日志文件的文件名模式
            filename: 'application-%DATE%.log',
            // 指定文件的目录
            dirname: './logs',
            // 指定日期格式，默认为 YYYY-MM-DD
            datePattern: 'YYYY-MM-DD',
            // 设置日志级别
            level: 'info',
            // 设置日志文件的最大大小（可选）
            maxSize: '20m',
            // 设置日志文件的最大保留天数（可选）
            maxFiles: '14d',  // 14 天后自动删除
            // 指定是否压缩旧日志文件（可选）
            zippedArchive: true
        })
    ]
});
// 记录一条信息级别的日志消息
logger.info('This is an informational message');
```

## 4. nest-winston

[nest-winston](https://www.npmjs.com/package/nest-winston) 是一个将 `winston` 日志库与 NestJS 框架集成的模块。通过使用 `nest-winston`，你可以利用 `winston` 的强大日志功能，在 NestJS 应用中实现灵活、可扩展的日志管理。

### 4.1 主要功能

1. **与 NestJS 完全集成**：`nest-winston` 可以无缝集成到 NestJS 的日志系统中，使得 `winston` 能够处理来自 NestJS 各种组件（如控制器、服务等）的日志。
2. **自定义日志格式和传输方式**：你可以完全自定义日志的格式、级别和传输方式，包括控制台输出、文件记录、远程日志服务器等。
3. **支持多种日志级别**：与 `winston` 一样，`nest-winston` 支持多种日志级别，比如 `error`, `warn`, `info`, `debug`, 等等。
4. **异步和批量日志**：支持异步日志记录，并可以将日志批量发送到远程服务。

### 4.2 安装

首先，你需要安装 `nest-winston` 和 `winston`：

```bash
npm install nest-winston winston
```

### 4.3 基本用法

#### 4.3.1 app.module.ts

src/app.module.ts

```diff
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
+import { WinstonModule } from 'nest-winston';
+import * as winston from 'winston';
@Module({
+ imports: [
+   WinstonModule.forRoot({
+     transports: [
+       new winston.transports.Console({
+         format: winston.format.combine(
+           winston.format.timestamp(),
+           winston.format.printf(({ timestamp, level, message, context }) => {
+             return `[Nest] ${process.pid}  - ${timestamp.slice(0, -5)}   ${level.toUpperCase()} [${context}] ${message}`;
+           })
+         )
+       }),
+       new winston.transports.File({
+         filename: 'error.log',
+         level: 'error',
+       }),
+     ],
+   }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
```

#### 4.3.2 app.service.ts

src/app.service.ts

```diff
+import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
+import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
@Injectable()
export class AppService {
+ private readonly logger = new Logger(AppService.name);
+ @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly winstonlogger: LoggerService
  getHello(): string {
+   this.logger.warn('Hello method has been called');
+   this.winstonlogger.warn('Hello method has been called', AppService.name);
+   this.logger.error('This is an error message');
+   this.winstonlogger.error('This is an error message', 'stack', AppService.name);
    return 'Hello World!';
  }
+}
```