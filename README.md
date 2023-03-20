<!-- LOGO ------------------------------------------------------------------- -->
<div style="display:flex; align-items:left; padding:0px 0px 20px 0px; ">
  <img src="https://i.imgur.com/Kt64d3S.png" width="100" style="border-radius:50%"/>
</div>

<!-- BADGES ----------------------------------------------------------------- -->

<div>
  <!-- commitzen friendly -->
  <img alt="Commitzen Friendly" src="https://img.shields.io/badge/commitzen-friendly-blue?style=plastic&logo=plastic">
  <!-- releases -->
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/SevenSeas-Tech/demen-backend?style=plastic">
  <!-- Feature last commit -->
  <img alt="GitHub last commit (branch)" onHover="feature last commit" src="https://img.shields.io/github/last-commit/SevenSeas-Tech/demen-backend/feature?label=last%20commit&style=plastic">
  <!-- Contributors -->
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/SevenSeas-Tech/demen-backend?style=plastic">
</div>

<div>
<!-- commit activity -->
  <img alt="GitHub commit activity (feature)" src="https://img.shields.io/github/commit-activity/w/SevenSeas-Tech/demen-backend/feature?style=plastic">
  <!--  -->
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/SevenSeas-Tech/demen-backend?style=plastic">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/SevenSeas-Tech/demen-backend?style=plastic">
  <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/Sevenseas-Tech/demen-backend?style=plastic">
  <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/sevenseas-tech/demen-backend?style=plastic">
  <img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/sevenseas-tech/demen-backend?style=plastic">
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/sevenseas-tech/demen-backend?style=plastic">
</div>

<hr>

<div style="display:flex; padding:15px 0px;justify-content: space-between">
 <img height="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
 <img height="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
 <img height="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />
 <img height="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" />
 <img height="60" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" />
</div>

 <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">

<br><br>

<!-- TÍTULO -------------------------------------------------------------------- -->
# Democratizando o Ensino

<p>
É um projeto pessoal de cunho social. Serve como uma biblioteca de video aulas e materiais de apoio para estudantes do Brasil inteiro.
<P>

O fundamento é de que existe muito conteúdo educacional gratuito na internet, mas extremamente descentralizado. Além disso, as vezes conteúdos bons não são privilegiados por algoritmos de busca como o do youtube.

Um canal de Youtube pode ter uma aula de qualidade, mas ter o conteúdo muito nichado. Ou as thumbnails não são muito chamativas. Assim o Youtube não indicaria esse canal para o público.

Um professor mesmo sendo muito bom, pode não entender de marketing digital o suficiente para que o vídeo ganhe repercussão.

Então o democratizando o ensino vai ser um centralizador de conteúdo, com um banco de dados próprio que é alimentado por humanos, e só busca os vídeos na api do youtube na hora de reproduzir.

Como os vídeos ainda são hospedados no Youtube, a monetização vai para o criador original. O "Demen" não lucra com o contéudo dos outros. Além disso as aulas serão sempre creditadas corretamente.

É um projeto ambicioso e eu construo ele sozinho e aos poucos. E mesmo que ele fracasse, serve para eu por em prática as minhas habilidades para criar projetos, modelar bancos de dados, e programar para multiplataformas.

<br>

<a id="ancora6"></a>

# Menu

* [Rodando a aplicação](#ancora1).
* [API](#ancora2).
  * [Projeto das Rotas](https://hbenvenutti.notion.site/Rotas-API-6382e85ba2b744b7ac597c0dac32e5ee)
* [Banco de Dados](#ancora3).
  * [Dicionário de dados](https://github.com/SevenSeas-Tech/demen-backend/blob/main/DATABASE.MD).
* [Tecnologias](#ancora4).
* [Colaboradores](#ancora5).

<br><br>

<!-- DOCUMENTAÇÃO ----------------------------------------------------------- -->

<a id="ancora1"></a>

# Rodando a  aplicação
## Gerando os containers

```shell
docker-compose up -d
```

## Ambiente
```shell
cp .env.dev .env
```

## Prisma | Banco de dados
```
yarn prisma generate

yarn prisma migrate reset
```

## Rodando os Testes
```shell
yarn test
```
## Iniciando o servidor
### Dev
```shell
yarn dev:server
```

### Prod
```shell
yarn build

yarn prod:server
```

## Debug
```shell
yarn debug
```

<br>

<a id="ancora2"></a>

# API

<div align="center" style="padding:50px 0 50px 0;">

  <!-- Imagem dos testes -->
  <img height="170px" src="https://i.imgur.com/4gu5wWs.png" title="source: imgur.com" />

  <!-- Imagem das rotas -->
  <img height="170px" src="https://i.imgur.com/T3yxThU.png" title="source: imgur.com" />

</div>


<a id="ancora3"></a>

# Banco de Dados
> [Dicionário de dados](https://github.com/SevenSeas-Tech/demen-backend/blob/main/DATABASE.MD)

<div align="center" style="padding: 0px 0px 50px 0;">

  <!-- Imagem conceitual -->

  <img height="200px" src="https://i.imgur.com/qtju2AS.png" title="source: imgur.com" />


  <!-- Imagem lógico -->
  <img width="250" src="https://i.imgur.com/JKZZyXH.png" title="source: imgur.com" />

</div>

<a id="ancora4"></a>

# Tecnologias
<div align="center">
  <table>
    <thead>
      <tr>
        <th>Database</th>
        <th>Testes</th>
        <th>Documentação</th>
        <th>Padronização</th>
        <th>Build</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Postgres</td>
        <td>Jest</td>
        <td>Swagger</td>
        <td>Husky</td>
        <td>Babel</td>
      </tr>
      <tr>
        <td>Prisma</td>
        <td>Supertest</td>
        <td></td>
        <td>Commitlint</td>
        <td></td>
      </tr>
      <tr>
        <td>Redis* (Cache)</td>
        <td></td>
        <td></td>
        <td>Eslint</td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Prettier</td>
        <td></td>
      </tr>
    </tbody>
    <tfoot>
    </tfoot>
  </table>
      * Ainda não implementado
</div>

<a id="ancora5"></a>

# Colaboradores
![GitHub Contributors Image](https://contrib.rocks/image?repo=SevenSeas-Tech/demen-backend)

<br><br>
<hr>

>[Voltar ao menu](#ancora6)
