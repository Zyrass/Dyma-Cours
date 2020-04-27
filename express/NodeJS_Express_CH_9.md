# Formation NodeJS

## Chapitre - 09 - Express suite et fin

### Faire matcher une route

> Les **URL** passer des les méthodes **GET**, **POST** etc.. ne sont pas qu'une simple **URL**.
> En effet nous pouvons y passer une **regex**. (_Expression régulière_)

```js
/**
 * -----------------------------------------------------
 * Quelques REGEX
 * -----------------------------------------------------
 **/

// match l'url : /
app.get('/', (req, res) => {
	/* du code */
});

// match l'url : /home
app.get('/home', (req, res) => {
	/* du code */
});

// match l'url : /monfichier.txt
app.get('/monfichier.txt', (req, res) => {
	/* du code */
});

// match les urls : /acd et /abcd
app.get('/ab?cd', (req, res) => {
	/* du code */
});

// match les urls : /abe et /abcde
app.get('/ab(cd)?e', (req, res) => {
	/* du code */
});

// match les urls : /abc ou /abIJOFE213c ou /ab1c etc
app.get('/ab*c', (req, res) => {
	/* du code */
});

// match les urls : /abc ou /abbc ou /abbbbbbc etc
app.get('/ab+c', (req, res) => {
	/* du code */
});

// match toutes les url contenant un a
app.get(/a/, (req, res) => {
	/* du code */
});

// match toutes les urls qui finissent par fly
app.get(/.*fly$/, (req, res) => {
	/* du code */
});
```

### Retourner une certaine data sur une même URL

Ci-dessous, une **URL idendique** sur une méthode **GET** et **POST**.
Le rendu affiché à l'écran sera lui complètement différent.

-   Si méthode **GET** on affichera : _Je suis affiché grâce à la méthode GET._
-   Si méthode **POST** on affichera : _Je suis affiché grâce à la méthode POST._

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
	console.log(req.body);
	res.send('Je suis affiché grâce à la méthode GET');
});

app.post('/', (req, res) => {
	console.log(req.body);
	res.send('Je suis affiché grâce à la méthode POST');
});

app.listen(5001);
```

### Tableau des méthodes les plus utilisés dans Express

| C.R.U.D (create, read, update, delete) |
| -------------------------------------- |
| `app.get(path, handler());`            |
| `app.post(path, handler2());`          |
| `app.put(path, handler3());`           |
| `app.delete(path, handler4());`        |

| Autres méthodes utilisés           |
| ---------------------------------- |
| `app.checkout(path, handler());`   |
| `app.copy(path, handler2());`      |
| `app.notify(path, handler3());`    |
| `app.search(path, handler4());`    |
| `app.subscribe(path, handler5());` |

### Récupération des paramètres d'une URL

> On l'a vu dans une note, dans le chapitre précédent.

Les paramètres des routes sont des segments de path qui sont nommés pour capturer des valeurs à une position spécifique de l'URL

Les valeurs capturées sont ensuite mises sur l'objet req.params

Exemple d'un path : `/languages/:languageId/books/:bookId/:lessonId`

-   URL de la requête HTTP
    http://localhost:5001/languages/6/books/8989/2

-   Résponse en retour via req.params

```json
{
	"languageId": "6",
	"bookId": "8989",
	"LessonId": "2"
}
```

En reprenant le code déjà existant, on lui rajoute une route GET à la fin. Soit

```js
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	console.log(req.body);
	res.send('Je suis affiché grâce à la méthode GET');
});

app.post('/', (req, res) => {
	console.log(req.body);
	res.send('Je suis affiché grâce à la méthode POST');
});

/**
 * -----------------------------------------------------
 * On ajoute
 * -----------------------------------------------------
 **/
app.get('/languages/:languageId/books/:bookId/:lessonId', (req, res) => {
	console.log(req.params);
	console.log(req.body);
	res.send(`Je suis une reqête qui fonctionne`);
});

app.listen(port);
```

## Découverte de la méthode all()

La méthode app.**all()** permet de matcher toutes les méthodes HTTP

Elle peut aisément être utilisé comme la méthode app.**use()** sans URL passé en paramètre.

Exemple avec **restapi** fourni par Dyma.
toutes les urls commencent par **api**

```js
// Métode all()
app.all('/api/*', requireAuthentication);

// L'équivalent avec app.use
app.use('/api', requireAuthentication);
```

## Découverte de la méthode route()

La méthode app.**route()** permet de définir plusieurs méthode pour le même path. Très utilisé dans les système de CRUD (Create read update delete)

Un exemple vaut mieux que mille mots.

```js
// AVANT ...
app.get(('/book', (req, res) => {
		res.send('Un livre')
});

app.post(('/book', (req, res) => {
		res.send('Sauvegarde du livre')
});

app.put(('/book', (req, res) => {
		res.send('Mise à jour du livre')
});

app.delete(('/book', (req, res) => {
		res.send('Suppression du livre')
});
```

```js
// APRES ...
app.route('/book')
	.get((req, res) => {
		res.send('Un livre');
	})
	.post((req, res) => {
		res.send('Sauvegarde du livre');
	})
	.put((req, res) => {
		res.send('Mise à jour du livre');
	})
	.delete((req, res) => {
		res.send('Suppression du livre');
	});
```

## Découverte du Routeur d'Express

Pour créer une instance du Router d'Express, il faut utiliser express.Router(). C'est avant tout un middleware qui à pour usage unique le routing

Pour une meilleure mise en place, voici les démarches :

CREATION D'UN FICHIER DE ROUTING

1. Créer un dossiers routes
2. Créer un fichier users.js
3. Ajouter dans le fichier users.js le code ci-dessous

```js
const express = require('express');
const router = express.Router();

router.use(timeLog, (req, res, next) => {
	console.log('Heure : ', Date.now());
	next();
});

router.get('/active', (req, res) => {
	res.send('Les utilisateurs actifs');
});

router.get('/:id', (req, res) => {
	res.send('Un utilisateur');
});

router.post('/', (req, res) => {
	res.send('Créer un utilisateur');
});

module.exports = router;
```

Dans le fichier app.js

```js
const users = require('./users');
// ... Code Précédent
app.use('/users', users);
app.listen(5001);
```
