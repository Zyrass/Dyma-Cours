# Formation NodeJS

## Chapitre 2

### Les commandes lié à Node

```sh
# Connaitre le numéro de la version de node installé sur la machine
node -v

# La même chose en version longue
node --version
```

```sh
# Exécuter un fichier - Par convention on utilise app.js
node app.js
```

```sh
# Lancer le terminal de node
node

# Quitter le terminal de node
.exit

# Obtenir de l'aide
.help
```

### Entry point (Point d'entrée)

> Ce terme très répandu est utilisé pour définir **le point d'entrée de notre application**.
> On va bientôt en reparler ;).
> En attendant il faut savoir que beaucoup de développeur donne comme point d'entrée : **app.js**

Soit par exemple :

1. On créer un fichier appelé **app.js** manuellement ou bien via la ligne de commande suivante :

```sh
# Dans un terminal, création d'un fichier app.js
touch app.js
```

2. On ouvre le fichier et on lui assigne une instruction :

```js
// Dans le fichier app.js
const information = 'Je suis accros à cette plateforme : Dyma.fr';
console.log(information);
```

3. On exécute ce fichier avec node soit :

```sh
# Dans le terminal
node app.js

# On obtient dans le terminal
Je suis accros à cette plateforme : Dyma.fr
```

### Les modules, l'export et le require

-   Dans Node, **chaque fichier est traité comme étant un module séparé**.
-   **Chaque module** (fichier) peut-être **importé** dans un autre fichier

#### Importer un module

Pour importer un module, il faut utiliser le mot clé `require()`

```js
// Exemple d'un module qui sera utilisé dans les prochains chapitre.
const fs = require('fs'); // fs pour file system
```

> Dans le require il est possible d'omettre l'extenssion .js ou .json
> Les fichiers JS seront lu comme étant un fichier JS et les JSON seront eux parsé en JSON

#### Définir un export

Pour exporter un module, on utilisera `module.exports.une_constante`

```js
// Exemple d'exportation d'une constante :
const dyma = 'https://dyma.fr';
module.exports.dyma = dyma;

// Ceci fonctionne aussi
module.exports = dyma;

// Mais on peut également exporter comme ceci :
module.exports.udemy = 'https://udemy.com';
```

#### Exemple d'un module exporté et importé dans un autre fichier

```js
// Module exporté : Fichier module1.js
const myModule = () => {
	console.log('Je suis le module 1 du fichier module1.js');
};
module.export = myModule;
```

```js
// Dans le fichier app.js, on importe le module1.js et on l'initialise
const myModule = require('./module1.js');
myModule();
```

#### Comprendre les dessous du require

> **Node mets en cache** ce qui est importé avec le mot clé **require**.
> **NODE ne recharge pas** à nouveau le **path d'un autre require** si celui-ci est déjà dans le cache.
> Ainsi donc, tout les modules portant le même nom ne se seront en aucun cas chargé, vu qu'il l'est déjà.

Exemple par la pratique :

```js
// 1 - Code du fichier module1.js - (On export ici un objet)
module.exports = {
	club: 'Olympique de Marseille',
};
```

```js
// 2 - Code du fichier app.js
const myModule = require('./module1');
console.log(myModule.name); // Affichera : Olympique de Marseille

myModule.name = 'Olympique Lyonnais';

console.log(myModule.name); // Affichera : Olympique Lyonnais

const myModule2 = require('./module1');
console.log(myModule2.name); // Affichera : Olympique Lyonnais
```

> Ce qu'on constate ici c'est qu'en gros, **Node copie par référence**. Ce qui veut dire que **myModule2** à été modifié précédemment **via myModule** et vu que Node ne recharge pas une référence si celle-ci existe, toutes les autres réutilisation seront impacté.

#### Importé un module unique

```js
// Code du fichier module1.js;
module.exports = {
	om: {
		name: 'Olympique de Marseille',
	},
	ol: {
		name: 'Olympique Lyonnais',
	},
};
```

```js
// Code du fichier app.js
const om = require('./module1').om;
const ol = require('./module1').ol;

console.log(om); // Affichera : Olympique de Marseille
console.log(ol); // Affichera : Olympique Lyonnais
```

#### Importé un module natif

