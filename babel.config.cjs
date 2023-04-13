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
          "@management:dto": "./src/modules/management/@types/dto",
          "@management:database-types": "./src/modules/management/@types/database",
          "@management:errors": "./src/modules/management/errors",
          "@management:infra": "./src/modules/management/infra",
          "@management:mapper": "./src/modules/management/mapper",
          "@management:models": "./src/modules/management/@types/models",
          "@management:repositories": "./src/modules/management/@types/repositories",
          "@management:routes": "./src/modules/management/infra/http/routes",
          "@management:use-cases": "./src/modules/management/use-cases",

          "@students:containers": "./src/modules/students/containers",
          "@students:dto": "./src/modules/students/@types/dto",
          "@students:errors": "./src/modules/students/errors",
          "@students:mapper": "./src/modules/students/mapper",
          "@students:models": "./src/modules/students/@types/models",
          "@students:infra": "./src/modules/students/infra",
          "@students:repositories": "./src/modules/students/@types/repositories",
          "@students:routes": "./src/modules/students/infra/http/routes",
          "@students:use-cases": "./src/modules/students/use-cases",

          "@content:containers": "./src/modules/content/containers",
          "@content:dto": "./src/modules/content/@types/dto",
          "@content:errors": "./src/modules/content/errors",
          "@content:mapper": "./src/modules/content/mapper",
          "@content:models": "./src/modules/content/@types/models",
          "@content:infra": "./src/modules/content/infra",
          "@content:repositories": "./src/modules/content/@types/repositories",
          "@content:routes": "./src/modules/content/infra/http/routes",
          "@content:use-cases": "./src/modules/content/use-cases",

          "@education:containers": "./src/modules/education/containers",
          "@education:dto": "./src/modules/education/@types/dto",
          "@education:errors": "./src/modules/education/errors",
          "@education:mapper": "./src/modules/education/mapper",
          "@education:models": "./src/modules/education/@types/models",
          "@education:infra": "./src/modules/education/infra",
          "@education:repositories": "./src/modules/education/@types/repositories",
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
