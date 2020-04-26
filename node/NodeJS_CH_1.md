# Formation NodeJS

## Chapitre - 01

### Installer NODE.JS

1. Allez sur le site officiel de [Node.JS](https://nodejs.org/en/). Selon le système d'exploitation utilisé, il faut télécharger l'une des versions qui nous sont proposés. **De préférence la LTS (Longue time support)**
2. Selon Le système d'exploitation, il faut suivre les étapes d'installation. _C'est relativement simple_

> Pour ma part je suis sur Linux Ubuntu et donc je dois taper une commande que l'on peut retrouver à cette adresse :
> [https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions) **Attention de bien prendre l'avant dernière pour bénéficier de la version LTS**

```sh
# 1ère commande à saisir
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

# 2ème commande à saisir
sudo apt-get install -y nodejs
```

### Installer un IDE

1. Un IDE va vous permettre de saisir du code avec une coloration syntaxique qui va très franchement grandement nous aider.

> J'utilise **Visual Studio Code** très réputé et gratuit. Pour une fois que Microsoft nous propose quelques chose de gratuit, on ne va pas s'en privée.

[Lien vers la page officiel de Visual Studio Code](https://code.visualstudio.com/)

2. Installer l'éditeur de code.

### Node C'est quoi un Framework ? Un Language de programation ?

-   Node n'est en aucun cas un langage. **Vu qu'il utilise le JavaScript**.
-   Node n'est pas non plus un framework. **Il n'offre pas que des fonctionnalités**
-   Node **est un environnement serveur d'exécution pour le JavaScript**

### Scalable pour un serveur NODE

-   Node dispose d'une architecture asynchrone et **non bloquante**. Donc node est **asynchrone**.
-   Sachant que Node utilise **le moteur V8** de Google chrome, celui-ci est quant à lui **synchrone**

> Ce qui veut dire que l'on peut envoyer un nombre incalculable de requête JavaScript, node les enverras au moteur V8 afin que celui-ci traite ces données les unes à la suite des autres.

> En sommes, imaginons des milliers d'utilisateurs qui se connecte sur un site pour acheter les toutes dernières places disponible pour une finale de ligue des champions...
> Les données émises sont traités les unes à la suite des autres.
> Les utilisateurs selon l'ordre d'arrivé, parfois rencontre un message comme quoi ils doivent patienter.
> Parrallèlement à ça, en tâche de fond, les données ne peuvent-être traiter en même temps et donc elles sont placés dans une file d'attente, d'où le message qui est généré pour faire patienter les utilisateurs...

#### Simulation d'un code bloquant / non bloquant

> Sur la plateforme de Dyma l'exemple pour expliquer en javascript un programme bloquant d'un programme non bloquant, est extrêmement simple à mettre en place.

```js
// Code non bloquant dit "Asynchrone"
// L'ordre sera 1 3 2
alert(1);
setTimeout(() => alert(2), 10);
alert(3);

// Code bloquant dit "Synchrone"
// L'ordre sera 1 2 3
alert(1);
alert(2);
alert(3);
```

### Fonctionnalités nécessaires pour un serveur web

-- Réutilisabilité du code et modularité
-- Intéraction avec des fichiers
-- Intéraction avec des bases de données
-- Possibilité de recevoir des requêtes et d'envoyer des réponses avec les protocoles HTTP et HTTPS
-- Gérer les actions qui utilisent le processeur pour une longue durée
