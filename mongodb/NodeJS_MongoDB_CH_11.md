# Formation NodeJS

> Le chapitre 10 n'existe pas, il s'agit d'un projet guidé disponible sur DYMA.

## Chapitre - 11 - MongoDB

### Qu'est ce que MongoDB ?

C'est un **service** (_souvent appelé **processus**_) que l'on va utilisé et qui tournera en tâche de fond (_arrière-plan_). Lorsqu'on aura besoin d'interagir avec MongoDB, celui-ci sera déjà disponible et nous pourrons exécuter tout un tas de commande selon nos besoins.

MongoDB utilise le **NOSQL** qui est beaucoup plus flexibles. Avec **MySQL** une fois une structure définit, _il est assez fastidieux de changer cette dernière_. Avec le **NOSQL** c'est une toute autre histoire, un quelconque changement se fait très simplement.

#### Pourquoi utiliser MongoDB ?

> Avant tout, je veux me former à la stack : **M.E.R.N** puis **M.E.V.N** et enfin **M.E.A.N**.
> Pour celà, je dois apprendre **MongoDB**, **Express**, **React** et **Node**.
> Ma ça reste ma démarche personnel.

Je dirais que dans un premier temps, pour un développeur **fullstack JavaScript**, l'avantage d'utiliser MongoDB est que le format utilisé est très ressemblant au **JSON**, son nom : le **BSON**.
Avec par exemple le **MySQL**, il faut apprendre une toute autre syntaxe... (_qui n'est pas si compliqué que ça_).
Grâce au **BSON**, nous n'avons pas besoin de tergiverser côté **javascript**. L'utilisation du JSON est très simple.

Le second point positif, j'en ai également parlé avant, il est inutile de passer des jours où des heures pour modéliser une structure de donnée.

Pour finir la documentation est agréable à lire. La présentation quant à elle, est disponible en français !!

[Lien de la présentation officiel en français](https://www.mongodb.com/fr)

#### Les BDD existantes en NoSQL

```diff
- Ce qui suit, je n'en connais aucune, du moins, j'apprends ici mongoDB.
+ C'est juste par pur information.
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

### Passons à l'installation

```diff
+ Tout ce qui suis c'est pour une utilisation en ligne de commande.
+ A la fin un lien vers un programme bien pratique sera utilisé (Compass).
```

> J'utilise, une distribution linux (ubuntu), donc je vais vais me rendre sur la documentation
> et effectuer les étapes que j'ai à faire.
> Je vous invite à lire la documentation et suivre ce qu'elle vous propose pour votre système d'exploitation.

Une fois mongo installé sur son ordinateur, on peut saisir ces commandes :

```sh
# Obtenir de l'aide
mongo --help

# Connaître le numéro de version
mongo --version
```

#### Lancer le processus MongoDB

Comme il a été dit, nous pouvons lancer le service MongoDB qui sera exécuter en tâche de fond.

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
- Le shell ne se lancera pas si le service (processus) n'est lui pas démarré ?
```

### Création d'un utilisateur local

Avant toute chose, on va créer un utilisateur qui aura des droits de type "**admin**".
Nous allons devoir sélectionner la database **admin**. (Créé par défaut)

```sh
# Sélection de la database admin
use admin
```

-   Puis nous allons créer un utilisateur entre : **pseudo** et **mdp** vous saisirez votre mdp.

```sh
db.createUser({ user: "pseudo", pwd: "password", roles:["root"] })
```

> Au cas ou si vous avez fais une erreur, vous pouvez supprimer l'utilisateur avec cette commande :

```sh
# Supprimer un utilisateur
db.dropUser("nom_utilisateur")
```

### Zut, j'ai oublié le mot de passe...

> Pas de panique, nous pouvons lister les utilisateurs existants :
> Puis nous pourrons changer de mot de passe sans avoir à spécifier le mot de passe utilisé auparavant.

```sh
# Connaître la liste des utilisateurs
db.getUsers()

# Changé son mot de passe via un prompt
db.changeUserPassword("pseudo_a_changer", passwordPrompt())

# Changé son mot de passe directement
db.changeUserPassword("pseudo_a_changer", "azertyuiop")
```

#### Découverte de mongoDB

-   MongoDB peut avoir plusieurs **databases**,
-   Chaque _databases_ peut acceuillir plusieurs **collections**.
-   Ces mêmes _collections_ peuvent contenir plusieurs **documents**.

Pour mieux comprendre, c'est une peut comme si nous avions une structure similaire à celle-ci.

```sh
Database_1
|
+--collection_a
|  |
|  +--document_1
|  +--document_2
|  +--document_3
|
+--collection_b
|  |
|  +--document_1
|
Database_2
|
+--collection_a
|  |
|  +--document_1
|
+--collection_b
|  |
|  +--document_1
|  +--document_2
|
```

#### Créer/Sélectionner une database

Pour créer ou bien même sélectionner une **database**, la commande **use** sera utilisé...
Très franchement, elle n'est pas très explicite côté création... (_ça reste mon avis_)

```sh
# Création d'une database livres (Celles-ci n'existe pas)
use livres

# Sélection de la database admin
use admin
```

```diff
+ Si la base de donnée n'existe pas, mongod va la créer dès qu'un document sera ajouté.
+ Il en profitera pour switcher sur cette dernière.
```

#### Créer une collection

Pour la création d'une collection, la commande est assez simple à comprendre.

```sh
# Création d'une collection
db.createCollection("users")
```

> Des options existe en second paramètres,
> veuillez vous référé à la documentation officiel ou bien le cours sur dyma traite assez bien du sujet.

#### Voir les collections existantes

On saisira cette commande pour voir quelles sont les collections existante.
Si rien ne s'affiche, c'est que la collection est actuellement vide.

```sh
# voir les collections
db.getCollectionNames()
```

#### Créer un document

Pour cette étape rien de tel qu'un exemple à proprement parlé pour voir l'insertion.

Exemple ci-dessous avec des livres que j'ai en ma possession :

> Je vais ici créer trois collections :
> 1 - books
> 2 - editors
> 3 - authors

```sh
# 0 - On s'assure d'avoir bien la database "livres" de sélectionné
use.livres

# 1 - Création d'un document dans la collection "books".
# 1 bis - La collection books n'existant pas, elle sera automatiquement créée.
db.books.insertOne({
  titre: "HTML5 - Une référence pour le développeur web"
})

# 2 - Création d'une collection "editors" et d'un document
db.editors.insertOne({
  nom: "Eyrolles"
})

# Création d'une collection "authors" et d'un document
db.authors.insertOne({
  nom: "Rimelé",
  prenom: "Rodolphe"
})
```

#### Voir les databases/collections existantes

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
# Création de 2 documents dans la collection books
db.books.insertMany([
  {
    titre: "CSS3 - Pratique du design web"
  },
  {
    titre: "jQuery / Ajax avec PHP - 44 ateliers pour maîtriser jQuery"
  }
])
```

#### Méthodes pour lire le contenu d'une collection

Ajouter du contenu c'est la base, mais voir ce qu'il y a c'est aussi bien.
Pour celà on va utiliser la méthode **find()** sans paramètre.

```sh
# Lire toute la collections books
db.books.find()

# Lire toute la collection editors
db.editors.find()

# Lire toute la collection authors
db.authors.find()
```

> Nous pouvons visualiser le contenu avec plus d'un document plus proprement avec la méthode **pretty()**.
> Cette méthode sera déclenché à la toute fin.
> Ainsi le code précédent dans la collection **books** donnerai :

```sh
# Affichage normal
db.books.find()

# Affichage différent mais contenu identique
db.books.find().prettier()
```

En paramètre de la méthode **find()**, nous pouvons spécifier des conditions pour retrouver un élément spécifique.
Toujous étant qu'avec la collection **books**, nous allons voir quelques testes..
_Juste pour en savoir plus, il faudra se rendre dans le cours écrit proposé par Dyma \*\*Chapitre 11 Leçon 5_.

```sh
# Lire le contenu avec une condition spécifique
db.books.find({ title: "CSS3 - Pratique du design web" })
```

### Les opérateurs de requêtes

1. Les opérateurs de comparaisons

| Nom       | Description                                       |
| --------- | ------------------------------------------------- |
| **\$gt**  | **Supérieur**                                     |
| **\$gte** | **Supérieur** ou **égales**                       |
| **\$lt**  | **Inférieur**                                     |
| **\$lte** | **Inférieur** ou **égales**                       |
| **\$in**  | **Est** dans le tableau passé à l'opérateur       |
| **\$nin** | **N'est pas** dans le tableau passé à l'opérateur |
| **\$ne**  | **N'est pas égale** à la valeur spécifié          |

2. Les opérateur logiques

| Nom       | Description                                                                       |
| --------- | --------------------------------------------------------------------------------- |
| **\$and** | **Match** avec les conditions passé dans un tableau                               |
| **\$or**  | **Match** avec l'une des conditions passé dans un tableau                         |
| **\$nor** | **Match** avec les valeurs qui ne respectent pas toutes les conditions du tableau |
| **\$not** | **Retourne des valeurs** qui ne sont pas matchées par une condition               |

3. Les opérateurs sur un champ

| Nom          | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| **\$exists** | **Match** les valeurs qui respectent les conditions            |
| **\$type**   | **Match** les valeurs qui respectent une conditions spécifiées |

4. Les opérateurs d'évaluation

| Nom         | Description                                            |
| ----------- | ------------------------------------------------------ |
| **\$regex** | **sélectionne** les documents correspondant à la régex |
| **\$text**  | Permet de faire des recherches textuelles              |

> Il en existe d'autres mais c'est pour une utilisation avancé.

5. Les opérateurs pour les tableaux

| Nom        | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| **\$all**  | **Match** les tableaux qui contiennent tous les valeurs spécifiées |
| **\$size** | **Sélectionne** les documents dont la taille correspond.           |

> Egalement d'autres existe

```diff
- Des exemples sont dispnible sur la plateforme de Dyma.
- Je ne les indiques pas là vu que j'ai encore du mal avec la syntaxe.
```

### Découverte des requêtes de mise à jour

On a déjà vu comment **créer** (create), **lire** (read) des données, passons à la **mise à jour** (update).

```sh
# La syntaxe se représente ainsi
db.nomDeLaCollection.updateOne( filtre, miseAjour, options )
```

-   Le **filtre** permet simplement de sélectionner le document à mettre à jour
-   **miseAjour** correspond à ce que l'on va mettre à jour.. (**Important :** ne pas oublier **set**)
-   **options** permettent par exemple de créer un fichier si celui-ci n'existe pas

Exemple avec l'ajout d'un autre livre que j'ai en ajoutant l'option **upsert** pour créer le document sachant qu'il n'existe pas.

```sh
# Mise à jour d'un livre qui n'existe pas, alors il sera automatiquement créé..
db.books.updateOne( {titre: "php 7 avancé"}, {$rename: {titre: "PHP 7 - avancé"}}, {upsert: true} )
```

### Les principaux opérateurs de mise à jour

1. Pour les champs

| Nom          | Description                                              |
| ------------ | -------------------------------------------------------- |
| **\$inc**    | **Incrémente** la valeur du champ                        |
| **\$mul**    | **Multiplie** la valeur du champ par la valeur spécifiée |
| **\$rename** | Permet de **renommer** un champ                          |
| **\$set**    | Permet de définir la valeur d'un champ                   |
| **\$unset**  | **Supprime** un champ                                    |

2. Pour les tableaux

| Nom            | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| **\$addToSet** | **Ajoute** un élément dans un tableau **seulement si il n'existe pas**        |
| **\$pop**      | Permet de **supprimer** le premier élément avec (-1) ou le dernier avec (1)   |
| **\$pull**     | **Supprime** les élément d'un tableau qui respecte un ou plusieurs conditions |
| **\$push**     | **Ajoute** l'élément spécifié à un tableau                                    |

> Quelques éléments existe et ne sont pas noté ici. (Voir le cours écrit)

```diff
- Voir les exemples proposé sur DYMA, ils sont encore un peu complexe à mon niveau
- Même chose pour les mises à jour multiple
```

> Via la documentation officiel j'ai tout de même mis à jour une data que j'avais mal renseigné lors de mes test.

```sh
# Le code que j'ai saisi
db.books.updateOne(
  {"name" : "jQuery / Ajax avec PHP - 44 ateliers pour maîtriser jQuery"},
  { $set: {"titre" : "jQuery / Ajax avec PHP - 44 ateliers pour maîtriser jQuery"}}
)
```

La méthode **replaceOne()** permet de remplacer un document par un autre.
Via la méthode **find()** je récupère l'**title** d'un élément que j'ai inséré par erreur
Ainsi donc je vais utiliser cette commande pour remplacer le contenu.

```sh
# Remplacement d'un document
db.books.replaceOne({title: "PHP 7 - avancé"}, {title: "Javascript pour les Kids - Dès 10 ans"})
```

### Les requêtes de Suppression

On arrive au bout de notre **CRUD** (_create, read, update et **delete**_).
Limite on saura presque faire l'essentiel pour afficher modifier supprimer ou lire du contenu.
Le reste c'est des notions extrêmement avancé.

Trois méthodes pour une suppression précises.

1. **deleteOne** supprimera qu'un élément.
2. **deleteMany** supprimera plusieurs éléments.
3. **drop** supprimera la collection complète...

Exemple :

```sh
# Supprimer un élément
db.books.deleteOne({"titre": "HTML5 - Une référence pour le développeur web"})

# Supprimer tous les éléments
db.books.deleteMany({})

# Enfin, suppression de la collection complète ainsi que tout son contenu
db.editors.drop()
```

### L'outil de Compass de MongoDB

> Comme annoncé au tout début, nous pouvons utiliser **Compass** un outil qui est mit à dispositon de MongoDB, qui nous permettra de réaliser tout ce qui a été fait jusqu'à maintenant via une interface graphique très joliement faite d'ailleurs.

Le lien officiel ce trouve à cette adresse : [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)
