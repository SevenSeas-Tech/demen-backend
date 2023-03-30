module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" }}],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@config": "./src/config",

          "@shared": "./src/shared",
          "@shared:containers": "./src/shared/containers",
          "@shared:errors": "./src/shared/errors",
          "@shared:typeorm": "./src/shared/infra/typeorm",
          "@shared:middlewares": "./src/shared/infra/http/middlewares",
          "@shared:providers": "./src/shared/containers/providers",

          "@management:containers": "./src/modules/management/containers",
          "@management:dtos": "./src/modules/management/dtos",
          "@management:entities": "./src/modules/management/infra/typeorm/entities",
          "@management:errors": "./src/modules/management/errors",
          "@management:mapper": "./src/modules/management/mapper",
          "@management:repos": "./src/modules/management/infra/typeorm/repositories",
          "@management:irepos": "./src/modules/management/repositories",
          "@management:routes": "./src/modules/management/infra/http/routes",
          "@management:types": "./src/modules/management/@types",
          "@management:use-cases": "./src/modules/management/use-cases",

          "@admin:containers": "./src/modules/admin/containers",
          "@admin:dtos": "./src/modules/admin/dtos",
          "@admin:entities": "./src/modules/admin/infra/typeorm/entities",
          "@admin:errors": "./src/modules/admin/errors",
          "@admin:mapper": "./src/modules/admin/mapper",
          "@admin:repos": "./src/modules/admin/infra/typeorm/repositories",
          "@admin:irepos": "./src/modules/admin/repositories",
          "@admin:routes": "./src/modules/admin/infra/http/routes",
          "@admin:types": "./src/modules/admin/@types",
          "@admin:use-cases": "./src/modules/admin/use-cases",

          "@lessons:containers": "./src/modules/lessons/containers",
          "@lessons:dtos": "./src/modules/lessons/dtos",
          "@lessons:entities": "./src/modules/lessons/infra/typeorm/entities",
          "@lessons:errors": "./src/modules/lessons/errors",
          "@lessons:mapper": "./src/modules/lessons/mapper",
          "@lessons:repos": "./src/modules/lessons/infra/typeorm/repositories",
          "@lessons:irepos": "./src/modules/lessons/repositories",
          "@lessons:routes": "./src/modules/lessons/infra/http/routes",
          "@lessons:types": "./src/modules/lessons/@types",
          "@lessons:use-cases": "./src/modules/lessons/use-cases"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true}],
    ["@babel/plugin-proposal-class-properties", { loose: true}],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}
