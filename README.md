<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Solution proposée pour le test technique demandé pour la start-up `Monkey Factory`.
Réalisée avec le framework NestJS, le but était de produire une route d’API REST. Cette route d’API consiste à prendre en entrée une date en chiffres arabes, pour la transformer automatiquement en une date avec chiffres romains.


## Installation

```bash
$ npm install
```

## Running the app (port: 3000)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Utilisation

Se rendre sur : `localhost:3000/arabic-to-roman`
<br/>Envoyer une requête HTTP contenant une date en chiffres arabes de la forme :
<br/>**//!\\ La date doit toujours être de la forme: "jj-mm-aaaa"**
```
Header__: Content-type => application/JSON
Body:
{
  "date": "13-04-1998"
}
```
ou
```
Header__: Content-type => application/JSON
Body:
{
  "date": "13/04/-1998"
}
```
L'API retournera une réponse de la forme - uniquement si la date en entrée est valide/existe -:
```
Status: 201
Body:
{
    "date": "13-04-1998",
    "dateRomanized": "XIII-IV-MCMXCVIII"
}
```
ou
```
Status: 201
Body:
{
    "date": "13-04--1998",
    "dateRomanized": "XIII-IV--MCMXCVIII"
}
```
**Les deux dates limites sont le 01/01/-4999 et le 31/12/4999 car au delà de 4999, la représentation en chiffres romains implique de nouveaux symboles qu'il est difficile de représenter. On notera également qu'il n'y a pas de représentation pour l'année 0.**


## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# test e2e
$ npm run test:e2e
```


## License

  Nest is [MIT licensed](LICENSE).
