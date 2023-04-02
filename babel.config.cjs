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
          "@shared:database": "./src/shared/infra/database",
          "@shared:errors": "./src/shared/errors",
          "@shared:middlewares": "./src/shared/infra/http/middlewares",
          "@shared:providers": "./src/shared/containers/providers",

          "@management:containers": "./src/modules/management/containers",
          "@management:dtos": "./src/modules/management/@types/dtos",
          "@management:entities": "./src/modules/management/infra/typeorm/entities",
          "@management:errors": "./src/modules/management/errors",
          "@management:mapper": "./src/modules/management/mapper",
          "@management:models": "./src/modules/management/@types/models",
          "@management:repos": "./src/modules/management/infra/typeorm/repositories",
          "@management:irepos": "./src/modules/management/repositories",
          "@management:routes": "./src/modules/management/infra/http/routes",
          "@management:types": "./src/modules/management/@types",
          "@management:use-cases": "./src/modules/management/use-cases",

          "@students:containers": "./src/modules/students/containers",
          "@students:dtos": "./src/modules/students/@types/dtos",
          "@students:entities": "./src/modules/students/infra/typeorm/entities",
          "@students:errors": "./src/modules/students/errors",
          "@students:mapper": "./src/modules/students/mapper",
          "@students:models": "./src/modules/students/@types/models",
          "@students:repos": "./src/modules/students/infra/typeorm/repositories",
          "@students:irepos": "./src/modules/students/repositories",
          "@students:routes": "./src/modules/students/infra/http/routes",
          "@students:types": "./src/modules/students/@types",
          "@students:use-cases": "./src/modules/students/use-cases",

          "@content:containers": "./src/modules/content/containers",
          "@content:dtos": "./src/modules/content/@types/dtos",
          "@content:entities": "./src/modules/content/infra/typeorm/entities",
          "@content:errors": "./src/modules/content/errors",
          "@content:mapper": "./src/modules/content/mapper",
          "@content:models": "./src/modules/content/@types/models",
          "@content:repos": "./src/modules/content/infra/typeorm/repositories",
          "@content:irepos": "./src/modules/content/repositories",
          "@content:routes": "./src/modules/content/infra/http/routes",
          "@content:types": "./src/modules/content/@types",
          "@content:use-cases": "./src/modules/content/use-cases",

          "@education:containers": "./src/modules/education/containers",
          "@education:dtos": "./src/modules/education/@types/dtos",
          "@education:entities": "./src/modules/education/infra/typeorm/entities",
          "@education:errors": "./src/modules/education/errors",
          "@education:mapper": "./src/modules/education/mapper",
          "@education:models": "./src/modules/education/@types/models",
          "@education:repos": "./src/modules/education/infra/typeorm/repositories",
          "@education:irepos": "./src/modules/education/repositories",
          "@education:routes": "./src/modules/education/infra/http/routes",
          "@education:types": "./src/modules/education/@types",
          "@education:use-cases": "./src/modules/education/use-cases"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true}],
    ["@babel/plugin-proposal-class-properties", { loose: true}],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ]
}
