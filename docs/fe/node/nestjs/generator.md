## 1.Schematics

- [Schematic](http://www.zhufengpeixun.com/nestjs/html/Schematic.html)是一个现代Web的脚手架库。
- [Schematics](https://github.com/angular/angular-cli/blob/HEAD/packages/angular_devkit/schematics/README.md)是一种生成器，可以转换现有的文件系统。它们可以创建文件、重构现有文件或移动文件。
- Schematics 是一个库，本身无法独立运行。可以在此 参考 CLI 中找到它，并且可以在 NPM 上以 [@angular-devkit/schematics-cli](https://www.npmjs.com/package/@angular-devkit/schematics-cli) 的形式发布

## 2.@angular-devkit/schematics-cli

- [@angular-devkit/schematics-cli](https://www.npmjs.com/package/@angular-devkit/schematics-cli)是 Angular 提供的一个工具，用于创建和管理自定义的 Schematics。
- Schematics 是一组用于在 Angular 项目中生成或修改代码的指令，可以帮助开发者自动化代码生成任务，如创建组件、服务、模块等。
- [@angular-devkit/schematics-cli](https://angular.dev/cli)提供了一组命令行工具，帮助开发者创建和测试自定义的 Schematics

### 2.1 安装

```js
npm install @angular-devkit/schematics-cli -g
```

### 2.2 创建项目

```js
schematics blank --name=cms-generator
```

这会创建一个基本的 Schematic 项目结构，其中包括最小的配置和代码文件。

### 2.3 运行项目

#### 2.3.1 命令

```js
npm run build
schematics .:generateFiles --name=role --title="角色"
schematics .:generateFiles --name=role --title="角色" --dry-run=false
schematics .:generateFiles --name=role --title="角色" --no-dry-run
```

命令 `schematics .:generateFiles --name=role --no-dry-run` 的作用是使用当前目录下的 `generateFiles` 这个 Schematic 生成器，创建一个名为 `role` 的资源（或文件）。其中：

- `.` 表示当前目录。
- `generateFiles` 是 Schematic 的名称。
- `--name=role` 表示为生成器传递的选项，指定生成的资源名称为 `role`。
- `--no-dry-run` 表示直接应用更改到文件系统，而不进行预览（不进行 dry-run 模式）。

#### 2.3.2 package.json

```js
{
  "scripts": {
    "build": "tsc -p tsconfig.json"
  }
  "schematics": "./src/collection.json",
}
```

- `schematics`: 这个字段用于指示该包是一个 Schematic 集合。它指定了 Schematic 集合的入口文件。
- `"./src/collection.json"`: 这是 Schematic 集合的定义文件路径。
- `collection.json` 文件中定义了 Schematic 的集合及其元数据、可用的 Schematic 列表和配置。

#### 2.3.3 collection.json

src\collection.json

```js
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "generateFiles": {
      "description": "A blank schematic.",
      "factory": "./cms-gen/index#generateFiles"
    }
  }
}
```

- `$schema`：这条字段指定了用于验证和解释此 JSON 文件的模式（schema）。它指向了 Angular DevKit Schematics 提供的 `collection-schema.json` 文件，确保文件结构符合 Schematics 集合的标准格式。

- **`schematics`**：这是整个配置文件的核心部分，定义了该集合中的所有 Schematics。在这个例子中，只定义了一个 Schematic，名为 `generateFiles`。

- **`generateFiles`**：这是 Schematic 的名称。在运行这个 Schematic 时，可以通过命令行使用这个名称来调用，例如：`schematics .:generateFiles`。

- **`description`**：对这个 Schematic 的简短描述。这里描述为 "A blank schematic."，意思是这是一个空白模板的 Schematic。

- `factory`

  ：指定了工厂函数的位置，这个工厂函数生成 Schematic 的实际逻辑。

  - **`"./cms-gen/index#generateFiles"`**：表示工厂函数位于 `cms-gen/index.ts` 文件中，并且工厂函数的名称是 `generateFiles`。当这个 Schematic 被执行时，这个函数将会被调用。

#### 2.3.4 cms-gen\index.ts

src\cms-gen\index.ts

```js
// 从 `@angular-devkit/schematics` 导入 `Rule`, `SchematicContext`, 和 `Tree`
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
// 导出一个名为 `generateFiles` 的函数，该函数接收 `_options` 参数并返回一个 `Rule` 类型
export function generateFiles(_options: any): Rule {
  // 返回一个函数，该函数接收 `tree` 和 `_context` 参数，并返回 `tree`
  return (tree: Tree, _context: SchematicContext) => {
    console.log('generateFiles', _options);
    // 直接返回传入的 `tree`，没有对 `tree` 进行任何修改
    return tree;
  };
}
```

- **Rule**：一个函数，它接收一个 `Tree` 对象并返回一个新的 `Tree`，用于定义文件系统的变更规则。
- **SchematicContext**：提供有关当前运行中的原理图上下文的信息和工具，例如日志记录和任务调度。
- **Tree**：一个虚拟的文件系统，用于暂存和记录对实际文件系统的更改，直到提交时才应用。

## 3.处理模板文件

### 3.1 常用方法

#### 3.1.1 @angular-devkit/schematics

| 方法名             | 方法介绍                                                  |
| :----------------- | :-------------------------------------------------------- |
| `Rule`             | Schematic 规则的核心接口，用于定义文件操作的执行逻辑。    |
| `SchematicContext` | 提供 Schematic 运行时的上下文信息，包括日志记录、提示等。 |
| `Tree`             | 表示项目的文件树，提供文件读写操作的方法。                |
| `applyTemplates`   | 应用模板引擎，将模板文件与上下文数据结合生成目标文件。    |
| `url`              | 指定模板文件的源路径，通常是本地文件路径或 URL。          |
| `move`             | 移动生成的文件到指定目录。                                |
| `apply`            | 应用一系列规则（Rule）到文件树（Tree）上。                |
| `chain`            | 将多个规则（Rule）按顺序串联执行。                        |
| `mergeWith`        | 将生成的模板与项目的文件树合并。                          |
| `path`             | Node.js 模块，用于处理和规范化文件路径。                  |

#### 3.1.2 strings

| 方法名        | 作用                                                   | 示例                       |
| :------------ | :----------------------------------------------------- | :------------------------- |
| `camelize`    | 将字符串转换为驼峰式命名法（camelCase）。              | `my-string` -> `myString`  |
| `dasherize`   | 将字符串中的空格和大写字母转换为短横线分隔的小写格式。 | `myString` -> `my-string`  |
| `capitalize`  | 将字符串的首字母大写。                                 | `my string` -> `My string` |
| `classify`    | 将字符串转换为类名式命名法（PascalCase）。             | `my-string` -> `MyString`  |
| `decamelize`  | 将驼峰式命名法的字符串转换为短横线分隔的小写格式。     | `myString` -> `my-string`  |
| `underscore`  | 将字符串转换为下划线分隔的小写格式。                   | `myString` -> `my_string`  |
| `group`       | 用于处理字符串中的组操作，例如将字符串拆分为组。       | 取决于使用场景             |
| `singularize` | 将复数形式的字符串转换为单数形式。                     | `users` -> `user`          |
| `pluralize`   | 将单数形式的字符串转换为复数形式。                     | `user` -> `users`          |

### 3.2 命令

```js
npm run build
schematics .:generateFiles --name=role --path="角色"
schematics .:generateFiles --name=role --path="角色" --dry-run=false
schematics .:generateFiles --name=role --path="角色" --no-dry-run
```

### 3.3. entityName.controller.ts.template

src/cms-gen/files/**entityName**.controller.ts.template

```js
export class <%= classify(entityName) %>Controller {}
```

### 3.4. index.ts

src/cms-gen/index.ts

```diff
// 导入需要的依赖模块和函数
import { Rule, SchematicContext, Tree, applyTemplates, url, move, apply, chain, mergeWith } from '@angular-devkit/schematics';
// 导入字符串处理工具
import { strings } from '@angular-devkit/core';
// 导入Node.js内置模块，用于处理文件路径
import * as path from 'path';
// 定义并导出名为 `generateFiles` 的函数，接收参数 `options`，返回一个 `Rule` 类型
export function generateFiles(options: any): Rule {
    // 返回一个匿名函数，接收 `Tree` 和 `SchematicContext` 参数
    return (_tree: Tree, _context: SchematicContext) => {
        // 从选项中获取 `name` 属性并赋值给 `entityName`
        const entityName = options.name;
        // 定义要应用的模板规则
        const sourceTemplateRules = apply(
            // 指定模板文件所在的目录
            url('./files'),
            [
                // 应用模板，将传入的选项和字符串工具一起传递到模板中
                applyTemplates({
                    ...options,
                    ...strings,
                    entityName
                }),
                // 移动生成的文件到目标目录
                move(path.normalize(`target`)),
            ]
        );
        // 返回一个 `chain`，将模板规则与文件系统合并
        return chain([
            mergeWith(sourceTemplateRules),
        ]);
    };
}
```

这段代码定义了一个 `generateFiles` 函数，该函数会根据传入的选项生成一些文件，并将这些文件移动到指定的目标目录。它使用了 Angular Schematics 的工具链来处理模板生成和文件操作。

## 4.编写代码模板

### 4.1 命令

```js
npm run build
schematics .:generateFiles --name=role --title="角色"
schematics .:generateFiles --name=role --title="角色" --dry-run=false
schematics .:generateFilesn --name=role --title="角色" --no-dry-run
nest g generateFiles role --collection=D:/aprepare/nest/cms-gen
```

### 4.2 安装

```
npm i --save-dev @types/pluralize
npm i pluralize
```

### 4.3. index.ts

src/cms-gen/index.ts

```diff
+import { Rule, SchematicContext, Tree, applyTemplates, url, move, apply, mergeWith, chain } from '@angular-devkit/schematics';
// Rule: 描述一个规则，可以对文件系统进行更改。
// SchematicContext: 提供有关操作上下文的信息。
// Tree: 表示文件系统的抽象结构。
// applyTemplates: 将模板应用到文件内容中。
// url: 用于加载文件的源路径。
// move: 移动文件到指定路径。
// apply: 应用一组规则到源路径。
// mergeWith: 将模板生成的树合并到现有树中。
// chain: 串联多个规则操作。
import { strings } from '@angular-devkit/core';
// 导入字符串操作工具集，如 dasherize、camelize 等。
import * as path from 'path';
// 导入 Node.js 的路径模块，用于处理和规范化文件路径。
+import { plural } from 'pluralize';
// 导入 pluralize 库中的 plural 函数，该函数用于将单词转换为复数形式。
export function generateFiles(options: any): Rule {
  // 导出一个名为 generateFiles 的函数，它接受选项并返回一个 Rule。
  return (_tree: Tree, _context: SchematicContext) => {
    // 返回一个接收 Tree 和 SchematicContext 的函数，这是 Rule 的基本结构。
    const entityName = options.name;
    // 获取传入的选项中的 name 属性，并将其赋值给 entityName。
+   const sourceTemplateRules = apply(url('./files/src'), [
+     applyTemplates({
+       ...options,
+       ...strings,
+       plural,
+       entityName
+     }),
+     move(path.normalize(`src`)),
+   ]);
    // 定义了一个 sourceTemplateRules 变量，使用 apply 函数从指定的 URL 路径加载文件，
    // 然后应用一系列模板规则，包括字符串处理（如 dasherize、camelize）、plural 函数以及传入的选项。
    // 最后，使用 move 函数将生成的文件移动到 'src' 目录。
    return chain([
+     mergeWith(sourceTemplateRules)
    ]);
    // 使用 chain 函数组合多个规则（这里只有一个），并返回一个包含合并操作的规则。
  };
}
```

### 4.4. entityName.entity.ts.template

src/cms-gen/files/src/shared/entities/**entityName**.entity.ts.template

```js
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class <%= classify(entityName) %> {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @Column({ length: 50, unique: true })
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @Column({ default: 1 })
    @ApiProperty({ description: '生效状态', example: 1 })
    status: number;

    @Column({ default: 100 })
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;

    @CreateDateColumn()
    @ApiProperty({ description: '创建时间', example: '2024年8月11日16:49:22' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '更新时间', example: '2024年8月11日16:49:22' })
    updatedAt: Date;
}
```

### 4.5. entityName.dto.ts.template

src/cms-gen/files/src/shared/dto/**entityName**.dto.ts.template

```js
import { ApiProperty, PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IdValidators, StatusValidators, SortValidators } from '../decorators/dto.decorator';

export class Create<%= classify(entityName) %>Dto {
    @IsString()
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @StatusValidators()
    @ApiProperty({ description: '状态', example: 1 })
    status: number;

    @SortValidators()
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;
}

export class Update<%= classify(entityName) %>Dto extends PartialTypeFromSwagger(PartialType(Create<%= classify(entityName) %>Dto)) {
    @IdValidators()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '用户名', example: 'nick' })
    username: string;

    @ApiProperty({ description: '密码', example: '666666' })
    @IsOptional()
    password: string;
}
```

### 4.6. entityName.service.ts.template

src/cms-gen/files/src/shared/services/**entityName**.service.ts.template

```js
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { <%= classify(entityName) %> } from "../entities/<%= dasherize(entityName) %>.entity";
import { Repository, Like } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";

@Injectable()
export class <%= classify(entityName) %>Service extends MySQLBaseService<<%= classify(entityName) %>> {
  constructor(
    @InjectRepository(<%= classify(entityName) %>) protected repository: Repository<<%= classify(entityName) %>>
  ) {
    super(repository);
  }

  async findAll(keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    return this.repository.find({ where });
  }

  async findAllWithPagination(page: number, limit: number, keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    const [<%= camelize(plural(entityName)) %>, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
    return { <%= camelize(plural(entityName)) %>, total };
  }
}
```

### 4.7. entityName.controller.ts.template

src/cms-gen/files/src/admin/controllers/**entityName**.controller.ts.template

```js
import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { Create<%= classify(entityName) %>Dto, Update<%= classify(entityName) %>Dto } from 'src/shared/dto/<%= dasherize(entityName) %>.dto';
import { <%= classify(entityName) %>Service } from 'src/shared/services/<%= dasherize(entityName) %>.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { UtilityService } from 'src/shared/services/utility.service';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';

@UseFilters(AdminExceptionFilter)
@Controller('admin/<%= dasherize(plural(entityName)) %>')
export class <%= classify(entityName) %>Controller {
    constructor(
        private readonly <%= camelize(entityName) %>Service: <%= classify(entityName) %>Service
    ) { }

    @Get()
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-list')
    async findAll(@Query('keyword') keyword: string = '',
        @Query('page', new ParseOptionalIntPipe(1)) page: number,
        @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { <%= camelize(plural(entityName)) %>, total } = await this.<%= camelize(entityName) %>Service.findAllWithPagination(page, limit, keyword);
        const pageCount = Math.ceil(total / limit);
        return { <%= camelize(plural(entityName)) %>, keyword, page, limit, pageCount };
    }

    @Get('create')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-form')
    createForm() {
        return { <%= camelize(entityName) %>: {} }
    }

    @Post()
    @Redirect('/admin/<%= dasherize(plural(entityName)) %>')
    async create(@Body() create<%= classify(entityName) %>Dto: Create<%= classify(entityName) %>Dto) {
        await this.<%= camelize(entityName) %>Service.create(create<%= classify(entityName) %>Dto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const <%= camelize(entityName) %> = await this.<%= camelize(entityName) %>Service.findOne({ where: { id } });
        if (!<%= camelize(entityName) %>) throw new HttpException('<%= classify(entityName) %> not Found', 404);
        return { <%= camelize(entityName) %> };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() update<%= classify(entityName) %>Dto: Update<%= classify(entityName) %>Dto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.<%= camelize(entityName) %>Service.update(id, update<%= classify(entityName) %>Dto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/<%= dasherize(plural(entityName)) %>`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.<%= camelize(entityName) %>Service.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const <%= camelize(entityName) %> = await this.<%= camelize(entityName) %>Service.findOne({ where: { id } });
        if (!<%= camelize(entityName) %>) throw new HttpException('<%= classify(entityName) %> not Found', 404);
        return { <%= camelize(entityName) %> };
    }
}
```

## 5.编写页面模板

### 5.1 命令

```js
npm run build
schematics .:generateFiles --name=role --title="角色"
schematics .:generateFiles --name=role --title="角色" --dry-run=false
schematics .:generateFiles --name=role --title="角色" --no-dry-run
nest g generateFiles role 角色 --collection=D:/aprepare/nest/cms-gen
```

### 5.2. entityName@dasherize-detail.hbs.template

src/cms-gen/files/views/**entityName@dasherize**/**entityName@dasherize**-detail.hbs.template

```js
<h1>
    <%= classify(title) %>详情
</h1>
<div class="mb-3">
    <label class="form-label">名称:</label>
    <p class="form-control-plaintext">{{<%= camelize(entityName) %>.name}}</p>
</div>
<div class="mb-3">
    <label class="form-label">状态:</label>
    <p class="form-control-plaintext">{{#if <%= camelize(entityName) %>.status}}激活{{else}}未激活{{/if}}</p>
</div>
<a href="/admin/<%= dasherize(plural(entityName)) %>/{{<%= camelize(entityName) %>.id}}/edit"
    class="btn btn-warning btn-sm">修改</a>
<a href="/admin/<%= dasherize(plural(entityName)) %>" class="btn btn-secondary btn-sm">返回列表</a>
```

### 5.3. index.ts

src/cms-gen/index.ts

```diff
import { Rule, SchematicContext, Tree, applyTemplates, url, move, apply, mergeWith, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';
import { plural } from 'pluralize';
export function generateFiles(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const entityName = options.name;
+   const title = options.path;
    const sourceTemplateRules = apply(url('./files/src'), [
      applyTemplates({
        ...options,
        ...strings,
        plural,
        entityName
      }),
      move(path.normalize(`src`)),
    ]);
+   const viewsTemplateRules = apply(url('./files/views'), [
+     applyTemplates({
+       ...options,
+       ...strings,
+       plural,
+       entityName,
+       title
+     }),
+     move(path.normalize(`views`)),
+   ]);
    return chain([
+     mergeWith(sourceTemplateRules),
+     mergeWith(viewsTemplateRules),
    ]);
  };
}
```

### 5.4. entityName@dasherize-form.hbs.template

src/cms-gen/files/views/**entityName@dasherize**/**entityName@dasherize**-form.hbs.template

```js
<h1>{{#if <%= camelize(entityName) %>.id}}编辑<%=classify(title) %>{{else}}添加<%= classify(title) %>{{/if}}</h1>
<form
    action="/admin/<%= dasherize(plural(entityName)) %>{{#if <%= camelize(entityName) %>.id}}/{{<%= camelize(entityName) %>.id}}{{/if}}"
    method="POST">
    {{#if <%= camelize(entityName) %>.id}}<input type="hidden" name="_method" value="PUT">{{/if}}
        <div class="mb-3">
            <label for="name" class="form-label">名称</label>
            <input type="text" class="form-control" id="name" name="name" value="{{<%= camelize(entityName) %>.name}}">
        </div>
        <div class="mb-3">
            <label for="status" class="form-label">状态</label>
            <select class="form-control" id="status" name="status">
                <option value="1" {{#if <%=camelize(entityName) %>.status}}selected{{/if}}>激活</option>
                <option value="0" {{#unless <%=camelize(entityName) %>.status}}selected{{/unless}}>未激活</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">保存</button>
</form>
```

### 5.5. entityName@dasherize-list.hbs.template

src/cms-gen/files/views/**entityName@dasherize**/**entityName@dasherize**-list.hbs.template

```js
<h1>
  <%=classify(title) %>列表
</h1>
<a href="/admin/<%= dasherize(plural(entityName)) %>/create" class="btn btn-success mb-3">添加<%=classify(title) %></a>
<form method="GET" action="/admin/<%= dasherize(plural(entityName)) %>" class="mb-3">
  <div class="input-group">
    <input type="text" name="keyword" class="form-control" placeholder="请输入搜索关键字" value="{{keyword}}">
    <button class="btn btn-outline-secondary">搜索</button>
  </div>
</form>
<table class="table">
  <thead>
    <tr>
      <td>名称</td>
      <td>状态</td>
      <td>排序</td>
      <td>操作</td>
    </tr>
  </thead>
  <tbody>
    {{#each <%= dasherize(plural(entityName)) %>}}
      <tr>
        <td>{{this.name}}</td>
        <td>
          <span class="status-toggle" data-id="{{this.id}}" data-status="{{this.status}}">
            {{#if this.status}}
            <i class="bi bi-check-circle-fill text-success"></i>
            {{else}}
            <i class="bi bi-x-circle-fill text-danger"></i>
            {{/if}}
          </span>
        </td>
        <td>
          <span class="sort-text" data-id="{{this.id}}">{{this.sort}}</span>
          <input type="number" class="form-control sort-input d-none" style="width:50%" data-id="{{this.id}}"
            value="{{this.sort}}">
        </td>
        <td>
          <a href="/admin/<%= dasherize(plural(entityName)) %>/{{this.id}}" class="btn btn-primary btn-sm">查看</a>
          <a href="/admin/<%= dasherize(plural(entityName)) %>/{{this.id}}/edit" class="btn btn-warning btn-sm">修改</a>
          <a class="btn btn-danger btn-sm" onclick="delete<%= classify(entityName) %>({{this.id}})">删除</a>
        </td>
      </tr>
      {{/each}}
  </tbody>
</table>
<nav>
  <ul class="pagination">
    <li class="page-item {{#if (eq page 1)}}disabled{{/if}}">
      <a class="page-link" href="?page={{dec page}}&keyword={{keyword}}&limit={{limit}}">上一页</a>
    </li>
    {{#each (range 1 pageCount)}}
    <li class="page-item {{#if (eq this ../page)}}active{{/if}}">
      <a class="page-link" href="?page={{this}}&keyword={{../keyword}}&limit={{../limit}}">{{this}}</a>
    </li>
    {{/each}}

    <li class="page-item {{#if (eq page pageCount)}}disabled{{/if}}">
      <a class="page-link" href="?page={{inc page}}&keyword={{keyword}}&limit={{limit}}">下一页</a>
    </li>
    <li class="page-item">
      <form method="GET" action="/admin/<%= dasherize(plural(entityName)) %>" class="d-inline-block ms-3">
        <input type="hidden" name="keyword" value="{{keyword}}">
        <input type="hidden" name="page" value="{{page}}">
        <div class="input-group">
          <input type="number" name="limit" class="form-control" placeholder="每页条数" value="{{limit}}" min="1">
          <button class="btn btn-outline-secondary" type="submit">设置每页的条数</button>
        </div>
      </form>
    </li>
  </ul>
</nav>
<script>
  function delete<%= classify(entityName) %> (id) {
    if (confirm('确定要删除吗?')) {
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'DELETE',
        success: function (data) {
          if (data.success) {
            const params = new URLSearchParams(window.location.search);
            params.delete('page');
            params.append('page', 1)
            const query = params.toString();
            window.location = window.location.pathname + '?' + query;
          }
        }
      })
    }
  }
  $(function () {
    $('.sort-text').on('dblclick', function () {
      const $this = $(this);
      const id = $this.data('id');
      $this.addClass('d-none');
      $(`.sort-input[data-id="${id}"]`).removeClass('d-none').focus();
    });
    $('.sort-input').on('blur', function () {
      const $this = $(this);
      const id = $this.data('id');
      const newSort = $this.val();
      $this.addClass('d-none');
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'PUT',
        headers: { 'accept': 'application/json' },
        contentType: 'application/json',
        data: JSON.stringify({ sort: newSort }),
        success: function (data) {
          if (data.success) {
            $(`.sort-text[data-id="${id}"]`).removeClass('d-none').text(newSort);
          }
        }
      })
    });
    $('.status-toggle').on('click', function () {
      const $this = $(this);
      const id = $this.data('id');
      const currentStatus = $this.data('status');
      const newStatus = currentStatus == 1 ? 0 : 1;
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'PUT',
        headers: { 'accept': 'application/json' },
        contentType: 'application/json',
        data: JSON.stringify({ status: newStatus }),
        success: function (data) {
          if (data.success) {
            $this.data('status', newStatus);
            $this.html(` <i class="bi ${newStatus ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} ${newStatus ? 'text-success' : 'text-danger'}"></i>`);
          }
        }
      })
    });
  });
</script>
```

## 6.updateAdminModule

- [astexplorer](https://astexplorer.net/)

### 6.1 API

| 方法名                                    | 介绍                                                         | 参数说明                                                     |
| :---------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `ts.transform`                            | 将 TypeScript 源文件或节点应用一系列转换器，返回转换后的节点。用于对 AST 进行修改。 | `sourceFile`：要转换的源文件或节点。`transformers`：转换器函数数组。 |
| `ts.createPrinter().printFile`            | 创建一个打印机，用于将 TypeScript AST 转换回可读的源代码字符串。 | `sourceFile`：要打印的 `SourceFile` 对象。                   |
| `ts.createSourceFile`                     | 根据提供的文件内容、文件名和语言目标创建一个 `SourceFile` 对象，表示 TypeScript 文件的 AST。 | `fileName`：文件名。`sourceText`：文件内容。`languageVersion`：语言版本或目标（如 ES6）。 |
| `ts.factory.createIdentifier`             | 创建一个标识符节点，表示代码中的变量、函数名或类名等。       | `text`：标识符名称。                                         |
| `ts.factory.createImportDeclaration`      | 创建一个 `import` 声明节点，用于导入模块或文件。             | `modifiers`：修饰符（可选）。`importClause`：导入子句。`moduleSpecifier`：模块路径。 |
| `ts.factory.createImportClause`           | 创建一个 `import` 子句节点，指定默认导入或命名导入。         | `isTypeOnly`：是否为类型导入。`name`：默认导入名称（可选）。`namedBindings`：命名导入部分。 |
| `ts.factory.createNamedImports`           | 创建一个命名导入节点，表示通过命名方式导入模块的内容。       | `elements`：命名导入的元素数组。                             |
| `ts.factory.createImportSpecifier`        | 创建一个导入说明符节点，用于指定导入模块的具体部分。         | `propertyName`：模块内的导出名（可选）。`name`：本地使用的名称。 |
| `ts.factory.createStringLiteral`          | 创建一个字符串字面量节点，用于表示字符串值。                 | `text`：字符串内容。                                         |
| `ts.factory.updateSourceFile`             | 创建并返回一个更新后的 `SourceFile` 节点，保留原有的节点和语法结构，并插入新节点。 | `node`：原始 `SourceFile` 节点。`statements`：更新后的语句数组。 |
| `ts.factory.updateCallExpression`         | 创建并返回一个更新后的函数调用表达式节点。                   | `node`：原始调用表达式。`expression`：调用的表达式。`typeArguments`：类型参数。`argumentsArray`：调用参数数组。 |
| `ts.factory.createArrayLiteralExpression` | 创建一个数组字面量节点，表示数组的值。                       | `elements`：数组的元素节点数组。                             |
| `ts.factory.updatePropertyAssignment`     | 创建并返回一个更新后的属性赋值节点，用于更新对象属性。       | `node`：原始属性赋值节点。`name`：属性名节点。`initializer`：属性值节点。 |
| `ts.visitNode`                            | 遍历并访问 AST 树中的节点，根据提供的访问者函数对节点进行处理。 | `node`：要访问的节点。`visitor`：访问者函数。                |
| `ts.visitEachChild`                       | 递归访问并处理 AST 树中的子节点，常用于自定义 AST 转换器中。 | `node`：要访问的父节点。`visitor`：访问者函数。`context`：转换上下文。 |
| `ts.isCallExpression`                     | 判断节点是否是函数调用表达式。                               | `node`：要检查的节点。                                       |
| `ts.isPropertyAccessExpression`           | 判断节点是否是属性访问表达式（如对象的属性访问）。           | `node`：要检查的节点。                                       |
| `ts.isArrayLiteralExpression`             | 判断节点是否是数组字面量表达式。                             | `node`：要检查的节点。                                       |
| `ts.isPropertyAssignment`                 | 判断节点是否是属性赋值语句（如对象字面量中的 `key: value` 形式）。 | `node`：要检查的节点。                                       |
| `ts.isIdentifier`                         | 判断节点是否是标识符。                                       | `node`：要检查的节点。                                       |
| `ts.isImportDeclaration`                  | 判断节点是否是导入声明（`import` 语句）。                    | `node`：要检查的节点。                                       |

### 6.2 updateSourceFile

- `ts.factory.updateSourceFile` 用于更新整个源文件（`SourceFile`）对象的特定属性（如 `statements` 列表）。

- 这是直接对源文件节点进行更新的方式，通常用于在不遍历整个 AST 时更新特定的属性或子节点。

- 当你知道要更新源文件的哪些部分时，比如添加一个新导入语句或更改 `statements` 列表，你可以使用 `ts.factory.updateSourceFile` 直接生成一个新的 `SourceFile` 对象。

  - 返回的是一个新的 `ts.SourceFile` 对象，该对象包含了更新后的 AST。

  ### 6.3 visitNode

- ```
  ts.visitNode
  ```

   

  是一种通用的 AST 遍历方法，它通过调用

   

  ```
  visitor
  ```

   

  函数递归遍历和更新 AST 中的每个节点。

  - 适用于需要根据特定条件修改 AST 中多个节点的情况。`visitor` 函数可以是纯粹的访问节点，也可以在需要时替换节点。

- 当你不确定要更新哪些部分或者需要遍历并有条件地更新多个节点时，使用 `ts.visitNode` 更为合适。

- 例如，需要在 AST 中查找特定类型的节点（如某种表达式或属性）并对其进行操作时，可以使用此方法。

- 返回的是更新后的根节点（`rootNode`），即 `ts.SourceFile` 或其他类型的节点，这取决于你传入的是什么类型的根节点。

- **`ts.factory.updateSourceFile`**: 适用于在你明确知道要更新的部分时，直接生成一个新的 `SourceFile` 对象。它直接操作 `SourceFile` 对象，更新其属性。

- **`ts.visitNode(rootNode, visitor)`**: 适用于需要遍历和修改 AST 中多个节点时。它通过 `visitor` 函数递归遍历并更新整个 AST。

- 两者的返回值类型可以相同（都可能返回 `ts.SourceFile`），但它们的用法和适用场景不同。`ts.factory.updateSourceFile` 更直接，而 `ts.visitNode` 更灵活。

### 6.3. index.ts

src/cms-gen/index.ts

```diff
// 从 @angular-devkit/schematics 导入所需的工具和函数
import { Rule, SchematicContext, Tree, applyTemplates, url, move, apply, mergeWith, chain } from '@angular-devkit/schematics';
// 从 @angular-devkit/core 导入字符串处理工具
import { strings } from '@angular-devkit/core';
// 导入 path 模块用于处理文件路径
import * as path from 'path';
// 导入 pluralize 库用于处理复数形式
import { plural } from 'pluralize';
// 导入 TypeScript 模块用于处理 TypeScript 文件的解析和变更
+import * as ts from 'typescript';
// 导出名为 generateFiles 的函数，返回一个 Rule 规则
export function generateFiles(options: any): Rule {
    // 返回一个函数，该函数接收 Tree 和 SchematicContext 作为参数
    return (_tree: Tree, _context: SchematicContext) => {
        // 从传入的选项中获取实体名称
        const entityName = options.name;
        // 从传入的选项中获取路径标题
        const title = options.path;
        // 定义处理源模板的规则
        const sourceTemplateRules = apply(url('./files/src'), [
            // 应用模板，将传入的选项与字符串和复数处理工具合并
            applyTemplates({
                ...options,
                ...strings,
                plural,
                entityName
            }),
            // 将生成的文件移动到目标路径
            move(path.normalize(`src`)),
        ]);
        // 定义处理视图模板的规则
        const viewsTemplateRules = apply(url('./files/views'), [
            // 应用模板，将传入的选项与字符串和复数处理工具合并
            applyTemplates({
                ...options,
                ...strings,
                plural,
                entityName,
                title
            }),
            // 将生成的视图文件移动到目标路径
            move(path.normalize(`views`)),
        ]);
        // 返回一个链式规则，应用源模板和视图模板的规则
        return chain([
            mergeWith(sourceTemplateRules),
            mergeWith(viewsTemplateRules),
            // 调用 updateAdminModule 函数更新 AdminModule
+           updateAdminModule(entityName),
        ]);
    };
}
+// 定义函数 updateAdminModule 用于更新 AdminModule 文件
+function updateAdminModule(entityName: string) {
+    // 返回一个函数，接收 Tree 作为参数
+    return (tree: Tree) => {
+        // 定义 AdminModule 文件的路径
+        const adminModulePath = 'src/admin/admin.module.ts';
+        // 读取并解析 AdminModule 文件为 TypeScript 源文件
+        const sourceFile = getSourceFile(tree, adminModulePath);
+        // 如果源文件存在
+        if (sourceFile) {
+            // 获取实体名称的分类形式和破折号形式
+            const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
+            // 定义更新操作，添加控制器导入和控制器数组的更新
+            const updates = [
+                addImportToModule(`${classifiedName}Controller`, `./controllers/${dasherizedName}.controller`),
+                addToModuleArray(`controllers`, `${classifiedName}Controller`)
+            ];
+            // 应用更新并保存变更到 AdminModule 文件
+            applyTransformationsAndSave(tree, adminModulePath, sourceFile, updates);
+        }
+        // 返回修改后的 Tree
+        return tree;
+    };
+}
+// 定义函数 getClassifiedAndDasherizedName 获取分类名称和破折号形式名称
+function getClassifiedAndDasherizedName(name: string) {
+    // 将名称转换为分类形式（驼峰形式）
+    const classifiedName = strings.classify(name);
+    // 将分类形式名称转换为破折号形式
+    const dasherizedName = strings.dasherize(classifiedName);
+    // 返回分类形式名称和破折号形式名称的对象
+    return { classifiedName, dasherizedName };
+}
+// 定义函数 getSourceFile 用于读取并解析源文件为 TypeScript 源文件对象
+function getSourceFile(tree: Tree, filePath: string): ts.SourceFile | undefined {
+    // 读取指定路径的文件内容，并转换为字符串
+    const content = tree.read(filePath)?.toString('utf-8');
+    // 使用 TypeScript 创建源文件对象
+    return ts.createSourceFile(filePath, content!, ts.ScriptTarget.Latest, true);
+}
+// 定义函数 addImportToModule 用于在模块文件中添加导入语句
+function addImportToModule(importName: string, importPath: string): ts.TransformerFactory<ts.SourceFile> {
+    // 返回一个转换工厂函数，用于在指定文件中插入导入语句
+    //TransformerFactory 是一个高阶函数，它接收 TransformationContext 并返回另一个处理 SourceFile 的函数。这个返回的函数用来操作传入的源文件 rootNode。
+    return (_context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
+        // 查找文件中的最后一个导入声明
+        const lastImport = rootNode.statements.filter(ts.isImportDeclaration).pop();
+        // 创建一个新的导入声明
+        const newImport = ts.factory.createImportDeclaration(
+            undefined,
+            ts.factory.createImportClause(false, undefined, ts.factory.createNamedImports([
+                ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(importName)),
+            ])),
+            ts.factory.createStringLiteral(importPath)
+        );
+        // 在最后一个导入声明后插入新的导入声明
+        const updatedStatements = ts.factory.createNodeArray([
+            ...rootNode.statements.slice(0, rootNode.statements.indexOf(lastImport!) + 1),
+            newImport,
+            ...rootNode.statements.slice(rootNode.statements.indexOf(lastImport!) + 1),
+        ]);
+        //创建一个新的源文件对象，它包含了插入新导入声明后的所有语句。返回这个更新后的 SourceFile
+        return ts.factory.updateSourceFile(rootNode, updatedStatements) as ts.SourceFile;
+    };
+}
+// 定义函数 addToModuleArray 用于在模块的控制器数组中添加新控制器
+function addToModuleArray(arrayName: string, itemName: string): ts.TransformerFactory<ts.SourceFile> {
+    // 返回一个转换工厂函数，用于更新数组属性
+    return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
+        // 定义访问器函数，递归遍历节点
+        function visitor(node: ts.Node): ts.Node {
+            // 检查节点是否为指定的数组属性
+            if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === arrayName && ts.isArrayLiteralExpression(node.initializer)) {
+                // 将新控制器项添加到数组中
+                const elements = [...node.initializer.elements.map(e => e.getText()), itemName];
+                // 返回更新后的数组属性节点
+                return ts.factory.updatePropertyAssignment(node, node.name, ts.factory.createArrayLiteralExpression(elements.map(e => ts.factory.createIdentifier(e))));
+            }
+            // 递归遍历子节点
+            return ts.visitEachChild(node, visitor, context);
+        }
+        // 返回更新后的源文件
+        return ts.visitNode(rootNode, visitor) as ts.SourceFile;
+    };
+}
+// 定义函数 applyTransformationsAndSave 用于应用变更并将更新保存到文件
+function applyTransformationsAndSave(
+    tree: Tree,
+    filePath: string,
+    sourceFile: ts.SourceFile,
+    transformations: Array<ts.TransformerFactory<ts.SourceFile>>
+) {
+    // 应用变更并获取更新后的源文件
+    const updatedSourceFile = ts.transform(sourceFile, transformations).transformed[0];
+    // 将更新后的文件内容写回指定路径
+    tree.overwrite(filePath, ts.createPrinter().printFile(updatedSourceFile as ts.SourceFile));
+}
```

## 7.updateSharedModule

### 7.1. index.ts

src/cms-gen/index.ts

```diff
import { Rule, SchematicContext, Tree, applyTemplates, url, move, apply, mergeWith, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';
import { plural } from 'pluralize';
import * as ts from 'typescript';
export function generateFiles(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const entityName = options.name;
    const title = options.path;
    const sourceTemplateRules = apply(url('./files/src'), [
      applyTemplates({
        ...options,
        ...strings,
        plural,
        entityName
      }),
      move(path.normalize(`src`)),
    ]);
    const viewsTemplateRules = apply(url('./files/views'), [
      applyTemplates({
        ...options,
        ...strings,
        plural,
        entityName,
        title
      }),
      move(path.normalize(`views`)),
    ]);
    return chain([
      mergeWith(sourceTemplateRules),
      mergeWith(viewsTemplateRules),
      updateAdminModule(entityName),
+     updateSharedModule(entityName)
    ]);
  };
}
+// 定义一个函数，用于更新 shared.module.ts 文件，添加指定实体和服务的导入以及相关的模块配置
+function updateSharedModule(entityName: string) {
+  // 返回一个操作 Tree 的函数，接收 tree 参数
+  return (tree: Tree) => {
+    // 定义 shared.module.ts 文件的路径
+    const sharedModulePath = 'src/shared/shared.module.ts';
+    // 从 Tree 中读取并解析 shared.module.ts 文件的内容，获取其 AST
+    const sourceFile = getSourceFile(tree, sharedModulePath);
+    // 如果 sourceFile 存在（即文件成功读取并解析）
+    if (sourceFile) {
+      // 获取实体名称的分类形式（PascalCase）和连字符形式（kebab-case）
+      const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
+      // 定义要应用的更新操作，包括导入实体、服务，以及更新 providers 和 exports 数组
+      const updates = [
+        addImportToModule(classifiedName, `./entities/${dasherizedName}.entity`),  // 添加实体的导入
+        addImportToModule(`${classifiedName}Service`, `./services/${dasherizedName}.service`),  // 添加服务的导入
+        addToModuleArray(`providers`, `${classifiedName}Service`),  // 将服务添加到 providers 数组
+        addToModuleArray(`exports`, `${classifiedName}Service`),  // 将服务添加到 exports 数组
+        addToMethodArray('forFeature', classifiedName)  // 将实体添加到 TypeOrmModule.forFeature([]) 方法调用的数组中
+      ];
+      // 应用所有更新并将更改保存到 shared.module.ts 文件中
+      applyTransformationsAndSave(tree, sharedModulePath, sourceFile, updates);
+    }
+    // 返回更新后的 Tree
+    return tree;
+  };
+}
+// 定义一个函数，用于将资源名称添加到特定方法调用的数组参数中
+function addToMethodArray(methodName: string, resourceName: string): ts.TransformerFactory<ts.+SourceFile> {
+  // 返回一个用于操作 AST 的转换工厂
+  return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
+    // 定义访问器函数，用于遍历 AST 节点
+    function visitor(node: ts.Node): ts.Node {
+      // 检查当前节点是否为方法调用，并且该方法是我们指定的 methodName
+      if (
+        ts.isCallExpression(node) &&
+        ts.isPropertyAccessExpression(node.expression) &&
+        node.expression.name.text === methodName &&
+        node.arguments.length === 1 &&
+        ts.isArrayLiteralExpression(node.arguments[0])
+      ) {
+        // 获取原始数组中的所有元素，并添加新的资源名称
+        const elements = [...node.arguments[0].elements, ts.factory.createIdentifier(resourceName)];
+        // 更新方法调用，将新数组作为参数传递
+        return ts.factory.updateCallExpression(
+          node,
+          node.expression,
+          node.typeArguments,
+          [ts.factory.createArrayLiteralExpression(elements)]
+        );
+      }
+      // 递归遍历 AST 节点
+      return ts.visitEachChild(node, visitor, context);
+    }
+    // 返回更新后的根节点
+    return ts.visitNode(rootNode, visitor) as ts.SourceFile;
+  };
+}

function updateAdminModule(entityName: string) {
  return (tree: Tree) => {
    const adminModulePath = 'src/admin/admin.module.ts';
    const sourceFile = getSourceFile(tree, adminModulePath);
    if (sourceFile) {
      const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
      const updates = [
        addImportToModule(`${classifiedName}Controller`, `./controllers/${dasherizedName}.controller`),
        addToModuleArray(`controllers`, `${classifiedName}Controller`)
      ];
      applyTransformationsAndSave(tree, adminModulePath, sourceFile, updates);
    }
    return tree;
  };
}
function getClassifiedAndDasherizedName(name: string) {
  const classifiedName = strings.classify(name);
  const dasherizedName = strings.dasherize(classifiedName);
  return { classifiedName, dasherizedName };
}
function getSourceFile(tree: Tree, filePath: string): ts.SourceFile | undefined {
  const content = tree.read(filePath)?.toString('utf-8');
  return ts.createSourceFile(filePath, content!, ts.ScriptTarget.Latest, true);
}
function addImportToModule(importName: string, importPath: string): ts.TransformerFactory<ts.SourceFile> {
  return (_context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    const lastImport = rootNode.statements.filter(ts.isImportDeclaration).pop();
    const newImport = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(false, undefined, ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(importName)),
      ])),
      ts.factory.createStringLiteral(importPath)
    );
    const updatedStatements = ts.factory.createNodeArray([
      ...rootNode.statements.slice(0, rootNode.statements.indexOf(lastImport!) + 1),
      newImport,
      ...rootNode.statements.slice(rootNode.statements.indexOf(lastImport!) + 1),
    ]);
    return ts.factory.updateSourceFile(rootNode, updatedStatements) as ts.SourceFile;
  };
}
function addToModuleArray(arrayName: string, itemName: string): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    function visitor(node: ts.Node): ts.Node {
      if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === arrayName && ts.isArrayLiteralExpression(node.initializer)) {
        const elements = [...node.initializer.elements.map(e => e.getText()), itemName];
        return ts.factory.updatePropertyAssignment(node, node.name, ts.factory.createArrayLiteralExpression(elements.map(e => ts.factory.createIdentifier(e))));
      }
      return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(rootNode, visitor) as ts.SourceFile;
  };
}
function applyTransformationsAndSave(
  tree: Tree,
  filePath: string,
  sourceFile: ts.SourceFile,
  transformations: Array<ts.TransformerFactory<ts.SourceFile>>
) {
  const updatedSourceFile = ts.transform(sourceFile, transformations).transformed[0];
  tree.overwrite(filePath, ts.createPrinter().printFile(updatedSourceFile as ts.SourceFile));
}
```

## 8.树型模板

```js
nest g generateTree category --collection=D:/aprepare/nest/cms-gen
```

### 8.1. collection.json

src/collection.json

```diff
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
+   "generateList": {
      "description": "A blank schematic.",
+     "factory": "./cms-gen/index#generateList"
+   },
+   "generateTree": {
+     "description": "A blank schematic.",
+     "factory": "./cms-gen/index#generateTree"
    }
  }
}
```

### 8.2. entityName@dasherize-detail.hbs.template

src/cms-gen/tree/views/**entityName@dasherize**/**entityName@dasherize**-detail.hbs.template

```js
<h1>
    <%= title %>详情
</h1>
<div class="mb-3">
    <label class="form-label">名称:</label>
    <p class="form-control-plaintext">{{<%= camelize(entityName) %>.name}}</p>
</div>
<div class="mb-3">
    <label class="form-label">状态:</label>
    <p class="form-control-plaintext">{{#if <%= camelize(entityName) %>.status}}激活{{else}}未激活{{/if}}</p>
</div>
<a href="/admin/<%= dasherize(plural(entityName)) %>/{{<%= camelize(entityName) %>.id}}/edit"
    class="btn btn-warning btn-sm">修改</a>
<a href="/admin/<%= dasherize(plural(entityName)) %>" class="btn btn-secondary btn-sm">返回列表</a>
```

### 8.3. entityName@dasherize-detail.hbs.template

src/cms-gen/rows/views/**entityName@dasherize**/**entityName@dasherize**-detail.hbs.template

```js
<h1>
    <%= classify(title) %>详情
</h1>
<div class="mb-3">
    <label class="form-label">名称:</label>
    <p class="form-control-plaintext">{{<%= camelize(entityName) %>.name}}</p>
</div>
<div class="mb-3">
    <label class="form-label">状态:</label>
    <p class="form-control-plaintext">{{#if <%= camelize(entityName) %>.status}}激活{{else}}未激活{{/if}}</p>
</div>
<a href="/admin/<%= dasherize(plural(entityName)) %>/{{<%= camelize(entityName) %>.id}}/edit"
    class="btn btn-warning btn-sm">修改</a>
<a href="/admin/<%= dasherize(plural(entityName)) %>" class="btn btn-secondary btn-sm">返回列表</a>
```

### 8.4. entityName.entity.ts.template

src/cms-gen/list/src/shared/entities/**entityName**.entity.ts.template

```js
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class <%= classify(entityName) %> {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @Column({ length: 50, unique: true })
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @Column({ default: 1 })
    @ApiProperty({ description: '生效状态', example: 1 })
    status: number;

    @Column({ default: 100 })
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;

    @CreateDateColumn()
    @ApiProperty({ description: '创建时间', example: '2024年8月11日16:49:22' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '更新时间', example: '2024年8月11日16:49:22' })
    updatedAt: Date;
}
```

### 8.5. entityName.dto.ts.template

src/cms-gen/list/src/shared/dto/**entityName**.dto.ts.template

```js
import { ApiProperty, PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IdValidators, StatusValidators, SortValidators } from '../decorators/dto.decorator';

export class Create<%= classify(entityName) %>Dto {
    @IsString()
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @StatusValidators()
    @ApiProperty({ description: '状态', example: 1 })
    status: number;

    @SortValidators()
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;
}

export class Update<%= classify(entityName) %>Dto extends PartialTypeFromSwagger(PartialType(Create<%= classify(entityName) %>Dto)) {
    @IdValidators()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '用户名', example: 'nick' })
    username: string;

    @ApiProperty({ description: '密码', example: '666666' })
    @IsOptional()
    password: string;
}
```

### 8.6. entityName@dasherize-form.hbs.template

src/cms-gen/list/views/**entityName@dasherize**/**entityName@dasherize**-form.hbs.template

```js
<h1>{{#if <%= camelize(entityName) %>.id}}编辑<%=classify(title) %>{{else}}添加<%= classify(title) %>{{/if}}</h1>
<form
    action="/admin/<%= dasherize(plural(entityName)) %>{{#if <%= camelize(entityName) %>.id}}/{{<%= camelize(entityName) %>.id}}{{/if}}"
    method="POST">
    {{#if <%= camelize(entityName) %>.id}}<input type="hidden" name="_method" value="PUT">{{/if}}
        <div class="mb-3">
            <label for="name" class="form-label">名称</label>
            <input type="text" class="form-control" id="name" name="name" value="{{<%= camelize(entityName) %>.name}}">
        </div>
        <div class="mb-3">
            <label for="status" class="form-label">状态</label>
            <select class="form-control" id="status" name="status">
                <option value="1" {{#if <%=camelize(entityName) %>.status}}selected{{/if}}>激活</option>
                <option value="0" {{#unless <%=camelize(entityName) %>.status}}selected{{/unless}}>未激活</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">保存</button>
</form>
```

### 8.7. entityName.entity.ts.template

src/cms-gen/tree/src/shared/entities/**entityName**.entity.ts.template

```js
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Tree, TreeChildren, TreeParent} from 'typeorm';

@Entity()
@Tree("materialized-path")
export class <%= classify(entityName) %> {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @Column({ length: 50, unique: true })
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @TreeChildren()
    children: <%= classify(entityName) %>[];

    @TreeParent()
    parent: <%= classify(entityName) %>;

    @Column({ default: 1 })
    @ApiProperty({ description: '生效状态', example: 1 })
    status: number;

    @Column({ default: 100 })
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;

    @CreateDateColumn()
    @ApiProperty({ description: '创建时间', example: '2024年8月11日16:49:22' })
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty({ description: '更新时间', example: '2024年8月11日16:49:22' })
    updatedAt: Date;
}
```

### 8.8. entityName.dto.ts.template

src/cms-gen/tree/src/shared/dto/**entityName**.dto.ts.template

```js
import { ApiProperty, PartialType as PartialTypeFromSwagger } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IdValidators, StatusValidators, SortValidators } from '../decorators/dto.decorator';

export class Create<%= classify(entityName) %>Dto {
    @IsString()
    @ApiProperty({ description: '名称', example: 'name' })
    name: string;

    @ApiProperty({ description: '父权限ID', example: '1' })
    parentId?: number;

    @StatusValidators()
    @ApiProperty({ description: '状态', example: 1 })
    status: number;

    @SortValidators()
    @ApiProperty({ description: '排序号', example: 100 })
    sort: number;
}

export class Update<%= classify(entityName) %>Dto extends PartialTypeFromSwagger(PartialType(Create<%= classify(entityName) %>Dto)) {
    @IdValidators()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '用户名', example: 'nick' })
    username: string;

    @ApiProperty({ description: '密码', example: '666666' })
    @IsOptional()
    password: string;
}
```

### 8.9. entityName.service.ts.template

src/cms-gen/list/src/shared/services/**entityName**.service.ts.template

```js
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { <%= classify(entityName) %> } from "../entities/<%= dasherize(entityName) %>.entity";
import { Repository, Like } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";

@Injectable()
export class <%= classify(entityName) %>Service extends MySQLBaseService<<%= classify(entityName) %>> {
  constructor(
    @InjectRepository(<%= classify(entityName) %>) protected repository: Repository<<%= classify(entityName) %>>
  ) {
    super(repository);
  }

  async findAll(keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    return this.repository.find({ where });
  }

  async findAllWithPagination(page: number, limit: number, keyword?: string) {
    const where = keyword ? [
      { name: Like(`%${keyword}%`) }
    ] : {};
    const [<%= camelize(plural(entityName)) %>, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit
    });
    return { <%= camelize(plural(entityName)) %>, total };
  }
}
```

### 8.10. entityName@dasherize-node.hbs.template

src/cms-gen/tree/views/partials/**entityName@dasherize**-node.hbs.template

```js
<tr data-id="{{id}}" data-parent="{{parent.id}}">
    <td style="padding-left: {{multiply depth 20}}px;">
        <span class="toggle cursor-pointer" data-id="{{id}}">
            {{#if children.length}}
            <i class="bi bi-folder-minus"></i>
            {{/if}}
        </span>
        {{name}}
    </td>
    <td>
        <span class="status-toggle" data-id="{{id}}" data-status="{{status}}">
            {{#if status}}
            <i class="bi bi-check-circle-fill text-success"></i>
            {{else}}
            <i class="bi bi-x-circle-fill text-danger"></i>
            {{/if}}
        </span>
    </td>
    <td>
        <span class="sort-text" data-id="{{id}}">{{sort}}</span>
        <input type="number" class="form-control sort-input d-none" style="width:80px" data-id="{{id}}"
            value="{{sort}}">
    </td>
    <td>
        <a href="/admin/<%= dasherize(plural(entityName)) %>/{{id}}" class="btn btn-primary btn-sm">查看</a>
        <a href="/admin/<%= dasherize(plural(entityName)) %>/{{id}}/edit" class="btn btn-warning btn-sm">编辑</a>
        <button class="btn btn-danger btn-sm" onclick="delete<%= classify(entityName) %>({{id}})">删除</button>
    </td>
</tr>
{{#each children}}
{{> <%= dasherize(entityName) %>-node this depth=(inc ../depth)}}
{{/each}}
```

### 8.11. entityName.service.ts.template

src/cms-gen/tree/src/shared/services/**entityName**.service.ts.template

```js
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { <%= classify(entityName) %> } from "../entities/<%= dasherize(entityName) %>.entity";
import { Repository, Like } from 'typeorm';
import { MySQLBaseService } from "./mysql-base.service";
 import { Create<%= classify(entityName) %>Dto, Update<%= classify(entityName) %>Dto } from '../dto/<%= dasherize(entityName) %>.dto';
import { TreeRepository, UpdateResult } from 'typeorm';
@Injectable()
export class <%= classify(entityName) %>Service extends MySQLBaseService<<%= classify(entityName) %>> {
  constructor(
    @InjectRepository(<%= classify(entityName) %>) protected repository: TreeRepository<<%= classify(entityName) %>>
  ) {
    super(repository);
  }

  async findAll() {
    const <%= camelize(entityName) %>Tree = await this.repository.findTrees({ relations: ['children', 'parent'] });
    return <%= camelize(entityName) %>Tree.filter(<%= camelize(entityName) %> => !<%= camelize(entityName) %>.parent);
  }

  async create(create<%= classify(entityName) %>Dto: Create<%= classify(entityName) %>Dto): Promise<<%= classify(entityName) %>> {
    const { parentId, ...dto } = create<%= classify(entityName) %>Dto;
    const <%= camelize(entityName) %> = this.repository.create(dto);
    if (parentId) {
      <%= camelize(entityName) %>.parent = await this.repository.findOneBy({ id: parentId });
    }
    await this.repository.save(<%= camelize(entityName) %>);
    return this.findOne({ where: { id: <%= camelize(entityName) %>.id } });
  }

  async update(id: number, update<%= classify(entityName) %>Dto: Update<%= classify(entityName) %>Dto) {
    const { parentId, ...dto } = update<%= classify(entityName) %>Dto;
    const <%= camelize(entityName) %> = await this.repository.findOneBy({ id });
    if (!<%= camelize(entityName) %>) throw new Error('<%= classify(entityName) %> not found');
    Object.assign(<%= camelize(entityName) %>, dto);
    if (parentId) {
      <%= camelize(entityName) %>.parent = await this.repository.findOneBy({ id: parentId });
    }
    await this.repository.save(<%= camelize(entityName) %>);
    return UpdateResult.from({ raw: [], affected: 1, records: [] });
  }
}
```

### 8.12. entityName@dasherize-form.hbs.template

src/cms-gen/tree/views/**entityName@dasherize**/**entityName@dasherize**-form.hbs.template

```js
<h1>{{#if <%= camelize(entityName) %>.id}}编辑<%=title%>{{else}}添加<%= title %>{{/if}}</h1>
<form
    action="/admin/<%= dasherize(plural(entityName)) %>{{#if <%= camelize(entityName) %>.id}}/{{<%= camelize(entityName) %>.id}}{{/if}}"
    method="POST">
    {{#if <%= camelize(entityName) %>.id}}<input type="hidden" name="_method" value="PUT">{{/if}}
        <div class="mb-3">
            <label for="name" class="form-label">名称</label>
            <input type="text" class="form-control" id="name" name="name" value="{{<%= camelize(entityName) %>.name}}">
        </div>
        <div class="mb-3">
            <label for="parentId" class="form-label">父权限</label>
            <div id="parentTree" class="border rounded p-3"></div>
        </div>
        <div class="mb-3">
            <label for="status" class="form-label">状态</label>
            <select class="form-control" id="status" name="status">
                <option value="1" {{#if <%=camelize(entityName) %>.status}}selected{{/if}}>激活</option>
                <option value="0" {{#unless <%=camelize(entityName) %>.status}}selected{{/unless}}>未激活</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">保存</button>
</form>
<script>
    const <%= camelize(entityName) %>Tree = {{{ json <%= camelize(entityName) %>Tree }}};
    const selectedParentId = {{{ def <%= camelize(entityName) %>.parent.id }}};
    const <%= camelize(entityName) %>Id = {{{ def <%= camelize(entityName) %>.id }}};
    function renderTree(<%= camelize(plural(entityName)) %>) {
        let html = '<ul class="list-unstyled">';
        <%= camelize(plural(entityName)) %>.forEach(function (<%= camelize(entityName) %>) {
            if (<%= camelize(entityName) %>.id == <%= camelize(entityName) %>Id) {
                return;
            }
            html += `
            <li class="mb-2">
                <div class="d-flex align-items-center">
                    ${<%= camelize(entityName) %>.children?.length > 0 ? '<span class="toggle me-2 cursor-pointer"><i class="bi bi-folder-plus"></i></span>' : '<span class="me-4"></span>'}
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="parentId" value="${<%= camelize(entityName) %>.id}" ${<%= camelize(entityName) %>.id == selectedParentId ? 'checked' : ''}>
                        ${<%= camelize(entityName) %>.name}
                    </label>
                </div>
                ${<%= camelize(entityName) %>.children?.length > 0 ? `<div class="children ms-4" >${renderTree(<%= camelize(entityName) %>.children)}</div>` : ''}
            </li>`;
        });
        html += '</ul>';
        return html;
    }
    $(function () {
        $('#parentTree').html(renderTree(<%= camelize(entityName) %>Tree));
        $('body').on('click', '.toggle', function () {
            const childrenContainer = $(this).parent().siblings('.children');
            if (childrenContainer.is(':visible')) {
                childrenContainer.hide();
                $(this).html('<i class="bi bi-folder-plus"></i>');
            } else {
                childrenContainer.show();
                $(this).html('<i class="bi bi-folder-minus"></i>');
            }
        });
    });
</script>
```

### 8.13. entityName.controller.ts.template

src/cms-gen/tree/src/admin/controllers/**entityName**.controller.ts.template

```js
import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { Create<%= classify(entityName) %>Dto, Update<%= classify(entityName) %>Dto } from 'src/shared/dto/<%= dasherize(entityName) %>.dto';
import { <%= classify(entityName) %>Service } from 'src/shared/services/<%= dasherize(entityName) %>.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { Response } from 'express';
@UseFilters(AdminExceptionFilter)
@Controller('admin/<%= dasherize(plural(entityName)) %>')
export class <%= classify(entityName) %>Controller {
    constructor(
        private readonly <%= camelize(entityName) %>Service: <%= classify(entityName) %>Service,
    ) { }

    @Get()
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-list')
    async findAll(){
        const <%= camelize(entityName) %>Tree = await this.<%= camelize(entityName) %>Service.findAll();
        return { <%= camelize(entityName) %>Tree };
    }

    @Get('create')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-form')
    async createForm() {
        const <%= camelize(entityName) %>Tree = await this.<%= camelize(entityName) %>Service.findAll();
        return { <%= camelize(entityName) %>: {}, <%= camelize(entityName) %>Tree };
    }

    @Post()
    @Redirect('/admin/<%= dasherize(plural(entityName)) %>')
    async create(@Body() create<%= classify(entityName) %>Dto: Create<%= classify(entityName) %>Dto) {
        await this.<%= camelize(entityName) %>Service.create(create<%= classify(entityName) %>Dto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const <%= camelize(entityName) %> = await this.<%= camelize(entityName) %>Service.findOne({ where: { id }, relations: ['children', 'parent'] });
        if (!<%= camelize(entityName) %>) throw new HttpException('<%= classify(entityName) %> not Found', 404);
        const <%= camelize(entityName) %>Tree = await this.<%= camelize(entityName) %>Service.findAll();
        return { <%= camelize(entityName) %> ,<%= camelize(entityName) %>Tree};
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() update<%= classify(entityName) %>Dto: Update<%= classify(entityName) %>Dto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        await this.<%= camelize(entityName) %>Service.update(id, update<%= classify(entityName) %>Dto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/<%= dasherize(plural(entityName)) %>`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.<%= camelize(entityName) %>Service.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const <%= camelize(entityName) %> = await this.<%= camelize(entityName) %>Service.findOne({ where: { id } });
        if (!<%= camelize(entityName) %>) throw new HttpException('<%= classify(entityName) %> not Found', 404);
        return { <%= camelize(entityName) %> };
    }
}
```

### 8.14. entityName@dasherize-list.hbs.template

src/cms-gen/tree/views/**entityName@dasherize**/**entityName@dasherize**-list.hbs.template

```js
<h1>
  <%= title %>列表
</h1>
<a href="/admin/<%= dasherize(plural(entityName)) %>/create" class="btn btn-success mb-3">添加<%=title %></a>
<form method="GET" action="/admin/<%= dasherize(plural(entityName)) %>" class="mb-3">
  <div class="input-group">
    <input type="text" name="keyword" class="form-control" placeholder="请输入搜索关键字" value="{{keyword}}">
    <button class="btn btn-outline-secondary">搜索</button>
  </div>
</form>
<table class="table">
  <thead>
    <tr>
      <td>名称</td>
      <td>状态</td>
      <td>排序</td>
      <td>操作</td>
    </tr>
  </thead>
  <tbody id="<%= camelize(entityName) %>TreeTable">
    {{#each <%= camelize(entityName) %>Tree}}
    {{> <%= dasherize(entityName) %>-node this depth=0}}
    {{/each}}
  </tbody>
</table>
<script>
  function delete<%= classify(entityName) %> (id) {
    if (confirm('确定要删除吗?')) {
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'DELETE',
        success: function (data) {
          if (data.success) {
            const params = new URLSearchParams(window.location.search);
            params.delete('page');
            params.append('page', 1)
            const query = params.toString();
            window.location = window.location.pathname + '?' + query;
          }
        }
      })
    }
  }
  $(function () {
    $('#<%= camelize(entityName) %>TreeTable').on('click', '.toggle', function () {
      const $toggle = $(this);
      const id = $toggle.data('id');
      const $tr = $toggle.closest('tr');
      if ($tr.nextAll('tr[data-parent="' + id + '"]').is(':visible')) {
        hideChildren($tr, id);
        $toggle.html('<i class="bi bi-folder-plus"></i>');
      } else {
        $tr.nextAll('tr[data-parent="' + id + '"]').show();
        $toggle.html('<i class="bi bi-folder-minus"></i>');
      }
    });
    function hideChildren($tr, id) {
      const $children = $tr.nextAll('tr[data-parent="' + id + '"]');
      $children.each(function () {
        const childId = $(this).data('id');
        hideChildren($(this), childId);
      });
      $children.hide();
    }
    $('.sort-text').on('dblclick', function () {
      const $this = $(this);
      const id = $this.data('id');
      $this.addClass('d-none');
      $(`.sort-input[data-id="${id}"]`).removeClass('d-none').focus();
    });
    $('.sort-input').on('blur', function () {
      const $this = $(this);
      const id = $this.data('id');
      const newSort = $this.val();
      $this.addClass('d-none');
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'PUT',
        headers: { 'accept': 'application/json' },
        contentType: 'application/json',
        data: JSON.stringify({ sort: newSort }),
        success: function (data) {
          if (data.success) {
            $(`.sort-text[data-id="${id}"]`).removeClass('d-none').text(newSort);
          }
        }
      })
    });
    $('.status-toggle').on('click', function () {
      const $this = $(this);
      const id = $this.data('id');
      const currentStatus = $this.data('status');
      const newStatus = currentStatus == 1 ? 0 : 1;
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'PUT',
        headers: { 'accept': 'application/json' },
        contentType: 'application/json',
        data: JSON.stringify({ status: newStatus }),
        success: function (data) {
          if (data.success) {
            $this.data('status', newStatus);
            $this.html(` <i class="bi ${newStatus ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} ${newStatus ? 'text-success' : 'text-danger'}"></i>`);
          }
        }
      })
    });
  });
</script>
```

### 8.15. entityName.controller.ts.template

src/cms-gen/list/src/admin/controllers/**entityName**.controller.ts.template

```js
import { Controller, Get, Render, Post, Redirect, Body, UseFilters, HttpException, Param, ParseIntPipe, Put, Delete, Headers, Res, Query } from '@nestjs/common';
import { Create<%= classify(entityName) %>Dto, Update<%= classify(entityName) %>Dto } from 'src/shared/dto/<%= dasherize(entityName) %>.dto';
import { <%= classify(entityName) %>Service } from 'src/shared/services/<%= dasherize(entityName) %>.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';
import { UtilityService } from 'src/shared/services/utility.service';
import { Response } from 'express';
import { ParseOptionalIntPipe } from 'src/shared/pipes/parse-optional-int.pipe';

@UseFilters(AdminExceptionFilter)
@Controller('admin/<%= dasherize(plural(entityName)) %>')
export class <%= classify(entityName) %>Controller {
    constructor(
        private readonly <%= camelize(entityName) %>Service: <%= classify(entityName) %>Service,
        private readonly utilityService: UtilityService
    ) { }

    @Get()
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-list')
    async findAll(@Query('keyword') keyword: string = '',
        @Query('page', new ParseOptionalIntPipe(1)) page: number,
        @Query('limit', new ParseOptionalIntPipe(10)) limit: number) {
        const { <%= camelize(plural(entityName)) %>, total } = await this.<%= camelize(entityName) %>Service.findAllWithPagination(page, limit, keyword);
        const pageCount = Math.ceil(total / limit);
        return { <%= camelize(plural(entityName)) %>, keyword, page, limit, pageCount };
    }

    @Get('create')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-form')
    createForm() {
        return { <%= camelize(entityName) %>: {} }
    }

    @Post()
    @Redirect('/admin/<%= dasherize(plural(entityName)) %>')
    async create(@Body() create<%= classify(entityName) %>Dto: Create<%= classify(entityName) %>Dto) {
        await this.<%= camelize(entityName) %>Service.create(create<%= classify(entityName) %>Dto);
        return { success: true }
    }

    @Get(':id/edit')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-form')
    async editForm(@Param('id', ParseIntPipe) id: number) {
        const <%= camelize(entityName) %> = await this.<%= camelize(entityName) %>Service.findOne({ where: { id } });
        if (!<%= camelize(entityName) %>) throw new HttpException('<%= classify(entityName) %> not Found', 404);
        return { <%= camelize(entityName) %> };
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() update<%= classify(entityName) %>Dto: Update<%= classify(entityName) %>Dto, @Res({ passthrough: true }) res: Response, @Headers('accept') accept: string) {
        if (update<%= classify(entityName) %>Dto.password) {
            update<%= classify(entityName) %>Dto.password = await this.utilityService.hashPassword(update<%= classify(entityName) %>Dto.password);
        } else {
            delete update<%= classify(entityName) %>Dto.password;
        }
        await this.<%= camelize(entityName) %>Service.update(id, update<%= classify(entityName) %>Dto);
        if (accept === 'application/json') {
            return { success: true };
        } else {
            return res.redirect(`/admin/<%= dasherize(plural(entityName)) %>`);
        }
    }

    @Delete(":id")
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.<%= camelize(entityName) %>Service.delete(id);
        return { success: true }
    }

    @Get(':id')
    @Render('<%= dasherize(entityName) %>/<%= dasherize(entityName) %>-detail')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const <%= camelize(entityName) %> = await this.<%= camelize(entityName) %>Service.findOne({ where: { id } });
        if (!<%= camelize(entityName) %>) throw new HttpException('<%= classify(entityName) %> not Found', 404);
        return { <%= camelize(entityName) %> };
    }
}
```

### 8.16. entityName@dasherize-list.hbs.template

src/cms-gen/list/views/**entityName@dasherize**/**entityName@dasherize**-list.hbs.template

```js
<h1>
  <%=classify(title) %>列表
</h1>
<a href="/admin/<%= dasherize(plural(entityName)) %>/create" class="btn btn-success mb-3">添加<%=classify(title) %></a>
<form method="GET" action="/admin/<%= dasherize(plural(entityName)) %>" class="mb-3">
  <div class="input-group">
    <input type="text" name="keyword" class="form-control" placeholder="请输入搜索关键字" value="{{keyword}}">
    <button class="btn btn-outline-secondary">搜索</button>
  </div>
</form>
<table class="table">
  <thead>
    <tr>
      <td>名称</td>
      <td>状态</td>
      <td>排序</td>
      <td>操作</td>
    </tr>
  </thead>
  <tbody>
    {{#each <%= dasherize(plural(entityName)) %>}}
      <tr>
        <td>{{this.name}}</td>
        <td>
          <span class="status-toggle" data-id="{{this.id}}" data-status="{{this.status}}">
            {{#if this.status}}
            <i class="bi bi-check-circle-fill text-success"></i>
            {{else}}
            <i class="bi bi-x-circle-fill text-danger"></i>
            {{/if}}
          </span>
        </td>
        <td>
          <span class="sort-text" data-id="{{this.id}}">{{this.sort}}</span>
          <input type="number" class="form-control sort-input d-none" style="width:50%" data-id="{{this.id}}"
            value="{{this.sort}}">
        </td>
        <td>
          <a href="/admin/<%= dasherize(plural(entityName)) %>/{{this.id}}" class="btn btn-primary btn-sm">查看</a>
          <a href="/admin/<%= dasherize(plural(entityName)) %>/{{this.id}}/edit" class="btn btn-warning btn-sm">修改</a>
          <a class="btn btn-danger btn-sm" onclick="delete<%= classify(entityName) %>({{this.id}})">删除</a>
        </td>
      </tr>
      {{/each}}
  </tbody>
</table>
<nav>
  <ul class="pagination">
    <li class="page-item {{#if (eq page 1)}}disabled{{/if}}">
      <a class="page-link" href="?page={{dec page}}&keyword={{keyword}}&limit={{limit}}">上一页</a>
    </li>
    {{#each (range 1 pageCount)}}
    <li class="page-item {{#if (eq this ../page)}}active{{/if}}">
      <a class="page-link" href="?page={{this}}&keyword={{../keyword}}&limit={{../limit}}">{{this}}</a>
    </li>
    {{/each}}

    <li class="page-item {{#if (eq page pageCount)}}disabled{{/if}}">
      <a class="page-link" href="?page={{inc page}}&keyword={{keyword}}&limit={{limit}}">下一页</a>
    </li>
    <li class="page-item">
      <form method="GET" action="/admin/<%= dasherize(plural(entityName)) %>" class="d-inline-block ms-3">
        <input type="hidden" name="keyword" value="{{keyword}}">
        <input type="hidden" name="page" value="{{page}}">
        <div class="input-group">
          <input type="number" name="limit" class="form-control" placeholder="每页条数" value="{{limit}}" min="1">
          <button class="btn btn-outline-secondary" type="submit">设置每页的条数</button>
        </div>
      </form>
    </li>
  </ul>
</nav>
<script>
  function delete<%= classify(entityName) %> (id) {
    if (confirm('确定要删除吗?')) {
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'DELETE',
        success: function (data) {
          if (data.success) {
            const params = new URLSearchParams(window.location.search);
            params.delete('page');
            params.append('page', 1)
            const query = params.toString();
            window.location = window.location.pathname + '?' + query;
          }
        }
      })
    }
  }
  $(function () {
    $('.sort-text').on('dblclick', function () {
      const $this = $(this);
      const id = $this.data('id');
      $this.addClass('d-none');
      $(`.sort-input[data-id="${id}"]`).removeClass('d-none').focus();
    });
    $('.sort-input').on('blur', function () {
      const $this = $(this);
      const id = $this.data('id');
      const newSort = $this.val();
      $this.addClass('d-none');
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'PUT',
        headers: { 'accept': 'application/json' },
        contentType: 'application/json',
        data: JSON.stringify({ sort: newSort }),
        success: function (data) {
          if (data.success) {
            $(`.sort-text[data-id="${id}"]`).removeClass('d-none').text(newSort);
          }
        }
      })
    });
    $('.status-toggle').on('click', function () {
      const $this = $(this);
      const id = $this.data('id');
      const currentStatus = $this.data('status');
      const newStatus = currentStatus == 1 ? 0 : 1;
      $.ajax({
        url: `/admin/<%= dasherize(plural(entityName)) %>/${id}`,
        type: 'PUT',
        headers: { 'accept': 'application/json' },
        contentType: 'application/json',
        data: JSON.stringify({ status: newStatus }),
        success: function (data) {
          if (data.success) {
            $this.data('status', newStatus);
            $this.html(` <i class="bi ${newStatus ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} ${newStatus ? 'text-success' : 'text-danger'}"></i>`);
          }
        }
      })
    });
  });
</script>
```

### 8.17. index.ts

src/cms-gen/index.ts

```diff
import { Rule, SchematicContext, Tree, applyTemplates, url, move, apply, mergeWith, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import * as path from 'path';
import { plural } from 'pluralize';
import * as ts from 'typescript';
+export function generateList(options: any): Rule {
+ return generateFiles(options, 'list');
+}
+
+export function generateTree(options: any): Rule {
+ return generateFiles(options, 'tree');
+}
+export function generateFiles(options: any, templatePath: string): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const entityName = options.name;
    const title = options.path;
+
+   const sourceTemplateRules = apply(url(`./${templatePath}/src`), [
      applyTemplates({
        ...options,
        ...strings,
        plural,
+       entityName,
      }),
      move(path.normalize(`src`)),
    ]);
+
+   const viewsTemplateRules = apply(url(`./${templatePath}/views`), [
      applyTemplates({
        ...options,
        ...strings,
        plural,
        entityName,
+       title,
      }),
      move(path.normalize(`views`)),
    ]);
+
    return chain([
      mergeWith(sourceTemplateRules),
      mergeWith(viewsTemplateRules),
      updateAdminModule(entityName),
+     updateSharedModule(entityName),
    ]);
  };
}
+
+
function updateSharedModule(entityName: string) {
  return (tree: Tree) => {
    const sharedModulePath = 'src/shared/shared.module.ts';
    const sourceFile = getSourceFile(tree, sharedModulePath);
    if (sourceFile) {
      const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
      const updates = [
        addImportToModule(classifiedName, `./entities/${dasherizedName}.entity`),
        addImportToModule(`${classifiedName}Service`, `./services/${dasherizedName}.service`),
        addToModuleArray(`providers`, `${classifiedName}Service`),
        addToModuleArray(`exports`, `${classifiedName}Service`),
        addToMethodArray('forFeature', classifiedName)
      ];
      applyTransformationsAndSave(tree, sharedModulePath, sourceFile, updates);
    }
    return tree;
  };
}
function addToMethodArray(methodName: string, resourceName: string): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    function visitor(node: ts.Node): ts.Node {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === methodName &&
        node.arguments.length === 1 &&
        ts.isArrayLiteralExpression(node.arguments[0])
      ) {
        const elements = [...node.arguments[0].elements, ts.factory.createIdentifier(resourceName)];
        return ts.factory.updateCallExpression(
          node,
          node.expression,
          node.typeArguments,
          [ts.factory.createArrayLiteralExpression(elements)]
        );
      }
      return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(rootNode, visitor) as ts.SourceFile;
  };
}
function updateAdminModule(entityName: string) {
  return (tree: Tree) => {
    const adminModulePath = 'src/admin/admin.module.ts';
    const sourceFile = getSourceFile(tree, adminModulePath);
    if (sourceFile) {
      const { classifiedName, dasherizedName } = getClassifiedAndDasherizedName(entityName);
      const updates = [
        addImportToModule(`${classifiedName}Controller`, `./controllers/${dasherizedName}.controller`),
        addToModuleArray(`controllers`, `${classifiedName}Controller`)
      ];
      applyTransformationsAndSave(tree, adminModulePath, sourceFile, updates);
    }
    return tree;
  };
}
function getClassifiedAndDasherizedName(name: string) {
  const classifiedName = strings.classify(name);
  const dasherizedName = strings.dasherize(classifiedName);
  return { classifiedName, dasherizedName };
}
function getSourceFile(tree: Tree, filePath: string): ts.SourceFile | undefined {
  const content = tree.read(filePath)?.toString('utf-8');
  return ts.createSourceFile(filePath, content!, ts.ScriptTarget.Latest, true);
}
function addImportToModule(importName: string, importPath: string): ts.TransformerFactory<ts.SourceFile> {
  return (_context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    const lastImport = rootNode.statements.filter(ts.isImportDeclaration).pop();
    const newImport = ts.factory.createImportDeclaration(
      undefined,
      ts.factory.createImportClause(false, undefined, ts.factory.createNamedImports([
        ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(importName)),
      ])),
      ts.factory.createStringLiteral(importPath)
    );
    const updatedStatements = ts.factory.createNodeArray([
      ...rootNode.statements.slice(0, rootNode.statements.indexOf(lastImport!) + 1),
      newImport,
      ...rootNode.statements.slice(rootNode.statements.indexOf(lastImport!) + 1),
    ]);
    return ts.factory.updateSourceFile(rootNode, updatedStatements) as ts.SourceFile;
  };
}
function addToModuleArray(arrayName: string, itemName: string): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    function visitor(node: ts.Node): ts.Node {
      if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === arrayName && ts.isArrayLiteralExpression(node.initializer)) {
        const elements = [...node.initializer.elements.map(e => e.getText()), itemName];
        return ts.factory.updatePropertyAssignment(node, node.name, ts.factory.createArrayLiteralExpression(elements.map(e => ts.factory.createIdentifier(e))));
      }
      return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(rootNode, visitor) as ts.SourceFile;
  };
}
function applyTransformationsAndSave(
  tree: Tree,
  filePath: string,
  sourceFile: ts.SourceFile,
  transformations: Array<ts.TransformerFactory<ts.SourceFile>>
) {
  const updatedSourceFile = ts.transform(sourceFile, transformations).transformed[0];
  tree.overwrite(filePath, ts.createPrinter().printFile(updatedSourceFile as ts.SourceFile));
}
```