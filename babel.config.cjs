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
          "@shared:injection": "./src/shared/injection",
          "@shared:middlewares": "./src/shared/infra/http/middlewares",
          "@shared:providers": "./src/shared/providers",
          "@shared:utils": "./src/shared/utils",

          "@management:containers": "./src/modules/management/containers",
          "@management:injection": "./src/modules/management/injection",
          "@management:dto": "./src/modules/management/@types/dto",
          "@management:database": "./src/modules/management/infra/database",
          "@management:database-types": "./src/modules/management/@types/database",
          "@management:errors": "./src/modules/management/errors",
          "@management:infra": "./src/modules/management/infra",
          "@management:injection": "./src/modules/management/injection",
          "@management:mapper": "./src/modules/management/mapper",
          "@management:models": "./src/modules/management/@types/models",
          "@management:providers": "./src/modules/management/providers",
          "@management:provider-types": "./src/modules/management/@types/providers",
          "@management:repositories": "./src/modules/management/@types/repositories",
          "@management:requests": "./src/modules/management/@types/http",
          "@management:routes": "./src/modules/management/infra/http/routes",
          "@management:use-cases": "./src/modules/management/use-cases",

          "@students:containers": "./src/modules/students/containers",
          "@students:database": "./src/modules/students/infra/database",
          "@students:database-types": "./src/modules/students/@types/database",
          "@students:dto": "./src/modules/students/@types/dto",
          "@students:errors": "./src/modules/students/errors",
          "@students:mapper": "./src/modules/students/mapper",
          "@students:models": "./src/modules/students/@types/models",
          "@students:infra": "./src/modules/students/infra",
          "@students:injection": "./src/modules/students/injection",
          "@students:providers": "./src/modules/students/providers",
          "@students:provider-types": "./src/modules/students/@types/providers",
          "@students:repositories": "./src/modules/students/@types/repositories",
          "@students:requests": "./src/modules/students/@types/http",
          "@students:routes": "./src/modules/students/infra/http/routes",
          "@students:use-cases": "./src/modules/students/use-cases",

          "@content:containers": "./src/modules/content/containers",
          "@content:database": "./src/modules/content/infra/database",
          "@content:database-types": "./src/modules/content/@types/database",
          "@content:dto": "./src/modules/content/@types/dto",
          "@content:errors": "./src/modules/content/errors",
          "@content:mapper": "./src/modules/content/mapper",
          "@content:models": "./src/modules/content/@types/models",
          "@content:infra": "./src/modules/content/infra",
          "@content:injection": "./src/modules/content/injection",
          "@content:providers": "./src/modules/content/providers",
          "@content:provider-types": "./src/modules/content/@types/providers",
          "@content:repositories": "./src/modules/content/@types/repositories",
          "@content:requests": "./src/modules/content/@types/http",
          "@content:routes": "./src/modules/content/infra/http/routes",
          "@content:use-cases": "./src/modules/content/use-cases",

          "@education:containers": "./src/modules/education/containers",
          "@education:database": "./src/modules/education/infra/database",
          "@education:database-types": "./src/modules/education/@types/database",
          "@education:dto": "./src/modules/education/@types/dto",
          "@education:errors": "./src/modules/education/errors",
          "@education:mapper": "./src/modules/education/mapper",
          "@education:models": "./src/modules/education/@types/models",
          "@education:infra": "./src/modules/education/infra",
          "@education:injection": "./src/modules/education/injection",
          "@education:providers": "./src/modules/education/providers",
          "@education:provider-types": "./src/modules/education/@types/providers",
          "@education:repositories": "./src/modules/education/@types/repositories",
          "@education:requests": "./src/modules/education/@types/http",
          "@education:routes": "./src/modules/education/infra/http/routes",
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
