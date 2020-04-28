# Formation NodeJS

> Le chapitre 10 n'existe pas, il s'agit d'un projet guidé disponible sur DYMA.

## Chapitre - 11 - MongoDB

### Qu'est ce que MongoDB ?

C'est un service (processus) que l'on va utilisé et qui tournera en tâche de fond (arrière-plan). Lorsqu'on aura besoin d'interagir avec MongoDB, celui-ci sera déjà disponible et nous pourrons exécuter tout un tas de commande selon nos besoin

MongoDB utilise le **NOSQL** qui est beaucoup plus flexibles. Avec **MySQL** une fois une structure défnit, *il est assez fastidieux de changer cette dernière*. Avec le **NOSQL** c'est une toute autre histoire, un quelconque changement se fait très simplement.

```diff
+ MongoDB utilise le "BSON" qui est un format extrêmement proche du "JSON".
```

#### Pourquoi utiliser MongoDB ?

> Avant tout, je veux me former à la stack : **M.E.R.N** puis **M.E.V.N** et enfin **M.E.A.N**.
> Pour celà, je dois apprendre **MongoDB**, **Express**, **React** et **Node**. 
> C'est a titre perso.

Pour un développeur **fullstack JavaScript**, l'avantage d'utiliser MongoDB est un peu expliqué précédemment, le format utilisé est le **BSON** très proche du **JSON**. Avec par exemple le **MySQL**, il faut apprendre une toute autre syntaxe... _qui n'est pas si compliqué que ça_ mais ça vous oblige à utiliser un autre langage server par exemple le **php**. Grâce au **BSON**, nous n'avons pas besoin de tergiverser côté **javascript**. L'utilisation du JSON est très simple.

Le second point positif, j'en ai également parlé avant, il est inutile de passer des jours où des heures pour modéliser une structure de donnée.

Pour finir la documentation est agréable à lire et surtout elle est disponible en français !!

