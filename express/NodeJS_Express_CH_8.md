# Formation NodeJS

## Chapitre - 08 - Express suite

### Les middlewares

Un **middleware** par rapport à notre application, se définirai ainsi.

1. Lorsqu'un utilisateur navigue sur notre application, _une requête est envoyé au server_ selon l'url ou il se trouve.
2. Cette requête est **intercepté** et **analysé**.
3. La requête si elle correspond à une route qu'on a définit, va pouvoir exécuter une action.
4. Puis selon le verbe utilisé on retournera la réponse au client.

> On est déjà habitué aux **req** et **res**, avec un middleware, on rajoutera **next**.

-   **Next**, si elle n'est pas appelé, fera planté la navigation.

sur notre application, nous allons utiliser la méthode **use()**.

Exemple d'un code **explicatif directement commenté** : (5 points sont vu ici)

-   I - Middleware par défaut
-   II - Deux middleware en même temps
-   III - Définitions de quelques constantes
-   IV - L'importance de bien respecter l'ordre
-   V - Utilisation de next('route')

```js
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

/**
 * I - Middleware par défaut
 * ------------------------------------------------
 * Sans URL, le middelware sera accessible partout
 * Sachant, que de base l'URL sera par défaut "/"
 * ------------------------------------------------
 * Ce middleware s'affichera partout même sur une
 * page qui n'existe pas
 **/
app.use((req, res, next) => {
	console.log('Middleware accessible de partout');
	next(); // Permet de passer au second middleware
});

/**
 * II - Deux middleware en même temps
 * ------------------------------------------------
 * Il est tout à fait possible d'avoir plusieurs
 * middelware sur la même page.
 *
 * Il seront exécuter les uns à la suite des autres
 * selon leur contenu.
 * ------------------------------------------------
 * L'URL n'affichera rien à l'écran
 * mais dans le terminal oui
 **/
app.use('/1', (req, res, next) => {
	console.log('1er middleware.');
	next();
});

app.use('/1', (req, res, next) => {
	const middleware2 = '2ème middleware.';
	console.log(middleware2);
	next();
});

/**
 * III - Définitions de quelques constantes
 * ------------------------------------------------
 * Nous pouvons définir des constantes qui seront
 * utilisé directement.
 *
 * L'ordre est très important.
 * ------------------------------------------------
 * L'URL n'affichera rien à l'écran
 * mais dans le terminal oui
 **/

// Définition de 2 constantes pour nos middlewares
const middleware3 = (req, res, next) => {
	console.log('3ème middleware.');
	next();
};
const middleware4 = (req, res, next) => {
	console.log('4ème middleware.');
	next();
};

app.use('/2', middleware3, middleware4);

/**
 * IV - L'importance de bien respecter l'ordre
 * -------------------------------------------------
 * L'ordre est extrêmement important
 *
 * Imaginons ceci :
 * 		- un middleware pour la connexion,
 * 		- un autre pour le traitement
 * 		- et un autre pour afficher t'es connecté
 *
 * Que ce passerait-il si on inversait l'ordre ?
 * Allons voir ça avec l'exemple ci-dessous
 *
 * ps : On en profite pour voir qu'on peut avoir
 * 			des tableaux ;)
 * -------------------------------------------------
 **/
const middleware5 = (req, res, next) => {
	console.log('5ème middleware. Connecté vous');
	next();
};
const middleware6 = (req, res, next) => {
	console.log('6ème middleware. Traitement de la connexion');
	next();
};
const middleware7 = (req, res, next) => {
	console.log('7ème middleware. Vous êtes bien connecté');
	next();
};

// On a un probèle, remarquez l'ordre affiché dans
// le terminal.
app.use('/3', [middleware5, middleware7], middleware6);

// Pas besoin d'expliquer ce que l'on fait.
app.get('/', (req, res) => {
	res.render('index');
});

/**
 * V - Utilisation de next('route')
 * ------------------------------------------------
 * Dans l'exemple ci-dessous ":id" représente
 * n'importe qu'elle chaîne de caractère.
 *
 * Si on définit ici "DYMA" ou "Dyma" ou bien
 * encore "dyma" alors on passera directement à la
 * route suivante.
 *
 * (Celle qui affichera "J'adore apprendre là-bas")
 *
 * Sinon, quelque soit la chaîne saisit
 * (autre que "DYMA"), nous afficherons
 * "Que vaut réellement ta plateforme X ?"
 * ------------------------------------------------
 **/

app.get(
	'/info/:id',
	(req, res, next) => {
		if (
			req.params.id === 'DYMA' ||
			req.params.id === 'Dyma' ||
			req.params.id === 'dyma'
		) {
			// Si ça correspond, on change de route
			next('route');
		} else {
			next();
		}
	},
	(req, res, next) => {
		// Sinon si la correspondance ne va pas,
		// on vient directement ici
		res.send(`Que vaut réellement ta plateforme ${req.params.id} ?`);
	}
);

app.get('/info/:id', (req, res, next) => {
	// Là si la route précédente match,
	// alors on exécute cette ligne
	res.send("J'adore apprendre là-bas");
});

app.listen(5001, '0.0.0.0');
```

