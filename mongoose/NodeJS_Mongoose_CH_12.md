# Formation NodeJS

## Chapitre - 12 - Mongoose

Mongoose ne peut aller sans MongoDB.

Mongoose va me permettre de modéliser des objets qui seront inscrit et enregistré dans la BDD.
Ainsi je vais pouvoir mettre en place facilement :

-   des schémas
-   des validations assez complexe
-   des middlewares

### Installation de Mongoose

Je vais devoir utiliser le terminal pour installer la dépendance **mongoose**.

```sh
# Installer mongoose
npm install mongoose
```

### Découverte et mise en place d'un dossier Sandbox.

> Si vous avez suivit chaque étape, vous serez en mesure de créer cette architecture facilement
> Elle sera utilisé à titre d'exemple pour se faire la main.

```sh
|	|
| + -- node_modules
| + -- index.js # ou app.js
| + -- package-lock.json # pour rappel, il sera créer automatiquement.
| + -- package.json
```

-   Il me faut **Nodemon** d'installé, logiquement c'est déjà le cas.
-   Il faudra que je pense à démarrer le processus de node. ( `sudo service mongod start` sur linux).

### Utilisation de mongoose dans un fichier

Il me faudra importer la dépendance pour pouvoir l'utiliser. (Comme d'habitude)

```js
const mongoose = require('mongoose');
```

Ici, je vais devoir utiliser la méthode **connect()** de mongoose et lui assigner une **URL mongoose**.
_Une URL commence généralement par **HTTP://** mais ici, nous allons utilisé : **mongodb://**_.

```diff
+ La méthode connect() retournera une promesse, et donc je vais devoir utiliser
+ .then( ... du code ... ).catch( ... du code ... );
```

En paramètre de cette URL, il y aura plusieurs informations :

1.  Mon nom d'utilisateur terminé par "**:"**".
	_Celui qui que j'ai créé quand j'ai saisi mes identifiants de mongoDB_
2.  Juste après les "**:**" je définirais le mot de passe qu' jai saisi tout à l'heure
	en terminant par "**@**".
