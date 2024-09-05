## Introduction
Accompagner les citoyens dans leur transition écologique, en leur proposant des informations, solutions adaptées à leur situation personnelle et leurs intérêts, et en rendant accessibles l’ensemble des aides à leur disposition

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

- ```$ yarn test``` : lance les tests unitaires
- ```$ yarn test:e2e``` : lance les tests end to end avec playwright


## Architecture
L'architecture logicielle de ce projet repose sur une architecture Ports/Adapters.
Le principe est d'isoler la valeur métier du front, et de pouvoir s'abstraire de tous frameworks et technologies.
![schéma d'architecture](./schema_archi.png)
