# Exercice pour réviser FS de Node

> Je m'appel, **Alain Guillon** alias **Zyrass**, je n'ai aucune affiliation avec la plateforme de Dyma.
> En revanche, j'ai une très grande admiration pour ce qui a été fait jusqu'à maintenant.
> Pour les remercier, je vous propose à vous chèr(e)s étudient(e)s un exercice pour réviser les quatres premiers chapitre.

## Sommaires

> Certaines étapes risque pour certains de poser quelques soucis. Pour combler tout ça,
> Je vous invite à regarder la formation sur **git**,
> à rechercher par vous même comment **créer un répertoire** en ligne de commande,
> rechercher également comment **se déplacer dans un répertoire** ou bien même comment **créer des fichiers**

```diff
- /!\ Si vous n'avez pas le temps pour apprendre Git, sauter l'étape 2 et 3
- /!\ Git ne posera pas de soucis pour la continuitée de l'exercice.
```

1. Création d'un répertoire en **ligne de commande**, ou **à la main**
2. Initialisation d'un dépôt **git**
3. Ajout d'un **.gitignore** avec pour contenu : `node_modules/`
4. Créer un fichier **package.json**.
5. Ajout de la dépendance **colors** qui est utilisée pour ce projet et qui a été vu en cours.
6. Création du fichier **app.js** (_Notre point d'éntrée ce qui est généralement le cas_)
7. Ajout de quelques **scripts** dans ce fichiers (`create`, `read`, `update`, `delete`)... _Du **C.R.U.D** avec **FS**_
8. Création de l'architechture (réfléchissez où idéalement on placerait ce genre de création)
9. Création des fichiers à la racine du projet :

| Noms des fichiers | Descriptions des fichiers                                                             |
| ----------------- | ------------------------------------------------------------------------------------- |
| **app.js**        | Point d'entrée de l'application, celui-ci nous affichera le problème à faire          |
| **create.js**     | Ce fichier permettra de créer via une fonction tout un tas de dossiers/fichiers       |
| **read.js**       | Ce fichier nous permettra de lire le contenu de ce qui aura été créer dans un tableau |
| **update.js**     | Ce fichier nous permettra de mettre à jour un quelconque fichier                      |
| **delete.js**     | Ce fichier nous permettra de supprimer un fichier                                     |

> **languages** est le nom que j'ai donné au dossier principal. (Celui qui accueillera tous les sous-dossier.

10. Définition du problème à résoudre

-   Pour vous aider à y voir plus claire, j'ai créé un fichier symaptique copier l'intégralité du code dans le fichier **app.js**

```sh
# création du fichier app.js
touch app.js
```

> On pensera à importer le package **colors** qui a été vu dans un des cours.
> Dans le fichier **app.js** on y ajoutera ce code :

#### contenu du fichier app.js

```js
const colors = require('colors');

const technicien = 'Zyrass'; // Ici renseigner votre nom :)

const probleme = `
  Hey, salut jeune padawan !
  
  Dis moi j'ai un véritable problème à résoudre...
  Je sais que tu en es capable, tu es inscris sur DYMA donc tu gères!!
  Mais je me demande si vraiment tu aurais un peu de temps à me consacré!

  En effet, le temps me manque... Bon allez, je m'enfou je t'informe tout de même du problème.
  
  J'ai un client qui m'harcèle pour que je lui créer un dossier qui contiendrait : 
  
    - plusieurs sous-dossiers traitant sur plusieurs langages différents...
    - Dans chacun de ces sous-dossiers, il faudrait qu'il y ait un fichier au format "txt".
    - Ce fichier commencerait obligatoirement par DYMA- et serait préfixer par le langage en question.
    - Dans ce fichier, nous aurions une description du langage. (Cherche sur google te prends pas la tête) 
  
  Bon j'anticipe, je sais que surement il voudra par la suite, mettre à jour son(ces) fichier(s) et donc pour éviter 
  qu'il ne m'emmerde plus que ça, peux-tu me rajouter une possibilitée de mise à jour du fichier.
  
  Ah et aussi tant qu'à faire, si tu pourrais me gérer la suppression ce serait parfait!
  
  Si tu peux me faire ça tout en automatisé se serait top !!
  Comme ça si cet endouille supprime son dossier avec tous son contenu,
  il me suffirait de quelques petites commandes et tout serait réglé en deux-temps trois mouvements.

  Pour te récompenser... bah je t'inviterai au salon de l'érot..... du jouet pardon xD
  
  ps: Je t'ajoute un objet qui t'aideras pour la réalisation du projet`;

/**
 * langages correspond au folder principal
 * les "keys" correspondent aux sous-dossiers
 * les "values" correspondent aux fichiers à créer
 **/
const langagesSouhaite = {
	langages: {
		html: 'DYMA-html.txt',
		css: 'DYMA-css.txt',
		javascript: 'DYMA-javascript.txt',
		node: 'DYMA-node.txt',
		express: 'DYMA-express.txt',
		mongodb: 'DYMA-mongodb.txt',
		mongoose: 'DYMA-mongoose.txt',
		angular: 'DYMA-angular.txt',
		react: 'DYMA-react.txt',
		vuejs: 'DYMA-vuejs.txt',
		git: 'DYMA-git.txt',
		flutter: 'DYMA-flutter.txt',
	},
};

console.log(probleme.yellow);
console.log('-------------------------------------------------------------- ');
console.log(langagesSouhaite);
console.log('-------------------------------------------------------------- ');
console.log(`\t ${technicien} sera en charge de résoudre cette tâche`.red);
console.log('-------------------------------------------------------------- ');
```

```diff
- Il faut savoir qu'il vous faudra allez voir la documentation officiel de node
- Pour ma part j'a utiliser du code qui n'a pas été présenté.
```

1. Par exemple avec la détection d'un dossier si il existe déjà ou non
2. Un listing de tout les répertoires et donc contrôler l'existance de tel ou tel chose.

## Pour les plus téméraires

Une fois que j'aurais ajouté mon code

-   Vous pouvez vous amusez à faire toutes les vérifications possible pour éviter l'affichage de quelques erreurs
-   De plus vous pouvez optimiser le code voir même l'améliorer :D
