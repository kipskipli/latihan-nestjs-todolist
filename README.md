# Inspigo NestJs Boilerplate
##### Boilerplate backend untuk project dengan menggunakan NestJs sebagai Framework.
---

```bash
.
├── README.md
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── common
│   │   ├── constant
│   │   │   ├── index.ts
│   │   │   └── redis.ts
│   │   ├── dto
│   │   │   ├── index.ts
│   │   │   └── pagination_query.dto.ts
│   │   ├── enum
│   │   │   ├── index.ts
│   │   │   └── login_origin.enum.ts
│   │   ├── interface
│   │   │   ├── access_token.interface.ts
│   │   │   ├── http_response.interface.ts
│   │   │   ├── index.ts
│   │   │   └── inspigo_key_header.interface.ts
│   │   ├── pipe
│   │   │   ├── index.ts
│   │   │   └── joi_validation.pipe.ts
│   │   ├── provider
│   │   │   └── index.ts
│   │   ├── server
│   │   │   ├── auth
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── guard
│   │   │   │   │   ├── decorator
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   └── origin.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── jwt.guard.ts
│   │   │   │   │   ├── jwt_or_server_key.guard.ts
│   │   │   │   │   ├── origin.guard.ts
│   │   │   │   │   └── server_api_key.guard.ts
│   │   │   │   ├── json_web_token
│   │   │   │   │   └── inspigo_jwt.service.ts
│   │   │   │   └── strategy
│   │   │   │       ├── index.ts
│   │   │   │       ├── jwt.strategy.ts
│   │   │   │       └── server_api_key.strategy.ts
│   │   │   ├── response
│   │   │   │   ├── dto
│   │   │   │   │   ├── http_response.dto.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── http-exception
│   │   │   │       ├── bad_request.exception.ts
│   │   │   │       ├── base.exception.ts
│   │   │   │       ├── duplicated.exception.ts
│   │   │   │       ├── forbidden.exception.ts
│   │   │   │       ├── index.ts
│   │   │   │       ├── internal_server_error.exception.ts
│   │   │   │       ├── not_found.exception.ts
│   │   │   │       └── unauthorized.exception.ts
│   │   │   ├── shared
│   │   │   │   ├── application.response.ts
│   │   │   │   ├── http_exception.filter.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── logging.interceptor.ts
│   │   │   └── util
│   │   │       ├── decorator
│   │   │       │   ├── decorator.ts
│   │   │       │   └── index.ts
│   │   │       ├── fn.ts
│   │   │       └── index.ts
│   │   ├── service
│   │   │   └── redis_cache
│   │   │       ├── redis_cache.module.ts
│   │   │       └── redis_cache.service.ts
│   │   └── util
│   │       ├── fn.ts
│   │       └── index.ts
│   ├── config
│   │   ├── app
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.ts
│   │   │   └── configuration.ts
│   │   ├── jwt
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.ts
│   │   │   └── configuration.ts
│   │   └── redis
│   │       ├── config.module.ts
│   │       ├── config.service.ts
│   │       └── configuration.ts
│   ├── login.pipe.ts
│   ├── main.ts
│   ├── modules
│   │   └── some_module_1
│   │       ├── some_module.service.ts
│   │       ├── some_module_1.module.ts
│   │       └── test
│   ├── repository
│   │   ├── mongo
│   │   │   ├── entity
│   │   │   │   └── model_1.entity.ts
│   │   │   └── model_1
│   │   │       └── model_1.repository.ts
│   │   └── pg
│   │       ├── entity
│   │       │   └── model_1.entity.ts
│   │       └── model_1
│   │           └── model_1.repository.ts
│   └── types
│       └── express.d.ts
├── tree.txt
├── tsconfig.build.json
├── tsconfig.json
└── webpack-hmr.config.js
```