[Lien de la présentation officiel en français](https://www.mongodb.com/fr)


#### Les BDD existantes en NoSQL

```diff
- Ce qui suit, je n'en connais aucune, du moins, j'apprends ici mongoDB. C'est juste par pur information.
```

| Orientées documents | Lien Officiel                                              |
| ------------------- | ---------------------------------------------------------- |
| MongoDB             | [https://www.mongodb.com/](https://www.mongodb.com/)       |
| CouchDB             | [https://couchdb.apache.org/](https://couchdb.apache.org/) |

| Fondées sur les graphes | Lien officiel                                            |
| ----------------------- | -------------------------------------------------------- |
| Neo4J                   | [https://neo4j.com/](https://neo4j.com/)                 |
| FlockDB                 | [https://dbdb.io/db/flockdb](https://dbdb.io/db/flockdb) |

| Clé / Valeur | Lien officiel                                                              |
| ------------ | -------------------------------------------------------------------------- |
| RocksDB      | [https://rocksdb.org/](https://rocksdb.org/)                               |
| Dynamo       | [https://aws.amazon.com/fr/dynamodb/](https://aws.amazon.com/fr/dynamodb/) |
| Riak         | [https://riak.com/products/](https://riak.com/products/)                   |

| Orientées colonnes | Lien officiel                                                  |
| ------------------ | -------------------------------------------------------------- |
| Cassandra          | [https://cassandra.apache.org/](https://cassandra.apache.org/) |
| ScyllaDB           | [https://www.scylladb.com/](https://www.scylladb.com/)         |
| HBase              | [https://hbase.apache.org/](https://hbase.apache.org/)         |

## Passons à l'installation

```diff
+ Tout ce qui suis c'est pour une utilisation en ligne de commande.
+ A la fin un lien vers un programme bien pratique sera utilisé 
+ pour nous facilité la vie.
```

> A titre pero je suis sur une distribution linux. 
> Je vais me rendre sur la documentation et effectuer les étapes que j'ai à faire.

Une fois mongo installé, on peut saisir ces commandes :

```sh
# Obtenir de l'aide
mongo --help

# Connaître le numéro de version
mongo --version
```

### Lancer le processus MongoDB

Comme il a été dit, nous poouvons lancé le processus MongoDB qui sera exécuter en tâche de fond.

> Les commandes visible dans le tableau ci-dessous seront utilisé essentiellement sur linux.
> référez-vous à la documentation officiel pour tout autre support.

| Commandes                     | Fonctionnement                             |
| ----------------------------- | ------------------------------------------ |
| `sudo service mongod start`   | Permet de démarrer le processus MongoDB.   |
| `sudo service mongod stop`    | Permet de stopper le processus MongoDB.    |
| `sudo service mongod restart` | Permet de rédémarrer le processus MongoDB. |

Une fois le service démarrer, on peut directement lancer le **Shell** de MongoDB

```sh
# Lancer le shell de MongoDB une fois que le processus est actif
mongo
```

```diff
- Le shell ne se lancera pas si le service (processus) n'est pas démarré
```

### Découverte de mongoDB

MongoDB peut avoir plusieurs **databases**, chaque *databases* peut acceuillir plusieurs **collections**. Ces mêmes _collections_ peuvent contenir plusieurs **documents**.

Pour mieux comprendre, c'est une peut comme si nous avions une structure similaire à celle-ci.

```sh
Database_1
|
+--collection_a
|  |
|  +--document_1
|  +--document_2
|
+--collection_b
|  |
|  +--document_1
|  +--document_2
|
Database_2
|
+--collection_a
|  |
|  +--document_1
|  +--document_2
|
+--collection_b
|  |
|  +--document_1
|  +--document_2
|
```

### Créer une database

Pour créer une **database**, la commande **use** sera utilisé... 
Très franchement elle n'est pas très parlante..

```sh
# Création d'une database livres
use livres
```

```diff
+ Si la base de donnée n'existe pas, mongod va la créer dès qu'un document sera ajouté.
```

### Utiliser la database

Pour sélectionner la database, nous allons devoir saisir cette commande :

```sh
# Sélectionner une database
switched to db livres
```

### Création d'un utilisateur local

Celà dit, on sait créer une database, on sait aussi la sélectionner
On va donc sélectionner la database **admin**

```sh
# Au cas où
use admin
```

Puis nous allons créer un utilisateur entre : **pseudo** et **mdp** vous saisirez votre mdp.

```sh
db.createUser({
  user: "Zyrass",
  pwd: "Eronaele",
  roles:["root"]
})
```
> Au cas ou si vous avez fais une erreur, vous pouvez supprimer l'utilisateur avec **dropUser(username)**

### Créer un document

> La création d'une collection se fera lors de l'ajout d'un document.

Exemple ci-dessous avec un de mes livres personnel : 
`HTML 5 - Une référence pour le développeur web`

Je vais ici créer trois collections : 
  - Livres
  - Editeurs
  - Auteurs

```sh
# Création d'une collection livres et d'un document
db.livres.insertOne({
  titre: "HTML5 - Une référence pour le développeur web"
})

# Création d'une collection editeurs et d'un document
db.editeurs.insertOne({
  nom: "Eyrolles"
})

# Création d'une collection auteurs et d'un document
db.auteurs.insertOne({
  nom: "Rimelé",
  prenom: "Rodolphe"
})
```

### Voir les databases/collections existantes

Pour connaître le contenu d'une database ou bien d'une collection, il suffit de saisir une commande simple :

```sh
# Voir le contenu d'une base de donné
show dbs

# voir le contenu d'une collection
show collections
```

### Créer plusieurs documents

> Comme on vient de le voir, pour créer un document on utilisera **insertOne()**.
> En revanche nous allons voir ici comment créer plusieurs documents.
> On utilisera **insertMany()**

Exemple visuel :

```sh
# Création de 2 documents dans la collection livres
db.livres.insertMany([
  {
    titre: "CSS3 - Pratique du design web"
  },
  {
    titre: "jQuery / Ajax avec PHP - 44 ateliers pour maîtriser jQuery"
  }
])
```

## Méthodes pour lire le contenu d'une collection

Ajouter du contenu c'est la base, mais voir ce qu'il y a c'est aussi bien.
Pour celà on va utiliser la méthode **find()** sans paramètre.

```sh
# Lire toute la collections livres
db.livres.find()

# Lire toute la collection editeurs
db.livres.find()

# Lire toute la collection auteurs
db.livres.find()
```

> Nous pouvons visualiser le contenu avec plus d'un document plus proprement avec la méthode **pretty()** qui sera déclenché à la toute fin. Ainsi le code précédent dans la collection **livres** donnerai :

```sh
# Affichage différent mais contenu identique
db.livres.find().prettier()
```

En paramètre de la méthode **find()**, nous pouvons spécifier des conditions pour retrouver un élément spécifique. Toujous avec la collection **livres**, nous allons tester.. _Juste pour en savoir plus, il faudra se rendre dans le cours écrit proposé par Dyma **Chapitre 11 Leçon 5_.

```sh
# Lire le contenu avec une condition spécifique
db.livres.find({ title: "CSS3 - Pratique du design web" })
```

### Les opérateurs de requêtes

1. Les opérateurs de comparaisons

| Nom      | Description                                       |
| -------- | ------------------------------------------------- |
| **$gt**  | **Supérieur**                                     |
| **$gte** | **Supérieur** ou **égales**                       |
| **$lt**  | **Inférieur**                                     |
| **$lte** | **Inférieur** ou **égales**                       |
| **$in**  | **Est** dans le tableau passé à l'opérateur       |
| **$nin** | **N'est pas** dans le tableau passé à l'opérateur |
| **$ne**  | **N'est pas égale** à la valeur spécifié          |

2. Les opérateur logiques

| Nom      | Description                                                                       |
| -------- | --------------------------------------------------------------------------------- |
| **$and** | **Match** avec les conditions passé dans un tableau                               |
| **$or**  | **Match** avec l'une des conditions passé dans un tableau                         |
| **$nor** | **Match** avec les valeurs qui ne respectent pas toutes les conditions du tableau |
| **$not** | **Retourne des valeurs** qui ne sont pas matchées par une condition               |

3. Les opérateurs sur un champ

| Nom         | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| **$exists** | **Match** les valeurs qui respectent les conditions            |
| **$type**   | **Match** les valeurs qui respectent une conditions spécifiées |

4. Les opérateurs d'évaluation

| Nom        | Description                                            |
| ---------- | ------------------------------------------------------ |
| **$regex** | **sélectionne** les documents correspondant à la régex |
| **$text**  | Permet de faire des recherches textuelles              |

> Il en existe d'autres mais c'est pour une utilisation avancé.

5. Les opérateurs pour les tableaux

| Nom       | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| **$all**  | **Match** les tableaux qui contiennent tous les valeurs spécifiées |
| **$size** | **Sélectionne** les documents dont la taille correspond.           |

> Egalement d'autres existe

```diff
- Des exemples sont dispnible sur la plateforme de Dyma.
- Je ne les indiques pas là vu que j'ai encore du mal.
```

## Découverte des requêtes de mise à jour

On a déjà vu comment **créer** (create), **lire** (read) des données, passons à la **mise à jour** (update).

```sh
# La syntaxe se représente ainsi
db.nomDeLaCollection.updateOne( filtre, miseAjour, options )
```

- Le **filtre** permet simplement de sélectionner le document à mettre à jour
- **miseAjour** correspond à ce que l'on va mettre à jour..
- **options** permettent par exemple de créer un fichier si celui-ci n'existe pas

Exemple avec l'ajout d'un autre livre que j'ai en ajoutant l'option **upsert** pour créer le document sachant qu'il n'existe pas.

```sh
# Mise à jour d'un livre qui n'existe pas, alors il sera créer.
db.livres.updateOne( {titre: "php 7 avancé"}, {$rename: {titre: "PHP 7 - avancé"}}, {upsert: true} )
```

### Les principaux opérateurs de mise à jour

1. Pour les champs

| Nom         | Description                                              |
| ----------- | -------------------------------------------------------- |
| **$inc**    | **Incrémente** la valeur du champ                        |
| **$mul**    | **Multiplie** la valeur du champ par la valeur spécifiée |
| **$rename** | Permet de **renommer** un champ                          |
| **$set**    | Permet de définir la valeur d'un champ                   |
| **$unset**  | **Supprime** un champ                                    |

2. Pour les tableaux

| Nom           | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| **$addToSet** | **Ajoute** un élément dans un tableau **seulement si il n'existe pas**        |
| **$pop**      | Permet de **supprimer** le premier élément avec (-1) ou le dernier avec (1)   |
| **$pull**     | **Supprime** les élément d'un tableau qui respecte un ou plusieurs conditions |
| **$push**     | **Ajoute** l'élément spécifié à un tableau                                    |

> Quelques éléments existe et qui ne sont pas noté ici. (Voir le cours écrit)

```diff
- Voir les exemples proposé sur DYMA, ils sont encore un peu complexe à mon niveau
- Même chose pour les mises à jour multiple
```

> Via la documentation officiel j'ai tout de même mis à jour une data que j'avais mal renseigné lors de mes test.

```sh
# Le code que j'ai saisit
db.livres.updateOne(
  {"name" : "jQuery / Ajax avec PHP - 44 ateliers pour maîtriser jQuery"},
  { $set: {"titre" : "jQuery / Ajax avec PHP - 44 ateliers pour maîtriser jQuery"}} 
)
```

La méthode **replaceOne()** permet de remplacer un document par un autre.
Via la méthode **find()** je récupère l'**ID** d'un élément que j'ai inséré par errur en double.
Ainsi donc je vais utiliser cette commande pour remplacer le contenu.

```sh
# Remplacement d'un document
db.livres.replaceOne({title: "PHP 7 - avancé"}, {title: "Javascript pour les Kids - Dès 10 ans"})
```

## Les requêtes de Suppression

On arrive au bout de notre **CRUD**, _create, read, update et **delete**_. Limite on saura presque faire l'essentiel pour afficher modifier supprimer ou lire du contenu.
Le reste c'est des notions extrêmement avancé.

Trois méthodes pour une suppression précises.

1. **deleteOne** supprimera qu'un élément.
2. **deleteMany** supprimera plusieurs éléments.
3. **drop** supprimera la collection complète...

Exemple :

```sh
# Supprimer un élément
db.livres.deleteOne({"titre": "HTML5 - Une référence pour le développeur web"})

# Supprimer tous les éléments
db.livres.deleteMany({})

# Enfin, suppression de la collection complète ainsi que tout son contenu
db.editeurs.drop()
```
## L'outil de Compass de MongoDB

> Comme annoncé au tout début, nous pouvons utiliser **Compass** un outil mit à dispositon de MongoDB, qui nous permettra de réaliser tout ce qui a été fait jusqu'à maintenant via une interface graphique très joliement faite d'ailleurs.

Le lien officiel ce trouve à cette adresse : [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)