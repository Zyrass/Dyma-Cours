# Formation NodeJS

## Chapitre - 07 - Express suite

Express permet l'utilisation de **template**, en sommes nous allons pouvoir dynamiquement modéliser des pages selon la demande de l'utilisateur.
Il existe une très longues liste de template pour Express.

> Sur Dyma, ils proposent un cours sur **PUG** et sur **EJS**. Deux framework qui font sensiblement la même chose avec une syntaxe complètement différente. Les notes qui vont suivre sont uniquement basé sur **PUG**. J'ai choisi cette syntaxe et je la trouve très simple au niveau de son approche.

> En revanche, si vous souhaitez connaître le template **EJS**, je vous invite à vous rendre sur [la page officiel](https://ejs.co/) qui en parle ou bien même vous rendre sur la formation sur Node.js proposé par Dyma, vous y trouverez un cours sur le template **EJS**.

### app.set() VS res.set()

Nous avons vu la méthode **set()** qui est disponible via l'objet **response**.

```diff
- Elle n'a strictement rien avoir avec la méthode set()
- fourni par express
```

Nous allons pouvoir ajouter une valeur sur un paramètre spécifique.

> Cette méthode est indispensable pour la création d'un **template engine**. Sans quoi nous ne pourrions rien faire.

Un raccourci bien utile peut-être utilisé si nous définissons un booléen en paramètre.

```js
// Normalement on noterai
app.set('colorPink', true);
app.set('backgroundPurple', false);

// Le raccourci faisant référence à true
app.enable('colorPink');

// Le raccourci équivalent à false
app.disable('backgroundPurple');
```

#### Des propriétés réservés

Je ne rentrerai pas dans les détails, c'est beaucoup mieux expliqué dans le cours écris.

1. **case sensitive routing**

> Cette propriétée est un booléen à connaître, elle permet de dissocier une route d'une autre si celle-ci ont le même nom avec pour particularité d'être inscrite différemment.

Exemple, Les 3 routes qui suivent n'auront rien en commun malgré qu'à l'oral, c'est la même chose.

-   /test
-   /TEST
-   /Test

Voici le code qu'il faudra utiliser :

```js
app.enable('case sensitive routing');
```

2. **views** - `Avec un "s" à views`

Cette propriété permet de définir l'emplacement des vues qui seront utilisé.

```js
app.set('views', path.join(__diname, 'Views'));
```

3. **view engine** - `Sans "s" à view`

Cette propriété permet de définir l'extension qui sera utilisé par les fichiers du template.

```js
// Pour les amoureux du foot il sauront de qui je parle :P
app.set('view engine', 'jma');
```

### Conception d'un template

Pour ce qui suit, il nous faut un fichier contenant du HTML mais qui disposera comme on l'a spécifié auparavant, une extension **JMA**.

> Le choix est volontaire, j'adore l'OL et même si je ne suis pas toujours d'accord avec les choix de notre président il a tellement apporté à mon club de coeur que j'ai directement pensé à lui pour l'extension :P.

Donc comme on l'a mentionné avant, on va créer **un dossier** à la racine du projet qui s'appelera ~~Quezack~~ **Views**. A l'intérieur, nous allons créer un fichier HTML banal qui aura pour extension **.jma**.

```diff
+ Vous êtes libre d'inscrire ce que vous voulez
```

Le code du fichier sera extrêmement simple.
_On y ajoutera du dynamisme plus tard :P_

Voici à quoi il ressemble :

> Astuce perso : Créer un fichier .html a

```
<!DOCTYPE html>
<html>
  <head>
    <title>Templating avec Express</title>
  </head>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
```

Là pour le moment on a fini, on y reviendra plus tard.
On peut se rendre à nouveau dans notre fichier **app.js**.

### La méthode engine()

Cette méthode va être très importante, elle va prendre deux paramètres.

-   Le premier paramètre correspond à l'extensions des fichiers du template qui seront utilisé.
-   Le second paramètre correspond à une fonction qui elle même contient trois arguments.

    -   `path` correspond au chemin du fichier
    -   `options` correspond à la data qui sera passé ici.
    -   `callback` dispose de 2 paramètres, (l'erreur ou le retour du template);

Ce qui donne ce début de code :

```js
app.engine('jma', (path, options, callback) => {
	// à suivre
});
```

Nous allons avoir besoin de **file system**... oui oui **fs** qui a été vu dans les cahpitres précédent sur Node :). Pas besoin de le présenter.

> En revanche son contenu lui est important à comprendre.

-   Dans un premier temps nous allons gérer l'erreur et si erreur il y a, nous allons afficher **le callback avec son 1er paramètre soit l'erreur**.

```js
app.engine('jma', (path, options, callback) => {
	fs.readFile(path, (error, data) => {
		// L'erreur ci-dessous correspond à FS
		if (error) {
			// L'erreur correspondant à ENGINE
			callback(error);
		}
	});
});
```

Une fois, la gestion de l'erreur traité, nous pouvons passé à la gestion du second paramètre. **Il correspond comme ça a été dit, au template qui sera retourné**.

> La data qui est passé en paramètre, renvoi **un buffer**, pour la traiter, il nous faudra utiliser la méthode **toString()** pour pouvoir l'interpréter.

Ainsi le code devriendra :

```js
app.engine('jma', (path, options, callback) => {
	fs.readFile(path, (error, data) => {
		if (error) {
			callback(error);
		}

		// Data retourné ici, null en 1er paramètre qui correspond à l'erreur, et en second la data
		callbaback(null, data.toString());
	});
});
```

> **Les options** ne sont actuellement pas utiliser
> mais on va y revenir un peu plus bas lorsque l'on comprendra réellement l'utilité du templating.

### La méthode render

Pour valider notre template, nous allons devoir utiliser la méthode
**render()** qui va nous permettre de charger notre fichier.
Cette méthode prends 3 paramètres,

1. Le nom du fichier **avec** ou **sans** son extension même si sans son extension nécessitera de le passer **obligatoirement** en second paramètre de la méthode **send()** utilsé sur notre **application**.

```js
app.set('view engine' /* ici */);

// Soit
app.set('view engine', 'jma');
```

Ainsi à ce stade, nous avons tout pour faire fonctionner la page.
Donc la base du code obtenu sera celle-ci :

```js
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'jma');

app.enable('case sensitive routing');

app.engine('jma', (path, options, callback) => {
	fs.readFile(path, (error, data) => {
		if (error) {
			callback(error);
		}
		callback(null, data.toString());
	});
});

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(5000, 'localhost');
```

Magie, on a bien une belle page html avec comme retour : `Hello World`.

### Passons aux choses sérieuse, le dynamisme !!

Pour ajouter du dynamisme dans la page web, il va falloir modifier le template **JMA** qui a été créée.

-   Actuellement nous avons :

```
<!DOCTYPE html>
<html>
  <head>
    <title>Templating avec Express</title>
  </head>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
```

-   Nous modifierons légèrement ce code comme suit

```
<!DOCTYPE html>
<html>
  <head>
    <title>Templating avec Express</title>
  </head>
  <body>
    <h1>Bonjour jeune %adjectif !</h1>
  </body>
</html>
```

Au niveau de **app.engine**, nous avons défini un second paramètre inutilisé jusqu'à maintenant. (l'objet **options**)