> Importer des modules globaux (natif à nodeJS) - Voir : [https://nodejs.org/api/](https://nodejs.org/api/)

### Découverte d'NPM (Node package manager)

#### EXPLICATION du VERSIONNING : 21.45.9

| N°          | Nom officiel      | description                                                                                                                                                 |
| ----------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 21.45.**9** | **PATCH** release | Dans un déploiement on peut oublier des erreurs mineur qui serait en développement. Ainsi on patch rapidement l'application en changeant le dernier numéro. |
| 21.**45**.9 | **MINOR** release | On a ici, une modification mineur. (Ajout d'une fonctionnalitée par exemple.)                                                                               |
| **21**.45.9 | **MAJOR** release | Modification majeur de l'application, (Ex: une refonte complète de l'app. )                                                                                 |

> Une toute première version officiel déclaré sur la plateforme d'NPM doit être au minimum inscrit comme telle : **1.0.0**

#### Mettre à jour NPM

Pour mettre à jour NPM, il faudra saisir une commande dans le terminal :

```sh
# Mettre à jour NPM
npm update

# Mettre à jour des dépendances globales (On y revient sous peu pour expliquer)
npm -g update
```

```diff
- Oui oui, mettre à jour sans savoir comment on install un paquet n'a pas de sens, mais on y vient ;)
```

> Il faut savoir que NPM est lié au fichier package.json qu'on a à la racine de notre application.
> C'est là où l'on stock toutes les dépendances nécessaires au bon fonctionnement de l'application.

-   Voici Un lien qui traite sur la création d'un fichier package.json : [https://docs.npmjs.com/creating-a-package-json-file](https://docs.npmjs.com/creating-a-package-json-file)

#### Le numéro de version est inscrit bizarement

| Version des dépendances                   | Description                                                                                                                                                                                                                                   |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.0** ou **1.0.x** ou encore **~1.0.1** | Jamais une mise à jour ne pourra passer à la version 1.1 ou plus. Pour celà je serais dans l'obligation de modifier le package.json. **Si le projet est en production, il faudra mettre toutes les dépendances en patch realease UNIQUEMENT** |
| **1** ou **1.x** ou **^1.0.1**            | Ici, on autorisera que les versions mineurs. Jamais la maj ne pourra passer à la version 2 ou plus sans modification du package.json                                                                                                          |
| **x** ou **\***                           | On autorisera toutes les mises à jour.                                                                                                                                                                                                        |

### Utilisation de npm

-   Création d'un fichier **package.json** qui sera placé à la racine de notre application.

```sh
# Création du fichier package.json (manuellement)
# Il faudra avec cette commande répondre à quelques questions avant de l'obtenir.
npm init

# Création d'un fichier package.json (automatiquement)
# Le point d'entrée sera lui spécifié automatiquement et il faudra parfois le changer.
npm init -y
```

-   Installation d'un package.
    -- On peut trouver la liste des packages à cette adresse : [https://www.npmjs.com/](https://www.npmjs.com/)

```sh
# Syntaxe (longue) pour installer un paquet
npm install nom_du_paquet

# Syntaxe (courte) pour installer un paquet
npm i nom_du_paquet

# Installer un paquet de manière globale
# (Généralement des CLI pour générer des projets )
npm i -g nom_du_cli

# Installer une dépendance uniquement en développement.
npm i nom_du_paquet --save-dev
```

-   Installer un paquet c'est bien, mais le désinstaller c'est aussi simple.

```sh
# Syntaxe pour désinstaller un paquet
npm uninstall nom_du_paquet

# Désinstaller un paquet de manière globale
npm uninstall -g nom_du_cli
```

> Si l'on se souvient bien, pour lancer notre fichier **app.js**,
> nous avons obligatoirement du saisir comme commande `node app.js`.
> Il est temps de revoir ça différemment.

-   Installation d'un script pour charger notre fichier plus simplement.

Exemple d'un fichier **package.json** au début

```json
{
	"name": "demo",
	"version": "1.0.0",
	"description": "Exemple d'une description",
	"main": "app.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC"
}
```

On ajoute dans la partie **scripts** : `"start": "node app.js"`
-- Sans oublié la **, (virgule)** à la fin de la 1ère ligne.

```json
{
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start": "node app.js"
	}
}
```

Ainsi, une fois la modification faite, la commande à exécuter était/sera :

```sh
# Avant :
node app.js

# Maintenant :
npm start
```

> **Note importante** : On a indiqué **"start"**.
> Mais on aurait bien pu indiquer autre chose à la différence que la commande sera elle différente.

Pour l'exemple :

| Avec **"start": "node app.js"** | Avec **"dev": "node app.js"** |
| ------------------------------- | ----------------------------- |
| On saisira : `npm start`        | On saisira : `npm run dev`    |
