# Formation NodeJS - Express

> Ces notes ont été prises pendant mon apprentissage sur Node.JS et ici plus particulièrement Express sur la plateforme de [DYMA.fr](https://dyma.fr) > **En aucun cas ces notes ont pour vocation de voler le travail** réalisé par ces formateurs talentueux, **mais de promouvoir la qualité de leur travail**.
> _Si je suis capable de ré-expliquer des notions c'est que leurs formations vaut très franchement le détour_.

-   Si Mes notes sont satisfaisante et qu'elles vous donne l'envie de vous inscrire sur **Dyma**, je vous propose un lien de parrainage.
-   **_J'insiste qu'il est aucunement obligatoire de suivre mon lien._** :
-   Si vous tenez tout de même à me remercier pour cette prise de note, [cliquez ici pour que je vous parraine](https://dyma.fr/r/5d52bd274e7aec730eb90fde)

## Chapitre - 06 - (Suite de la formation sur NodeJS)

> Si vous ne maitriser pas la base de Node.js, vous pouvez continuer mais il y aura des features que vous ne comprendrez pas.

### Qu'es-ce que Express ?

- Express est un framework pour Node.js. C'est le plus utilisé à travers le monde.
- Express remplace le **callback** de manière très efficace.
- Express utilise un modèle de **stack**.

> La **stack** est le **3ème paramètre** du **callback**, son nom est **next**.
> En gros, on retrouvera comme paramètre, en premier **req**, en second, **res** et enfin **next**.

- Lien de la doc officiel à cette adresse : [https://expressjs.com/](https://expressjs.com)
- Lien de la même doc, traduite en français : [https://expressjs.com/fr/](https://expressjs.com/fr/)

Pour pouvoir utiliser Express, nous allons devoir utiliser **NPM**.
Express est une dépendance qu'il nous faudra installer via la commande :

```sh
# Dans le terminal
npm install express
```

Ensuite une fois **Express installé**, il va nous falloir l'importer via ce bout de code :

```js
const express = require('express');
```

#### Les 3 méthodes à connaître

```diff
- Attention, il faudra toujours terminer une méthode par la gestion de l'erreur. Ce qui nous évitera une boucle infini.
+ En revanche, pour les exemples proposé, seul le tout dernier bénéficiera d'un code correcte. 
```

Les trois méthodes ci-dessous sont les points les plus imortant à comprendre.

| #   | Nom                            | Description                              |
| --- | ------------------------------ | ---------------------------------------- |
| 1   | app.use( path, fn )            | Créer un middleware                      |
| 2   | app.METHOD( path, fn )         | Router une requête                       |
| 3   | app.route( path ).METHOD( fn ) | Créer une route en chaînant les méthodes |

##### 1 - app.use

Représentation d'un layer de type **MIDDLEWARE**

```js
{
  Path: "/xxx",
  Handle: fn
}
```

1. Ex n°1 : Sans **path** dans **app.use()** mais juste avec la fonction de callbak.

```js
const express = require('express');
const app = express();

const testOne = (req, res, next) => {
  console.log( req.url );
  console.log( next );
  next();
}

app.use( testOne );
```

2. Ex n°2 - Avec un **path** dans **app.use()** en plus de la fonction de callback.

> Pour faire les tests, on va utiliser **RESTAPI** qui est fournig grâcieusement par la plateforme de DYMA.
> Ainsi chaque route commencera par **/api**.

```js
const express = require('express');
const app = express();

const testTwoWithAPI = ( req, res, next ) => {
  console.log( req.url );
  console.log( next );
  next().
}

app.use( "/api", testTwoWithAPI );
```

##### 2 - app.METHOD

Voici la liste des méthodes qui sont utilisé pour soumettre une requête :

- **GET** : La méthode GET demande une représentation de la ressource spécifiée. *Les requêtes GET doivent uniquement être utilisées afin de récupérer des données*.
- **HEAD** : La méthode HEAD demande une réponse identique à une requête GET pour laquelle on aura omis le corps de la réponse (on a uniquement l'en-tête).
- **POST** : *La méthode POST est utilisée pour envoyer une entité vers la ressource indiquée*. Cela  entraîne généralement un changement d'état ou des effets de bord sur le serveur.
- **PUT** : *La méthode PUT remplace toutes les représentations actuelles de la ressource visée par le contenu de la requête*.
- **DELETE** : *La méthode DELETE supprime la ressource indiquée*.
- **CONNECT** : *La méthode CONNECT établit un tunnel vers le serveur identifié par la ressource cible*.
- **OPTIONS** : *La méthode OPTIONS est utilisée pour décrire les options de communications avec la ressource visée*.
- **TRACE** : *La méthode TRACE réalise un message de test aller/retour en suivant le chemin de la ressource visée*.
- **PATCH** : *La méthode PATCH est utilisée pour appliquer des modifications partielles à une ressource*.

Exemple On utilisera ça comme ça :

```js
// ... du code

app.get( /* Du code ... */ ); // Lire de la data
app.post( /* Du code ... */ ); // Envoyer de la data
app.put( /* Du code ... */ ); // Mettre à jour la data
app.delete( /* Du code ... */ ); // Supprimer la data
// Même chose poour les autres méthodes...

// du code ...
```

##### 3 - app.route

Représentation d'un layer de type **ROUTE**

```js
const route = new Route();
{
	Path: '/xxx';
	Handle: route.dispatch;
	// route.dispatch créer une STACK de plusieurs LAYER
}

{
	method: 'get';
	handle: fn;
}
```

Exemple d'une route qui sera afficher différemment pour une meilleure lecture.

```js
// Syntaxe illisible
app.route('/exemple').get((req, res, next) => {
  /* du code */
}).post((req, res, next) => {
  /* du code */
})

// Syntaxe propre
app
  .route("/exemple")
  .get((req, res, next) => {
    /* Du code */
  })
  .post((req, res, next) => {
    /* Du code */
  })
```

#### Node VS Express

> On va ici comparer une même route pour accéder à une page d'accueil.

##### Version : NODE.JS

```js
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {

  const url = req.url;

  if ( url === "/" ) {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.write('Bonjour Node.js');
    res.end();
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8"
    })
    res.write("Je ne suis plus sur la page d'accueil");
    res.end();
  }

})

server.listen(5000, "0.0.0.0");
```

##### Version : EXPRESS

```js
const express = require('express');
const app = express();

app.get( '/', (req, res, next) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  })
  res.write('Bonjour Express');
  res.end();
})

app.listen( 5001, "0.0.0.0" );
```

### Découverte de la méthode send() d'Express

La méthode **send()** est mise est un raccourci de ces trois méthodes.

1. `res.setHeaders()`
2. `res.write()`
3. `res.end()`

> Ainsi le code qu'on a généré précédemment avec Express donne ce code :

```js
const express = require('express');
const app = express();

app.get( '/', (req, res, next) => {
  res.send("Bonjour Express");
})

app.listen( 5001, "0.0.0.0" );
```

### Utilisation de nodemon

Nous en avons parlé dans un chapitre précédent. Autant faire un petit rappel, ça ne fait pas de mal.

- On commence par installer la dépendance **nodemon**
- On modifie le fichier **package.json**
- on lance le serveur.

```sh
# Installation en Global
npm install -g nodemon
		
# Installation comme dépendance de développement
npm install --save-dev nodemon
```

Dans le fichier **package.json**, on va modifier le script start qu'on avait créé.

- Avec Node (Avant)

```js
"scripts": {
	"start": "node app.js"
}
```

- Avec Nodemon (Après)

```js
"scripts": {
	"start": "nodemon app.js"
}
```

- On aura plus qu'à lancer la commande :

```sh
# Dans un terminal
npm start
```

> Ainsi, à chaque modification le serveur sera automatiquement rechargé, il nous faudra simplement appuyer sur la touche **F5** pour ré-actualiser la page.

### Découverte du module natif de Node.js : path

Ce petit détour est simplement duau faite qu'on aura besoin très régulièrement de ce module.
Pour utiliser ce module, il nous faudra dans une premier temps l'importer.
Bon ça on sait faire.

```js
const path = require('path');
```

Ce module dispose de plusieurs méthodes, qui seront très utile.

> Pour les exemple suivant on sélectionnera le fichier **index.js** se trouvant dans le dossier **node_modules/express**.

1. **path.dirname** : Permet de donner le nom du répertoire du fichier spécifier.

```js
const nomDuRepertoire = path.dirname('./node_modules/express/index.js');
// Renverra : ./node_modules/express
```

2. **path.extname** : Permet d'indiquer l'extension du fichier.

```js
const extDuFichier = path.dirname('./node_modules/express/index.js');
// Renverra : .js
```

3. **path.isAbsolute** : Permet de tester si une url est absolue ou non.

```js
const isAbsolute1 = path.isAbsolute('./node_modules/express/index.js');
// Renverra : false (./etc...)
```
```js
const isAbsolute2 = path.isAbsolute('/node_modules/express/index.js');
// Renverra : true (/etc...)
```

4. **path.join** : Permet de définir des url sans erreur possible. Avec une petite subtilité topissime.

```js
const join1 = path.join( __dirname, 'node_modules', 'express', 'index.js');
// Renverra : chemin complet + l'ajout de /node_modules/express/index.js
```
> Avec la petite subtilité ci-dessous : 

```js
const join2 = path.join('/a', 'b', 'c/d', 'e', '..');
// Renverra : /a/b/c/d
// Et non /a/b/c/d/e vu qu'il y a '..' et donc la méthode join sait remonter d'un niveau
```

5. **path.normalize** : Normalise un path en enlevant les . ou .. passé en paramètre.

```js
const normalize = path.normalize('/a/b/c/d/e/..');
// Renverra : 'a/b/c/d/e'
```
1. **path.parse** : Permet de dispatcher une url afin d'en extraire chacun de ces éléments.

```js
const join3 = path.join( __dirname, 'node_modules', 'express', 'index.js');
const parse = path.parse( join3 );
/**
 * Reverra :
 * ----------------------------------------------------------------------------
    { 
			root: '/',
			dir	: 'chemin_complet_sansindex.js',
			base: 'index.js',
			ext	: '.js'
			name: 'index'
		}
 * ----------------------------------------------------------------------------
 **/
```
7. **path.resolve** : Permet de créer/écraser

```js
const resolve1 = path.resolve('./a/b', './c');
// Renverra : '/a/b/c'
// Donc ici on ajoute le répertoire c à la suite de a et b
```

```js
const resolve2 = path.resolve('./a/b', '/c/d');
// Renverra : '/c/d'
// Ici on écrase a/b par c/d
```

```js
// Si le répertoire de travail est : /home/boby/node
const resolve3 = path.resolve('root', 'a/b/', '../c/d.txt');
// Renverra : '/home/boby/node/root/a/c/d.txt'
// Donc ici, on remonte d'un dossier donc B sera ignoré et on affiche tout
```

### Découverte de quelques méthodes de l'objet response

1. Pas besoin de voir la base de la méthode **send()**, elle a été vu un peu plus tôt.

> En revanche nous pouvons passez du **TEXTE**, des **TAGS** ou bien du **JSON**.
> Selon la ressource passé en argument, celle-ci sera directement converti en HTML ou bien au format JSON

- Du TEXTE :

```js
res.send("Je suis du texte");
// Renverra :
// Une chaine de caractère au format text/plain
```

- Du HTML :

```js
res.send("<html><body><h1>Coucou</h1></body></html>");
// Renverra :
// Une interprétation du HTML au format text/html
```

- Du JSON :

> En tant normal nous serions obligé de sérialiser ce format pour pouvoir l'exploiter en utilisant : `JSON.stringify( data )`

Avec la méthode **send()**, nous n'avons pas besoin de le faire, la méthode le fait pour nous.

```js
res.send( { "langage": "Je suis du json" } );
// Renverra :
// Du JSON au format application/json
```

```diff
+ A savoir, un tableau sera également interpreté comme du JSON.
```

```js
res.send( [ { "langage": "html" }, { "framework": "react" } ] );
// Renverra :
// Du JSON au format application/json
```

2. La méthode **json()**, est utilisé comme son nom l'indique pour afficher du json tout comme la méthode **send()**. 

> La logique veut qu'on utilise cette méthode pour voir immédiatement à l'oeil, ce qu'il sera retourné.

```js
res.json( { "langage": "Je suis du json" } );
// Renverra :
// Du JSON au format application/json
```

3. La méthode **sendStatus()**, permet de définir un certain code d'erreur. 

> Déjà vu avec Node.js et la méthode **writeHead()**.
> Rappel d'un lien wikipédia parlant des codes d'erreurs : [https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)

```js
res.sendStatus( 503 );
// Renverra automatiquement à l'écran : Service Unavailable 

res.sendStatus( 500 );
// Renverra automatiquement à l'écran : Internal Server Error 

res.sendStatus( 404 );
// Renverra automatiquement à l'écran : Not Found

res.sendStatus( 403 );
// Renverra automatiquement à l'écran : Forbidden

res.sendStatus( 402 );
// Renverra automatiquement à l'écran : Payment Required

res.sendStatus( 401 );
// Renverra automatiquement à l'écran : Unauthorized 

res.sendStatus( 400 );
// Renverra automatiquement à l'écran : Bad Request 
```

4. La méthode **sendFile()** permet de retourner un fichier. 

> L'utilisation du module **path.join()** avec pour premier argument **__dirname**, nous obtiendrons très simplement le fichier en question via les autres arguments.

```js
res.sendFile( path.join( __dirname, "folder-test", "file-test.txt" ) );
// Renverra le contenu du fichier avec le header fixé à text/plain 
```

5. La méthode **set()** qui permet de définir un ou plusieurs headers.

```js
// 1 Header
res.set('Content-Type', 'text/plain');

// 2 Headers
res.set({
  'Content-Type': 'text/plain',
  'Option-1': 'Salut la terre',
});
```

6. La méthode **append()** permet **uniquement** d'ajouter un autre header.

```diff
- A placer impérativement après la méthode set() pour éviter que celle-ci ne l'écrase.
```

```js
res.set("Etape-1": "Je suis impérativement écrite en 1er");
res.append("Etape-2": "Et moi je suis juste après pour éviter que set() ne m'écrase");
```

#### Exemple d'un code qui fait tout ce qui a été vu ici.

```js
const path = require('path');
const express = require('express');
const app = express();

// Du HTML
app.get(
	'/',
	(req, res, next) => {
		res.send(`
			<!DOCTYPE html>
			<html>
				<head>
					<title>Méthodes sur l'objet res</title>
				</head>
				<body>
					<h1>Lien vers des pages utilisant des méthodes de l'objet response</h1>
					<p>Il faudra que vous revenez en arrière pour accéder ailleur</p>
					<ul>
						<li><a href="/text">text</a></li>
						<li><a href="/json1">json</a></li>
						<li><a href="/json2">json avec tableau</a></li>
						<li><a href="/file">Utilisation d'un fichier directement </a></li>
					</ul>
				</body>
			</html>
		`);
	},
	(error) => {
		if (error) throw error;
		res.sendStatus(500);
	}
);

// du text/plain
app.get(
	'/text',
	(req, res, next) => {
		res.set('Content-Type', 'text/plain; charset=utf-8');
		res.set({
			'Option-1':
				"J'adore apprendre les langages portant sur le JavaScript",
			'Option-2': 'Surtout sur la plateforme de Dyma.fr',
		});
		res.append('prop-append', 'Je suis append et je passe en dernier');
		res.send(
			'Je suis du text avec un content-type défini sur text/plain. Mais aussi il y a 2 options définis dans le header. (Option-1 et Option-2)'
		);
		next();
	},
	(error) => {
		if (error) throw error;
		res.sendStatus(500);
	}
);

// Du JSON
app.get(
	'/json1',
	(req, res, next) => {
		const myJSON = { Langage: 'javascript' };
		res.send(myJSON);
		console.log(JSON.stringify(myJSON));
		next();
	},
	(error) => {
		if (error) throw error;
		res.sendStatus(500);
	}
);

// Un tableau avec du JSON
app.get(
	'/json2',
	(req, res, next) => {
		res.send([
			{
				name: 'Alain',
				age: 36,
			},
			{
				name: 'Anthony',
				age: 31,
			},
		]);
		next();
	},
	(error) => {
		if (error) throw error;
		res.sendStatus(500);
	}
);

// Une erreur 404
app.get(
	'/login',
	(req, res, next) => {
		res.sendStatus(404);
	},
	(error) => {
		if (error) throw error;
		res.sendStatus(500);
	}
);

// Un fichier externe
app.get(
	'/file',
	(req, res, next) => {
		res.sendFile(path.join(__dirname, 'folder-test', 'file-text.txt'));
	},
	(error) => {
		if (error) throw error;
		res.sendStatus(500);
	}
);

app.listen(5000, 'localhost');

```