Pour l'utiliser ces options, nous allons devoir utiliser la méthode native **replace()** après la transformation du **buffer** en chaîne lisible à l'écran.

En paramètre, nous allons saisir pour le 1er : **%adjectif,**, et pour le second, **options.adjectif**.

Donc obtiendra ce code :

```js
app.engine('jma', (path, options, callback) => {
	fs.readFile(path, (error, data) => {
		if (error) {
			callback(error);
		}
		callback(null, data.toString().replace('%adjectif%', options.adjectif));
	});
});
```

Mais là, nous avons simplement câblé un système dynamique sans modifier son contenu.

Pour modifier le contenu c'est avec la méthode **render()** que ça se passe.

```js
res.render('index', { adjectif: 'aventurier' });
```

Le code sera le suivant :

```js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'jma');

app.engine('jma', (path, options, callback) => {
  fs.readFile(path, (error, data) => {
    if ( error ) {
      callback( error );
    }
    callback( null, data.toString().replace('%adjectif', options.adjectif ));
  })
})

app.get('/', (req, res) => {
  res.render('index', {
    adjectif: 'aventurier'
  })
}

app.listen(5001, "localhost");
```

```diff
- Attention ici nous ne modifions qu'un seul élément.
```

`Pour avoir plusieurs data à passer dynamiquement je ne vois pas d'autres solution que faire comme ci-dessous`.

