# Formation NodeJS

## Chapitre - 12 - Mongoose

Mongoose ne peut aller sans MongoDB.

Mongoose va me permettre de modéliser des objets qui seront inscrit et enregistré dans la BDD.
Ainsi je vais pouvoir mettre en place facilement :

-   des schémas
-   des validations assez complexe
-   des middlewares

### Installation de Mongoose

Je vais devoir utiliser le terminal pour installer la dépendance mongoose.

```sh
# Installer mongoose
npm i -D mongoose
```

### Découverte et mise en place d'un dossier Sandbox.

> Si vous avez suivit chaque étape, vous serez en mesure de créer cette architecture 
> qui sera utilisé à titre d'exemple pour se faire la main.

```sh
|	|
| + -- node_modules
| + -- index.js # ou app.js
| + -- package-lock.json # pour rappel, il sera créer automatiquement.
| + -- package.json
```

-   Il faudra, avoir **Nodemon** d'installé, logiquement c'est déjà le cas.
-   Il faudra que je pense à démarrer le processus de node. ( `sudo service mongod start` sur linux).
-   De là, il va falloir que je suive les étapes ci-dessous.

### Utilisation de mongoose dans un fichier

Il me faudra importer la dépendance pour pouvoir l'utiliser.

```js
const mongoose = require('mongoose');
```

Ici, je vais devoir utiliser la méthode **connect()** de mongoose et de lui assigner une **URL mongoose**.
(_J'appel ça comme ça mais le protocole utilisé ne sera pas **HTTP://** mais **mongodb://**_)...

```diff
+ La méthode connect() retournera une promesse, et donc on va utiliser then/catch
```

En paramètre de cette URL, il y aura :

1.  Mon nom d'utilisateur.
    > **Celui qui que j'ai créé quand j'ai saisi mes identifiants de mongoDB**) (Voir le chapitre précédent au cas où.). On terminera par "**:"**"
2.  Juste après les "**:**" je définirais le mot de passe associé à cette l'utilisateur.
    > On terminera cette fois par un "**@**"
3.  A ce moment, je définis simplement l'adresse que je souhaite obtenir.
    > Ici pour l'exemple, on aura : [localhost:27017/livres?authSource=admin]
    1. **localhost** pas besoin d'expliqué normalement.
    2. **27017** correspond au port par défaut de mongodb
    3. **livres** correspond à la database livres qu'on a utilisé dans le chapitre précédent.

```diff
- Une erreur sera soulever par nodemon, pour fixer ça, il va nous falloir ajouter une option.
+ Cette options est visible dans le message d'erreur.
```

A cette instant on peut ajouter un **.then()** quand la promesse est résolue et
un **.catch()** si celle-ci échoue.

Ainsi donc, voici le rendu que j'ai à ce moment précis. (Mon pseudo et mdp sont imaginaire)

```js
const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb://superman:azerty@localhost:27017/dyma?authSource=admin',
		{
			useNewUrlParser: true,
		}
	)
	.then(() => {
		console.log('Connexion Ok');
	})
	.catch((error) => {
		console.error(error);
	});
```

### C'est quoi un schéma ?

Grâce à Mongoose il est possible de structurer sa BDD grâce à un schéma qui définira une certaine structure qui devra être respecté.

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

voici à quoi ressemble un Schéma :

```js
const mongoose = require('mongoose');
const schema = mongoose.Schema;

// définition d'un Schema
const booksSchema = schema({
	title: { type: String, required: true },
	nbOfPages: Number,
	nbOfChapters: Number,
	index: Number,
	colors: Boolean,
	infoId: schema.Types.ObjectId,
	infos: { genre: String, auteur: String, defaut: { owner: 'Zyrass' } },
});

// Création d'un documents si il n'existe pas.
const books = mongoose.model('toto', booksSchema, 'livres');

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
		books.find({}, (erreur, documents) => {
			if (erreur) throw erreur;
			console.log(documents);
		});
	})
	.catch((err) => {
		console.error(err);
	});
```
