# Changelog

## [1.2.0](https://github.com/betagouv/agir-front/compare/v1.1.1...v1.2.0) (2023-12-22)


### ✨ Nouvelles fonctionnalités

* ajout du favicon ([#227](https://github.com/betagouv/agir-front/issues/227)) ([5819592](https://github.com/betagouv/agir-front/commit/58195923fd9aa47093e4c452b832d0d861af856c))


### 🐛 Corrections de bogues

* correction des cas où le score ne se mettait pas toujours à jour ([#232](https://github.com/betagouv/agir-front/issues/232)) ([d5dd87b](https://github.com/betagouv/agir-front/commit/d5dd87bf51d4e0ed5541a22c284577f239a03927))
* nombre d'apel à la route /todo ([#224](https://github.com/betagouv/agir-front/issues/224)) ([6b5afe5](https://github.com/betagouv/agir-front/commit/6b5afe5e369f87fa64719d6379e4a4bcd1afcf79))
* retours UI du quiz ([#225](https://github.com/betagouv/agir-front/issues/225)) ([730ff5a](https://github.com/betagouv/agir-front/commit/730ff5ab6568bf94f98da64c31cf1b0a11b24903))
* retours UI modale passage niveau ([#230](https://github.com/betagouv/agir-front/issues/230)) ([8a16d1f](https://github.com/betagouv/agir-front/commit/8a16d1f1c40078bb4ddde7c1f990edcc43d5f083))


### 👷 Autres changements

* activation de hotjar seulement en production ([#226](https://github.com/betagouv/agir-front/issues/226)) ([b9d9ba3](https://github.com/betagouv/agir-front/commit/b9d9ba32fed37c33c202cac7d09055214c136bd9))

## [1.1.1](https://github.com/betagouv/agir-front/compare/v1.1.0...v1.1.1) (2023-12-19)


### 🐛 Corrections de bogues

* le nombre de points à gagner doit venir du quiz et non pas de l'objectif de la mission ([#221](https://github.com/betagouv/agir-front/issues/221)) ([f785125](https://github.com/betagouv/agir-front/commit/f785125c8615e8e71ec36d974b3ab6d134d13572))
* transforme le rfr en number avant de l'envoyer au back ([#222](https://github.com/betagouv/agir-front/issues/222)) ([91d07f7](https://github.com/betagouv/agir-front/commit/91d07f7f99b0da065ff03208a5201c87f6ceae85))

## [1.1.0](https://github.com/betagouv/agir-front/compare/v1.0.2...v1.1.0) (2023-12-19)


### ✨ Nouvelles fonctionnalités

* affiche une enquête à la fin des missions ([#207](https://github.com/betagouv/agir-front/issues/207)) ([eeb0d92](https://github.com/betagouv/agir-front/commit/eeb0d92fd3c78feb9ebced2c9df023abeda19572))
* ajout de la mention 'service bientôt disponible' sur les services en cours de construction ([#202](https://github.com/betagouv/agir-front/issues/202)) ([5b90bf5](https://github.com/betagouv/agir-front/commit/5b90bf51dec50f044cbdd3c4141088ef47a7df0e))
* ajout du mécanisme de reveal d'une fonctionnalité ([#193](https://github.com/betagouv/agir-front/issues/193)) ([7bda6c7](https://github.com/betagouv/agir-front/commit/7bda6c72f988375b79425a110dcb7689f136236d))
* ajouter le bilan de l'onboarding à la page coach ([#203](https://github.com/betagouv/agir-front/issues/203)) ([2e51abf](https://github.com/betagouv/agir-front/commit/2e51abf9e2163d7e506f410356307ba6a1a82f85))
* ajouter un écran quand toutes les missions sont terminées ([#216](https://github.com/betagouv/agir-front/issues/216)) ([d2bc36b](https://github.com/betagouv/agir-front/commit/d2bc36b12733593597c7c4916f78d744a612544e))
* installer un service peut maintenant faire parti d'un objectif ([#211](https://github.com/betagouv/agir-front/issues/211)) ([4b0d623](https://github.com/betagouv/agir-front/commit/4b0d623ccb20a0a9aecad2b072273423402daf46))
* la consultation des aides peut être maintenant un objectif de mission ([#204](https://github.com/betagouv/agir-front/issues/204)) ([d184cdb](https://github.com/betagouv/agir-front/commit/d184cdb13b3157c0100149d9ebb96ad474778e94))
* la consultation du profile (compte) peut maintenant être un objectif de todo ([#209](https://github.com/betagouv/agir-front/issues/209)) ([d2ae71e](https://github.com/betagouv/agir-front/commit/d2ae71e292d4d581c58979e62b1a59ee000b234d))
* les services actifs affichent plus de contenu ([#213](https://github.com/betagouv/agir-front/issues/213)) ([900fcc5](https://github.com/betagouv/agir-front/commit/900fcc5f89c76c009c5a13811c69785c7a367146))
* lister les aides en fonction du code postal de l'usagé ([#215](https://github.com/betagouv/agir-front/issues/215)) ([1080203](https://github.com/betagouv/agir-front/commit/1080203ddf9825e4d6dbae8070c15ec7d78963c9))
* modification de la section onboarding stats france ([#220](https://github.com/betagouv/agir-front/issues/220)) ([836a6a2](https://github.com/betagouv/agir-front/commit/836a6a2d3989376f197781b8090a51284e8a8d30))
* modification des écrans de fin quiz ([#214](https://github.com/betagouv/agir-front/issues/214)) ([5d7fad5](https://github.com/betagouv/agir-front/commit/5d7fad59e3e8ddb43c54a91a510f6650b75bf3ac))
* modification du style du bouton de bonus de fin de mission ([#208](https://github.com/betagouv/agir-front/issues/208)) ([c432d05](https://github.com/betagouv/agir-front/commit/c432d059541039aa77206a08768a18ea16a6d407))
* modification ui de l'écran fin de mission ([#212](https://github.com/betagouv/agir-front/issues/212)) ([1568b14](https://github.com/betagouv/agir-front/commit/1568b14108336be14e6ac3d55af63e1f1ad3fbf6))
* page dedie à la beta fermée ([#217](https://github.com/betagouv/agir-front/issues/217)) ([97be9bc](https://github.com/betagouv/agir-front/commit/97be9bc06e6290555e2696041cec4b2f9aa6d66e))
* un titre est maintenant visible pour les todo-list à place de 'Vos Missions' ([#195](https://github.com/betagouv/agir-front/issues/195)) ([e44b630](https://github.com/betagouv/agir-front/commit/e44b630c02a47457c21dee7950f2adb6fa7ba154))


### 🐛 Corrections de bogues

* modification du wording et des images de l'onboarding ([#201](https://github.com/betagouv/agir-front/issues/201)) ([f103f2c](https://github.com/betagouv/agir-front/commit/f103f2c94e2d03535c0baff3bf96e26b52661057))
* prendre en compte le nombre de parts fiscales depuis la route /utilisateurs/id et sauvegarde le resultat en session ([#206](https://github.com/betagouv/agir-front/issues/206)) ([3faa10d](https://github.com/betagouv/agir-front/commit/3faa10dac83aa885a484d9078ec1cdf4945570ec))
* rediriger vers /coach si l'utilisateur se rend sur la page d'acc… ([#210](https://github.com/betagouv/agir-front/issues/210)) ([e8cebfb](https://github.com/betagouv/agir-front/commit/e8cebfbdb10e48b5ce09e5d327bd4317a7241f63))


### 👷 Autres changements

* move hotjar event triggering in finDesMissions compoenent ([#218](https://github.com/betagouv/agir-front/issues/218)) ([d40ae64](https://github.com/betagouv/agir-front/commit/d40ae6440d171fafe782f59928e879a27a214120))
* nettoyage suivi du jour ([#199](https://github.com/betagouv/agir-front/issues/199)) ([5000f81](https://github.com/betagouv/agir-front/commit/5000f817238325bf1cb72812909a5c04ef5f1de4))
* passage de toutes les url mes-aides en vos-aides ([#219](https://github.com/betagouv/agir-front/issues/219)) ([befc110](https://github.com/betagouv/agir-front/commit/befc1109231f1948fc7d1ce03c9bcc25d165741d))

## [1.0.2](https://github.com/betagouv/agir-front/compare/v1.0.1...v1.0.2) (2023-12-12)


### 🐛 Corrections de bogues

* formate les revenus fiscaux de référence ([#196](https://github.com/betagouv/agir-front/issues/196)) ([345cb0e](https://github.com/betagouv/agir-front/commit/345cb0e4c5cee5b2673b817ea3077448233740f6))
* modification des labels onboarding étape consommation ([#197](https://github.com/betagouv/agir-front/issues/197)) ([fe9719c](https://github.com/betagouv/agir-front/commit/fe9719ca7850ad20e900f3b4dd6383389cf3745a))

## [1.0.1](https://github.com/betagouv/agir-front/compare/v1.0.0...v1.0.1) (2023-12-11)


### 🐛 Corrections de bogues

* modification du wording des étapes de l'onboarding ([#192](https://github.com/betagouv/agir-front/issues/192)) ([269f8bb](https://github.com/betagouv/agir-front/commit/269f8bb5ff7bba8ba1565d81838139769ee54b41))

## 1.0.0 (2023-12-11)


### ✨ Nouvelles fonctionnalités

* affichage des données utilisées pour la simulation des aides vélos avec navigation vers la page de formulaire pour mettre à jour les informations ([#186](https://github.com/betagouv/agir-front/issues/186)) ([aa6a690](https://github.com/betagouv/agir-front/commit/aa6a6909c5fb55feed1bbc7ffc605d71d9459f46))
* ajout du code postal et de la commune dans le formulaire des aides vélo ([#188](https://github.com/betagouv/agir-front/issues/188)) ([fafa599](https://github.com/betagouv/agir-front/commit/fafa599e1e3120205d29bb0bb3014685010fa048))
* ajout part et revenu fiscal seuil et abonnement transport aux aides velo ([#177](https://github.com/betagouv/agir-front/issues/177)) ([b22e99b](https://github.com/betagouv/agir-front/commit/b22e99b6fd06785b4e7d3c923d2f34d9749ed049))
* déclencher la célébration au passage de niveau ([#187](https://github.com/betagouv/agir-front/issues/187)) ([29e4b08](https://github.com/betagouv/agir-front/commit/29e4b08dd945d733b58c5338354abf176f17d671))
* formulaire de mise à jour des données pour les aides retrofit ([#190](https://github.com/betagouv/agir-front/issues/190)) ([071909b](https://github.com/betagouv/agir-front/commit/071909b46871e6b081b2d81ecbab80df56a7a7c7))
* modification section landing services ([#162](https://github.com/betagouv/agir-front/issues/162)) ([42320e7](https://github.com/betagouv/agir-front/commit/42320e7024266d2663fbfd48d3955dbac4f0e2d0))
* recolter des points à la fin d'un quiz ([#185](https://github.com/betagouv/agir-front/issues/185)) ([11fcf24](https://github.com/betagouv/agir-front/commit/11fcf246f697ef8100a974a0002e0dc1f0a7d2a9))


### 🐛 Corrections de bogues

* correction du label pour la superficie de 150m2 ([#191](https://github.com/betagouv/agir-front/issues/191)) ([4b558bf](https://github.com/betagouv/agir-front/commit/4b558bf95a45993851a0fcce0e8c8fbddff2a13e))
* release please ([4de8841](https://github.com/betagouv/agir-front/commit/4de8841eacd5377a66d31dedc39090c72c2dc472))
* release please ([#181](https://github.com/betagouv/agir-front/issues/181)) ([5f5061f](https://github.com/betagouv/agir-front/commit/5f5061f7bbf1b69b1999b7e5c83481cd800b0b75))
* vos aides financières devient vos aides ([#183](https://github.com/betagouv/agir-front/issues/183)) ([9c1db85](https://github.com/betagouv/agir-front/commit/9c1db8556cc2e9c984925c0ea5aadcb23c2c360c))


### 👷 Autres changements

* Bump vite from 5.0.2 to 5.0.5 ([#184](https://github.com/betagouv/agir-front/issues/184)) ([9e8c49e](https://github.com/betagouv/agir-front/commit/9e8c49e894c4cbf924ed91217cb12f15b750337a))
* mutualisation du code de l'event bus afin de minimiser le code dupliqué ([#189](https://github.com/betagouv/agir-front/issues/189)) ([552050d](https://github.com/betagouv/agir-front/commit/552050d84582194a52c96f031d2c2aa5490d5570))
* suppression input inutile workflow de m.e.p ([a3f5194](https://github.com/betagouv/agir-front/commit/a3f5194c82ca05f60f6a5e0df42193d05cd48bc0))