```
<!DOCTYPE html>
<html>
  <head>
    <title>Templating avec Express</title>
  </head>
  <body>
    <h1>Bonjour jeune %adjectif !</h1>
    <p>%prenom %nom est un président très charismatique... </p>
  </body>
</html>
```

```js
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'jma');

app.engine('jma', (path, options, callback) => {
	fs.readFile(path, (error, data) => {
		if (error) {
			callback(error);
		}
		callback(
			null,
			data
				.toString()
				.replace('%adjectif', options.adjectif)
				.replace('%prenom', options.prenom)
				.replace('%nom', options.nom)
		);
	});
});

app.get('/', (req, res) => {
	res.render('index', {
		adjectif: 'aventurier',
		prenom: 'Jean Michel',
		nom: 'Aulas',
	});
});

app.listen(5001, 'localhost');
```

## Découverte de PUG

> Comme je l'ai dis, j'ai choisi **PUG** pour sa simplicité et sa syntaxe élégante et surtout très simple à comprendre.

Voici à cette adresse, [la documentation officiel](https://pugjs.org/) sur cette façon de concevoir nos pages web.
Pour commencer il va nous falloir l'installer en saisisant :

```sh
npm install pug
```

Il faut penser à modifier l'extension défini ici :

```js
// Avant
app.set('view engine' 'jma');

// Après
app.set('view engine' 'pug');
```

Et bien entendu, il faut modifier le fichier **.pug**, mais on y vient.

### HTML vs PUG

Ci-dessous, deux syntaxes complètement différence qui produiront exactement le même effet.

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Syntaxe</title>
	</head>
	<body>
		<h1 class="picsou">Je suis un rendu</h1>
		<p class="riri fifi loulou zaza">
			Je suis un super paragraphe avec trois classes waouu! c'est super
			dis donc !!!
		</p>
		<p id="donald">Je suis un paragraphe avec un id.</p>
	</body>
</html>
```

```pug
<!DOCTYPE html>
html
  head
    title Syntaxe
  body
    h1.picsou Je suis un rendu
    p(classe=['riri', 'fifi', 'loulou']).
      Je suis un super paragraphe avec trois classes waouu!
      C'est super dis donc !!!
    p(id="donald") Je suis un paragraphe avec un id.
```

Donc nous allons avoir dans notre fichier **app.js**

```js
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(5001, 'localhost');
```

On peut vérifier le résultat dans notre navigateur.

## Initiation à Pug

> Pour les exemples qui vont suivre, je vais les reprendre partiellement ce qui est proposée sur DYMA. JE vous recommande d'allez lire le cours écrit qui vraiment bien fichu pour le reste, je vous propose de vous rendre sur la doc officiel.

Pour une meilleure compréhension, ça va se dérouler en deux étapes.

1. Affichage du rendu **HTML**
2. Equivalent écrit avec **PUG**

### I - class / textes

-   Découverte de l'utilisation des classes (deux méthodes).
-   Découverte de l'utilisation d'un text sur plusioeurs lignes.

```html
<h1 class="title_principal">Titre</h1>
<p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
<p class="p-5 text-grey">
	Tempore nam animi minima consequatur assumenda dolorum odit, ut accusantium.
</p>
<p class="p-5 text-grey">
	Tempore nam animi minima consequatur assumenda dolorum odit, ut accusantium.
</p>
<p>
	Tempore nam animi minima consequatur assumenda dolorum odit, ut accusantium.
	Eveniet commodi quidem laborum blanditiis necessitatibus. Quaerat eaque
	asperiores eveniet aut ab!
</p>
```

```pug
h1(class="title_principal") Titre
p.lead Lorem ipsum dolor sit amet consectetur adipisicing elit.
p(class=["p-5", "text-grey"]) Tempore nam animi minima consequatur assumenda dolorum odit, ut accusantium.
p.p-5.text-grey Tempore nam animi minima consequatur assumenda dolorum odit, ut accusantium.
p.
	Tempore nam animi minima consequatur assumenda dolorum odit, ut accusantium.
  Eveniet commodi quidem laborum blanditiis necessitatibus. Quaerat eaque
	asperiores eveniet aut ab!
```

> Si on saisi `p. Du text sur plusieurs lignes, celui-ci ne sera pas pris en compte.`

```diff
+ Une subtilitée existe entre les parenthèses, je vous laisse découvrir ça sur Dyma ;)
```

### II - id / style css / javascript

```html
<html>
	<head>
		<title>ID style script</title>
	</head>