3.  A ce moment, je définis simplement l'adresse que je souhaite obtenir.
    Ici pour l'exemple, j'aurais : [localhost:27017/livres?authSource=admin]
    1. **localhost:** pas besoin d'expliqué normalement.
    2. **27017/** correspond au port par défaut de mongodb
    3. **livres** correspond à la database livres qu'on a utilisé dans le chapitre précédent.
    4. **?authSource=admin** Il faut que je revois le cours pour comprendre essentiellement ce que ça signifie

```diff
- Deux erreurs seroont soulever par nodemon.
- Pour les fixer, il va me falloir ajouter les options qui me sont proposé.
```

A cette instant je peux ajouter un **.then()** quand la promesse est résolue et
un **.catch()** si celle-ci échoue.

Ainsi donc, voici le rendu que j'ai à ce moment précis. (Mon pseudo et mdp sont imaginaire)

```js
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb://superman:azerty@localhost:27017/livres?authSource=admin',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then(() => {
		console.log('Connexion établi avec succès');
	})
	.catch((error) => {
		console.error(error);
	});
```

### C'est quoi un schéma ?

Grâce à Mongoose il m'est possible de structurer mes futurs documents grâce à un schéma qui définira une certaine structure qui devra être respecté.

> MongoDB ne dispose pas de Schéma et donc il m'est indispensable d'utiliser mongoose pour en bénéficier.

Les SchemaTypes permettent de forcer la saisit du'un type d'une quelconque propriété.

| Type                      | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| **String**                | la valeur sera convertie avec **.toString()**            |
| **Number**                | la valeur sera convertie avec **.Number()**              |
|                           | sauf pour **null** et **undefined**                      |
| **Date**                  | la valeur sera convertie en **Date**.                    |
|                           | Sinon tout sera convertie en String.                     |
| **Buffer**                | la valeur sera convertie en **Buffer**                   |
| **Boolean**               | Rien avoir avec **Boolean()** ici SEULEMENT :            |
|                           | `true:true`, `'true'`, `1`, `'1'` et `'yes'`             |
| **Mixed**                 | la valeur **NE SERA PAS CONVERTIE**,                     |
|                           | on peut mettre ce que l'on veut.                         |
| **Array**                 | La valeur par défaut étant []                            |
| **Schema.Types.ObjectId** |  Permet de définir une propriété comme étant un ObjectId |

Les SchemaTypes acceptent des options afin de pouvoir mieux valider une structure de données.

| Nom          | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| **required** | ajoute un validateur qui force la définition de la propriété qui l'utilise. |
| **default**  | permet de définir une valeur par défaut de la propriété                     |
| **select**   | permet de retourner les propriété par fdéfaut par vos requêtes.             |
| **validate** | Permet de définit une fonction utilisé comme validateur pour la propriétée  |
| **get**      | permet de définir une fonction utilisé comme getter pour la propriétée.     |
| **set**      | permet de définir une fonction utilisé comme setter pour la propriétée.     |
| **index**    | permet de définir un index MongoDB pour la propriétée                       |
| **sparse**   | permet de définir un index sparse MongoDB pour la propriétée                |
| **unique**   | permet de définir un index unique MongoDB pour la propriétée                |

Exemple d'un schéma :

```js
const schema = mongoose.Schema;

const booksSchema = schema({
    index: Number,
    title: { type: String, required: true },
    info: {
        pages: { type: Number, required: true },
        chapters: { type: Number, required: true },
        color: Boolean,
        genre: String
    },
    editorId: schema.Types.ObjectId,
    authorId: schema.Types.ObjectId,
})
```

Exemple d'un livre passé au format JSON dans compass.

```json
{
	"index": 1,
	"title": "Javascript pour les KIDS - Dès 10 ans",
	"info": {
		"pages": 343,
		"chapters": 17,
		"color": true,
		"genre": "Développeur web",
	},
	"editorId": "5ead674e9e95b6ec8d8d54a1",
	"authorId": "5ead66939e95b6ec8d8d549f"
}
```

Une fois le schéma définit, il va me falloir créer **une constante** qui utilisera **le modèle définit précédemment** soit :

```diff
- Attention, la majuscule est indispensable sur le nom de la constante.
```

> Le **1er paramètre** du modèle, correspond au nom de la collection.
> Si pour X raison je décide de saisir un autre nom, ici _"banane"_, je devrais spécifier
> un **3ème paramètres obligatoire** pour pouvoir accéder à ma collection.
> Le **2ème paramètres** correspond au schéma du document que j'ai défini précédemment.

```js
const Books = mongoose.model("banane", booksSchema, "books");
```

voici à quoi ressemble le contenu de mon fichier avec une requête pour récupérer le contenu:

```js
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Mon schéma
const booksSchema = schema({
    index: Number,
    title: { type: String, required: true },
    info: {
        pages: { type: Number, required: true },
        chapters: { type: Number, required: true },
        color: Boolean,
        genre: String
    },
	editorId: schema.Types.ObjectId,
    authorId: schema.Types.ObjectId,
})

// Utilisation de mon schéma
const Books = mongoose.model('banane', booksSchema, 'books');

// Rappel le nom d'utilisateur et le mot de passe sont faux ici
mongoose
	.connect(
		'mongodb://superman:azerty@localhost:27017/dyma?authSource=admin',
		{
			useNewUrlParser: true, // Evite une erreur dans la console
			useUnifiedTopology: true, // Evite une erreur dans la console
		}
	)
	.then(() => {
	    console.log("Connexion établie avec succès");

		// Ici documents prends un "s" car je cherche à récupérer "un" ou "plusieurs" résultats.
		Books.find({}, (erreur, documents) => {
			if (erreur) throw erreur;
			console.log(documents);
		});
	})
	.catch((err) => {
		console.error(err);
	});
```

### Ajouter un élément

Je vais utiliser une des méthodes mise à disposition de **mongoose** pour ajouter un nouveau document.

```diff
- Attention -
Une fois le document sauvegardé, la data est directement envoyé dans la db,
Les doublons peuvent très vite apparaître
```

```js
	Books.create({
		"index": 2,
			"title": "CSS3 - Pratique du design web",
			"info": {
				"pages": 353,
				"chapters": 10,
				"colors": true,
				"genre": "Développeur web",
			}
	})
```

Mais également, pour concevoir un nouveau "book", je peux procédé comme ça :

```diff
- Attention -
Le code est à commenté une fois le fichier sauvegardé,
```

```diff
+ Ci-dessous on saura pourquoi j'ai saisi une majuscule à la constante "Books".
```

```js
const newBook = new Books();
newBook.index = 3;
newBook.title = "Je suis un nouveau livre";
newBook.info.pages = 250;
newBook.info.chapters = 14;
newBook.info.colors = false;
newBook.info.genre = "Pas référencé";

newBook.save();
```

### D'autres méthodes pour envoyer de la data

voici un code commenté avec quelques essai que j'ai pu faire.

```js
mongoose.connect("mongodb://superman:azerty@localhost:27017/livres?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // Requis avec findOneAndUpdate
}).then(() => {
    console.log("Connexion établie avec succès");
    

    Books.findOneAndUpdate(
		{ title: "HTML 5 - Une référence pour le développeur web" },  
        { $set: { "info.pages": 603, "info.chapters": 20, "colors": true, "genre": "Développeur web" }}, { new: true} ) 
    }).exec()
            .then( doc => {
                doc.validate();
                console.log(doc);
            })
            .catch(error => console.error( error ));

    // Books.updateOne({ title: "Javascript pour les KIDS - Dès 10 ans" }, newBooks, {upsert: true}).exec().then(doc => {
    //     console.log( doc );
    // }).catch( error => console.log( "Désolé ce document existe déjà" ));

    // Books.find({}, (erreur, myDocs) => {
    //     if (erreur) throw erreur;
    //     console.log( myDocs );
    // })
}).catch(error => {
    console.error( error );
});
```

## Chapitre 5

### Les Queries

Avec mongoose, la méthode **find()** correspond à une query.
Ainsi il est tout à fait possible d'afficher tout un contenu simplement avec ce petit bout de code.

```js
Books.find().exec()
		.then( myDocuments => {
			console.log( myDocuments)
		})
		.catch( error => console.error( error ));
```

### Trier ces documents

Dyma, m'a permit de découvrir **4 méthodes** très intéréssante.
Avec celles-ci, je peux par exemple : 

	- Réorganiser mes données que ce soit avec un ordre croissant ou bien même décroissant, grâce à la méthode **sort()**
	- Sauter un certain nombre de résultat, avec la méthode **skip()**
	- Limiter un affichage, avec la méthode **limit()**
	- Selectionner des champs spécifiques avec la méthode **select()**

Pour que le résultat soit simplement afficher sans avoir à utiliser de callback,
je vais utiliser la méthode **exec()** qui va me permettre de retourner une **promesse**.

> Via des exemple c'est tellement plus parlant.

La méthode sort()

Cette méthode accepte uniquement ces valeurs.

Croissant | Décroissant |
--- | --- |
asc | desc |
ascending | descending |
1 | -1

```js
// Affichera les pages avec un ordre décroissant
Book.find()
	.sort({ 'info.pages': -1 })
	.exec()
	.then((documents) => console.log(documents))
	.catch((err) => console.error(err));

// Affichera l'index par ordre croissant
Book.find()
	.sort({ index: 1})
	.exec()
	.then((documents) => console.log(documents))
	.catch((err) => console.error(err));
```

La méthode skip()

Cette méthode me permet de sauter des résultats.
En paramètre elle prends un **Number**.

```js
// Affichage normal (tous les documents)
Book.find()
	.exec()
	.then((documents) => console.log(documents))
	.catch((err) => console.error(err));

// Avec la méthode skip je saute les 2 premiers résultats
Book.find()
	.skip(2)
	.exec()
	.then((documents) => console.log(documents))
	.catch((err) => console.error(err));
```

La méthode limit()

Cette méthode est assez simple à comprendre, elle va me permettre de limiter le nombre d'affichage à l'écran.

> En revanche **si je saisis un nombre strictement égale à 1**, ça reviendrai à utiliser la méthode **findOne()**. Ce qui n'aurait pas de sens.

```js
// Je limite à un affichage.
Book.find()
	.limit(1)
	.exec()
	.then((document) => console.log(document))
	.catch((error) => console.log(error));

// Le résultat sera exactment le même.
Book.findOne()
	.exec()
	.then((document) => console.log(document))
	.catch((error) => console.log(error));
```

Un exemple plus logique avec 3 livres d'affiché

```js
// J'affiche ici 3 livres.
Book.find()
	.limit(3)
	.exec()
	.then((document) => console.log(document))
	.catch((error) => console.log(error));
```
> J'imagine utiliser ce genre de commande pour afficher les derniers articles d'un blog sur une page d'acceuil

Par exemple en chainant des méthodes je vais afficher juste mes 3 derniers livres

```js
Book.find()
	.sort({ index: -1 })
	.limit(3)
	.exec()
	.then((documents) => console.log(documents))
	.catch((err) => console.log(err));
```

La méthode select()

Cette méthode est vraiment géniale, elle peut me permettre d'afficher uniquement certaines data.

```js
// J'affiche les ID et TITLE
Book.find()
	.select('title')
	.exec()
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
```
Résultat obtenu 

```
[
  {
    _id: 5eae31e69e95b6ec8d8d54a2,
    title: 'HTML 5 - Une référence pour le développeur web'
  },
  {
    _id: 5eae3ede668bcff898e1e2d8,
    title: 'CSS3 - Pratique du design web'
  },
  { _id: 5eae40f63ab64cfb297497c3, title: 'Je suis un nouveau livre' },
  {
    _id: 5eaea1c1997ec568027c3cf5,
    title: 'Javascript pour les KIDS - Dès 10 ans'
  }
]
```

Le même code cette fois sans l'ID


```js
// J'affiche uniquement les TITLES
Book.find()
	.select('title -_id')
	.exec()
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
```
Résultat obtenu 

```
[
  { title: 'HTML 5 - Une référence pour le développeur web' },
  { title: 'CSS3 - Pratique du design web' },
  { title: 'Je suis un nouveau livre' },
  { title: 'Javascript pour les KIDS - Dès 10 ans' }
]
```

Pour finir ce chapitre je vais afficher quelques éléments avec une réorganisation par ordre décroissant des pages avec le tout limité à 3 résultats.

```js
Books.find()
	.select('title info.pages index -_id')
	.sort({ 'info.page': -1 })
	.limit(3)
	.exec()
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
```

Résultat obtenu
```
[
  {
    info: { pages: 603 },
    index: 1,
    title: 'HTML 5 - Une référence pour le développeur web'
  },
  {
    info: { pages: 353 },
    index: 2,
    title: 'CSS3 - Pratique du design web'
  },
  {
    info: { pages: 250 },
    index: 3,
    title: 'Je suis un nouveau livre'
  }
]
```

## Chapitre 6

Dans ce chapitre il est sujet de la compréhension des relations possible entre les collections.

Il existe deux façon de modéliser une base de donnée dans mongoDB.

1. la première par imbrication directe des éléments dans le document.
2. la seconde en faisant référence aux ID d'une autre collection.

Voir le cours écris pour comprendre un peu plus les relations.