## Découverte du middleware static

> Si nous utilisons une image quelconque, celle-ci ne sera pas affiché.
> Ou du moins si nous utilisons la méthode : **sendFile()**... Mais comme il est dit dans la vidéo : _Ce n'est pas sérieux !!_.

Le middleware static d'express est très pratique pour **définir un dossier contenant toutes nos ressources** (images, css, javascript) etc

Donc, Express nous met directement une méthode **static** ou automatiquement il regardera dans le répertoire qu'on aura spécifier en paramètre.

Exemple :

```js
app.use(express.static(path.join(__dirname, 'Public')));
```

> Des options peuvent-être passé en second paramètres. Pour celà, voir le chapitre 8 leçon 4 de la formation Node.JS

Pour tester son fonctionnement, je rajoute à la racine de mon application cette architecture :

```sh
public
	|--	images/
		    |--	test.jpg
	|--	css/
			  |-- style.css
	|--	js/
			  |-- test.js
```

Dans mon fichier index.pug je lui ajoute :

```pug
div
  figure
		img(src="images/test.jpg")
		figcaption Je suis une image de test
```

Reste plus qu'à voir le résultat dans la page web.

## Découverte de Restlet

Une extension bien pratique pour simuler des requêtes envoyer en **POST GET PUT DELETE etc...**

Elle se nomme : Restlet
Disponible pour **Chrome** et **firefox**

## Découverte du middleware json

Avec express, nous pouvons utiliser le parser json() qui nous permet de parser du json venant de body-parser

Le header content-type a pour valeur application/json

```diff
- A REVOIR - Chapitre 8 - Leçon 5
```

## Découverte du middleware urlencoded

Avec express, nous pouvons aussi utiliser le parser urlencoded() qui nous permet d'utiliser urlencoded venant de body-parser

Ce parser est utilisé avec le format x-www-form-urlencoded

```js
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', (req, res) => {
	console.log(req.body);
	console.log(typeof req.body);
	res.render('index');
});

app.listen(5001);
```

## - Le middleware morgan

Morgan est un middleware maintenu par la team Express, il permet d'afficher dans le terminal des logs assez utile pour un développeur.

Pour l'utiliser il va falloir l'installer.

```sh
npm i -D morgan
```

Puis on va l'importer.

```js
const morgan = require('morgan');
app.use(morgan('combined'));
```

Choix possible :

| combined                          |
| --------------------------------- |
| :remote-addr                      |
| :remote-user                      |
| [:date[clf]]                      |
| ":method :url HTTP/:http-version" |
| :status                           |
| :res[content-length]              |
| ":referrer"                       |
| ":user-agent"                     |

| dev                  |
| -------------------- |
| :method              |
| :url                 |
| :status              |
| :response-time ms    |
| :res[content-length] |

```js
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/');

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', (req, res) => {
	console.log(req.body);
	res.render('index');
});

app.listen(5001);
```