</html>
<body>
	<section>
		<article id="article-1">
			<p>Du contenu...</p>
		</article>
		<article id="article-2">
			<p>Du contenu...</p>
		</article>
	</section>
	<script>
		console.log('Bonjour');
	</script>
</body>
```

```pug
<!DOCTYPE html>
html
	head
		title ID style script
	body
		section
			article#article-1
				p Du contenu...
			article(id="article-2")
				p Du contenu...
			article( style={padding:"50px", margin:"20px 0"} )
				p Du contenu...
		script.
			console.log('Bonjour');
```

### III - les listes

```html
<ul>
	<li>un item</li>
	<li>un autre item</li>
	<li>encore un autre item</li>
</ul>

<ol>
	<li>un item</li>
	<li>un autre item</li>
	<li>encore un autre item</li>
</ol>

<dl>
	<dt>1 -</dt>
	<dd>un item</dd>

	<dt>2 -</dt>
	<dd>un autre item</dd>

	<dt>3 -</dt>
	<dd>encore un autre item</dd>
</dl>
```

```pug
ul
	li un item
	li un autre item
	li encore un autre item

ol
	li un item
	li un autre item
	li encore un autre item

dl
  dt 1 -
  dd un item

  dt 2 -
  dd un autre item

  dt 3 -
	dd encore un autre item
```

### la div par défaut ?

```html
<div class="information__container">
	<div class="information__content">
		<p>du contenu...</p>
	</div>
</div>
```

```pug
div.information__container
	.information__content
		p du contenu...
```

> La convention utilisé pour le CSS s'appel le **BEM**. Vous pouvez vous informer de son utilisation ici : [https://www.alticreation.com/bem-pour-le-css/](https://www.alticreation.com/bem-pour-le-css/)

## Pug dans toute sa splendeur (Suite avancé)

La on rentre dans le vif du sujet.. on va voir ces points :

-   Interpoler du javascript
-   l'utilisation d'un if/else
-   l'utilisation d'un switch case
-   l'utilisation de quelques boucles

Pour cette utilisation, nous allons passez de la data dans notre render.

```js
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Je suis un super titre !!',
		message:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias doloribus repudiandae corrupti laboriosam! Corrupti, molestias. Asperiores nemo in vitae, laborum rem harum dicta aut fugit, impedit excepturi soluta, ipsam fugiat?',
		info: { nom: 'Guillon', prenom: 'Alain', age: 36 },
		authentificated: true,
		pseudo: 'Zyrass',
		srabs: 8,
		players: [
			'Fékir',
			'Ndombélé',
			'Dembélé',
			'Memphis',
			'Lisandro',
			'Coupet',
			'Cris',
			'Lopes',
			'Dubois',
			'Abidal',
			'Denayer',
			'Reine-Adelaïde',
			'Aouar',
			'Tolisso',
			'Lacazette',
			'Umtiti',
			'Lloris',
		],
	});
});

