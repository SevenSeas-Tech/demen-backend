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
          "@config": ["./src/config"],
          "@shared": ["./src/shared"],
          "@shared:containers": ["./src/shared/containers"],
          "@shared:errors": ["./src/shared/errors"],
          "@shared:typeorm": ["./src/shared/infra/typeorm"],
          "@accounts:containers": ["./src/modules/accounts/containers"],
          "@accounts:dtos": ["./src/modules/accounts/dtos"],
          "@accounts:entities": ["./src/modules/accounts/infra/typeorm/entities"],
          "@accounts:errors": ["./src/modules/accounts/errors"],
          "@accounts:mapper": ["./src/modules/accounts/mapper"],
          "@accounts:repos": ["./src/modules/accounts/infra/typeorm/repositories"],
          "@accounts:irepos": ["./src/modules/accounts/repositories"],
          "@accounts:routes": ["./src/modules/accounts/infra/http/routes"],
          "@accounts:types": ["./src/modules/accounts/@types"],
          "@accounts:use-cases": ["./src/modules/accounts/use-cases"]
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true}]
    ["@babel/plugin-proposal-class-properties", { loose: true}]
  ]
}
