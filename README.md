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
│   │   │   └── index.ts
│   │   ├── enum
│   │   │   └── login_origin.enum.ts
│   │   ├── interface
│   │   │   ├── access_token.interface.ts
│   │   │   ├── http_response.interface.ts
│   │   │   └── inspigo_key_header.interface.ts
│   │   ├── provider
│   │   │   └── index.ts
│   │   ├── server
│   │   │   ├── auth
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── guard
│   │   │   │   │   ├── jwt.guard.ts
│   │   │   │   │   ├── jwt_or_server_key.guard.ts
│   │   │   │   │   └── server_key.guard.ts
│   │   │   │   ├── json_web_token
│   │   │   │   │   └── inspigo_jwt.service.ts
│   │   │   │   └── strategy
│   │   │   │       ├── header_api_key.strategy.ts
│   │   │   │       └── jwt.strategy.ts
│   │   │   ├── redis_cache
│   │   │   │   ├── redis_cache.module.ts
│   │   │   │   └── redis_cache.service.ts
│   │   │   ├── response
│   │   │   │   ├── application.response.ts
│   │   │   │   ├── dto
│   │   │   │   │   └── http_response.dto.ts
│   │   │   │   └── http-exception
│   │   │   │       ├── bad_request.exception.ts
│   │   │   │       ├── base.exception.ts
│   │   │   │       ├── duplicated.exception.ts
│   │   │   │       ├── forbidden.exception.ts
│   │   │   │       ├── http_exception.filter.ts
│   │   │   │       ├── internal_server_error.exception.ts
│   │   │   │       ├── not_found.exception.ts
│   │   │   │       └── unauthorized.exception.ts
│   │   │   └── util
│   │   │       └── fn.ts
│   │   ├── service
│   │   └── util
│   │       └── fn.ts
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
│   ├── main.ts
│   ├── modules
│   │   └── some_module_1
│   │       ├── some_module.service.ts
│   │       ├── some_module_1.module.ts
│   │       └── test
│   └── repository
│       └── repo_1
│           ├── repo_1.repository.ts
│           └── test
├── tsconfig.build.json
├── tsconfig.json
└── webpack-hmr.config.js`
```