app.listen(5001, 'localhost');
```

### IV - L'interpolation avec du javascript

```html
<html>
	<head>
		<title>Pug avancé</title>
	</head>
	<body>
		<h1>Je suis un super titre !!</h1>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
			doloribus repudiandae corrupti laboriosam! Corrupti, molestias.
			Asperiores nemo in vitae, laborum rem harum dicta aut fugit, impedit
			excepturi soluta, ipsam fugiat?
		</p>
		<p>Je m'appel Alain Guillon et j'ai 36 ans cette année.</p>
	</body>
</html>
```

```pug
<!DOCTYPE html>
html
	head
		title Pug avancé
	body
		h1= title
		p #{ message }
    p Je m'appel #{ info.prenom } #{ info.nom } et j'ai #{ info.age } ans cette année.
```

### V - L'utilisation d'un if/else

```html
<html>
	<head>
		<title>Pug avancé</title>
	</head>
	<body>
		<p>Bonjour Zyrass comment tu vas ?</p>
	</body>
</html>
```

```pug
<!DOCTYPE html>
html
	head
		title Pug avancé
	body
    //- authentificated vaut true
		if authentificated
			p Bonjour #{ pseudo } comment tu vas ?
		else
			p Bonjour, souhaitez-vous vous enregistré ?
```

### VI - L'utilisation d'un switch case

```html
<html>
	<head>
		<title>Pug avancé</title>
	</head>
	<body>
		<h2>Combien de potes as-tu ?</h2>
		<p>Chapeau l'artiste, tu as 8 srabs...</p>
	</body>
</html>
```

```pug
<!DOCTYPE html>
html
	head
		title Pug avancé
	body
		case srabs
			when 0
				p T'es sans srab... pourtant tu m'as moi !!
			when 1
				p Allez c'est cool tu as déjà un srab, continu !
			default
				p Chapeau l'artiste, tu as #{ srabs } srabs...
```

### VII - L'utilisation de quelques boucles

```html
<html>
	<head>
		<title>Pug avancé</title>
	</head>
	<body>
		<ul>
			<li>Fékir</li>
			<li>Ndombélé</li>
			<li>Dembélé</li>
			<li>Memphis</li>
			<li>Lisandro</li>
			<li>Coupet</li>
			<li>Cris</li>
			<li>Lopes</li>
			<li>Dubois</li>
			<li>Abidal</li>
			<li>Denayer</li>
			<li>Reine-Adelaïde</li>
			<li>Aouar</li>
			<li>Tolisso</li>
			<li>Lacazette</li>
			<li>Umtiti</li>
			<li>Lloris</li>
		</ul>

		<ul>
			<li>élément n°1</li>
			<li>élément n°2</li>
			<li>élément n°3</li>
		</ul>
	</body>
</html>
```

```pug
<!DOCTYPE html>
html
	head
		title Pug avancé
	body
		each player in players
			li #{ player }

		//- La boucle sera initialisé mais pas interpété
		- for (let x = 1; x <= 3; x++)
			li élément n°#{x}
```

### VIII - Initialiser une variable sans l'interpréter

```html
<html>
	<head>
		<title>Pug avancé</title>
	</head>
	<body>
		<h2>Je suis un autre titre</h2>
		<p class="text">
			&lt;span&gt;escape !&lt;/span&gt; Le html est quand à lui aucunement
			interprété
		</p>
	</body>
</html>
```

```pug
<!DOCTYPE html>
html
	head
		title Pug avancé
	body
		- const autreTitre = "Je suis un autre titre"
		h2 #{ autreTitre }

		- const duHtml = "<span>escape !</span>";
		p.text #{duHtml} Le html est quand à lui aucunement interprété
```

## Pug et les layout

> L'avantage de PUG, c'est que nous allons pouvoir tout simplement, étendre un layout pour le ré-exploiter sur toutes les pages simplement. Plus besoin d'éditer 40x le menu sur nos 40 pages.

La base du code est assez simple à comprendre.

1. layout.pug (contient menu ect..)
2. index.pug (contenu de la page)

-   layout.pug :

```pug
<!DOCTYPE>
html
  head
    title Layout pour la vie
  body
    .container
      //- Block réutilisé dnas le fichier index
      block content
```

-   index.pug :

```pug
extends layout.pug
  h1 Je suis l'index
```
