# Formation NodeJS

## Chapitre - 12 - Mongoose

Mongoose ne peut aller sans MongoDB.

Mongoose va nous permettre de modéliser des objets qui seront inscrit et enregistré dans la BDD. Ainsi on va pouvoir mettre en place facilement :

-   des schémas
-   des validations
-   des middlewares

### Installation de Mongoose

On va devoir utiliser le terminal pour installer la dépendance mongoose.

```sh
# Installer mongoose
npm i -D mongoose
```

### Utilisation de mongoose dans un fichier

Il nous faudra l'importer puis nous utiliserons ce genre de code :

```js
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb://Zyrass:Eléanore@localhost:27017/dyma?authSource=admin',
		{
			useNewUrlParser: true,
			reconnectTries: 20, // retest de se connecter 20x
			reconnectInterval: 500,
		}
	)
	.then(() => {
		console.log('Connexion OK !');
	})
	.catch((err) => {
		console.log(err);
	});
```

### C'est quoi un schéma ?

Grâce à Mongoose il est possible de structurer sa BDD grâce à un schéma qui définira une certaine structure qui devra être respecté.

> MongoDB ne dispose pas de Schéma et donc il nous est indispensable d'utiliser mongoose pour en bénéficier.

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

voici à quoi ressemble un Schéma :

```js
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// définition d'un Schema
const chapterSchema = schema({
	title: { type: String, required: true },
	nbOfLessons: Number,
	index: Number,
	active: Boolean,
	infoId: schema.Types.ObjectId,
	test: { type: {}, defaut: { auteur: 'Alain' } },
});

// Création d'un documents si il n'existe pas.
const chapters = mongoose.model('toto', chapterSchema, 'chapters');

mongoose
	.connect(
		'mongodb://Zyrass:Eléanore@localhost:27017/dyma?authSource=admin',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('Connexion Ok');
		chapters.find({}, (erreur, documents) => {
			if (erreur) throw erreur;
			console.log(documents);
		});
	})
	.catch((err) => {
		console.error(err);
	});
```
