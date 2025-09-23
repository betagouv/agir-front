## Introduction

Accompagner les citoyens dans leur transition écologique, en leur proposant des informations, solutions adaptées à leur
situation personnelle et leurs intérêts, et en rendant accessibles l’ensemble des aides à leur disposition

## Pile Technique

- VueJS 3
- Vitest
- Playwright
- [DSFR](https://www.systeme-de-design.gouv.fr/)

## Démarrage

```bash
$ yarn install
```

```bash
$ yarn dev
```

## Commandes utiles

- `$ yarn test` : lance les tests unitaires
- `$ yarn test:e2e` : lance les tests end to end avec playwright

## Architecture

L'architecture logicielle de ce projet repose sur une architecture Ports/Adapters.
Le principe est d'isoler la valeur métier du front, et de pouvoir s'abstraire de tous frameworks et technologies.
![schéma d'architecture](./schema_archi.png)

## Mise à jour des dépendances

La CI se charge elle même de mettre à jour les dépendances via Dependabot.
En général, les MR sont créees automatiquement dans la nuit du lundi au mardi.

## Déploiement

Le déploiement est automatisé via la CI/CD sur la plateforme d'hébergement [Scalingo](https://dashboard.scalingo.com/).
A chaque push sur la branche main, un nouveau déploiement est déclenché sur l'environnement de dev.
Pour la production, c'est le job release-please qui se charge de faire le déploiement.
Mode opératoire :

- Merge la MR de type `chore(main): release x.y.z` (générée par release-please)
- Lancer le job `mise-en-production` dans la CI/CD en choisissant le tag correspondant à la MR mergeée
- Le job se charge de faire le déploiement en production

Attention : les Github Actions nécissitent un token
Scalingo ([API Token](https://dashboard.scalingo.com/account/tokens)) qu'il faut mettre dans
les [secrets du dépôt](https://github.com/betagouv/agir-front/settings/secrets/actions).

## Tracking et Analytics

Le projet utilise Matomo pour le tracking et l'analytics.
Le projet utilise Sentry pour le suivi des erreurs en production et développement.