# Formation NodeJS

> Ces notes ont été prises pendant mon apprentissage sur Node.JS sur la plateforme de [DYMA.fr](https://dyma.fr) > **En aucun cas ces notes ont pour vocation de voler le travail** réalisé par ces formateurs talentueux, **mais de promouvoir la qualité de leur travail**.
> _Si je suis capable de ré-expliquer des notions c'est que leurs formations vaut très franchement le détour_.

-   Si Mes notes sont satisfaisante et qu'elles vous donne l'envie de vous inscrire sur **Dyma**, je vous propose un lien de parrainage.
-   **_J'insiste qu'il est aucunement obligatoire de suivre mon lien._** :
-   Si vous tenez tout de même à me remercier pour cette prise de note, [cliquez ici pour que je vous parraine](https://dyma.fr/r/5d52bd274e7aec730eb90fde)

## Chapitre 4

### Découverte du module FS

> FS veut dire **File System**, il fait partie des modules natif de Node.js.
> Il va nous permettre de manipuler des fichiers. (Lire, écrire etc...)

-   [Voir la doc officiel](https://nodejs.org/en/docs/) et cherché **File System**
-   Conception d'une constante fs pour récupérer la librairie FS

```js
const fs = require('fs');
```

#### Les flags utilisés dans FS

-   Dans les flags à venir, il y en a d'autrtes mais j'ai opté pour ceux qui m'intéresse le plus.
-   Si vous le souhaitez, la liste est disponible à cette adresse : [https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_file_system_flags](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_file_system_flags)

| Flag   | Description traduite                                                                                        |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| **a+** | Fichier ouvert pour lecture et ajout. Le fichier est créé s'il n'existe pas.                                |
| **r**  | Fichier ouvert à la lecture. Une exception se produit si le fichier n'existe pas.                           |
| **r+** | Fichier ouvert en lecture et en écriture. Une exception se produit si le fichier n'existe pas.              |
| **w**  | Fichier ouvert pour l'écriture. Le fichier est créé (s'il n'existe pas) ou tronqué (s'il existe).           |
| **w+** | Fichier ouvert en lecture et en écriture. Le fichier est créé (s'il n'existe pas) ou tronqué (s'il existe). |

### Ouvrir / Lire / Fermer et Ecrire un fichier

| Méthodes        | Traduction             | Lien doc                                                                                                                |
| --------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `fs.open()`     | Ouvrir un fichier      | [Lien officiel](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_readfile_path_options_callback)                  |
| `fs.readFile()` | Lire un fichier        | [Lien officiel](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_open_path_flags_mode_callback)                   |
| `fs.close()`    | Fermer un fichier      | [Lien officiel](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_close_fd_callback)                               |
| `fs.write()`    | Ecrire dans un fichier | [Lien officiel](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback) |

1. Ouverture d'un fichier avec le flag **a+**
2. Fermeture du **File descriptor** pour éviter une fuite mémoire.

> fd - file descriptor est un paramètre du callback de la méthode fs.open()

```js
const fs = require('fs ');

// 1 - Ouverture ...
fs.open('./test/a+.txt', 'a+', (err, fd) => {
	if (err) throw err;
	console.log(fd);

	// 2 - Fermeture ...
	fs.close(fd, (err) => {});
});
```

> Sur la formation officiel, ils parlent des méthode **Synchrone**. Perso, je n'en parle pas ici vu qu'elle sont bloquante.
> Elles sont du moins à connaître et de toutes manières, elles se reconnaissent très facilement, elles sont estampiller du mot clé **Sync**.

### Le binaire, l'encodage et les méthodes read et write

```js
fs.open('./test/write.txt', 'a+', (err, fd) => {
	if (err) throw err;
	console.log(fd);

	// Ecrire dans un fichier avec la méthode .write()
	fs.write(fd, "Bonjour j'apprends Node sur DYMA.fr", (err, written, str) => {
		console.log({
			Error: err,
			nb_bytes: written,
			message: str,
		});
		fs.close(fd, () => {
			console.log('Fermeture de write.txt');
		});
	});

	/**
	 * Pour lire un fichier il faut créer un buffer.
	 * De préférence avoir plusieurs petit buffer nous permettrons d'accéder
	 * plus rapidement à l'information
	 *
	 * Buffer.from() ----> Créer un buffer à partir d'une chaine de caractère
	 * Une fois le buffer créer on va devoir utiliser la méthode read pour lire notre fichier
	 **/
	const buffer = new Buffer.from(new ArrayBuffer(8), 'utf-8');

	/**
	 * Lire le fichier avec la méthode .read(). La syntaxe est décrite comme ça :
	 * fs.read( fd, buffer_convert_binary, offset_start, how_many_characters, where_start, callback );
	 **/
	fs.read(fd, buffer, 0, 8, 0, (err, bytesRead, buffer) => {
		console.log({
			err,
			bytesRead,
			buffer,
		});

		// buffer.toString() permet de convertir l'hexadécimal en chaine de caractère
		const content = buffer.toString();

		console.log({ err, bytesRead, buffer, content });

		fs.close(fd, (err) => {});
	});
});
```

> A savoir, si le fichier et trop gros alors qu'il nous faut juste rajouter
> quelques lignes alors on préfèrera utiliser : write()

`fs.write( fd, buffer, offset, length, position, callback );`

| Paramètres | Descriptions                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| `buffer`   | Buffer                                                                                                 |
| `offset`   | Spécifie le nombre d'octets, on saute sur le buffer pour écarter un ou pluseiurs octets avant d'écrire |
| `length`   | nombre d'octet à écrire.                                                                               |
| `position` | est le nombre d'octets dans le fichier à partir duquel vous souhaitez écrire.                          |
| `callback` | reçoit en argument ( err, bytesWritten, buffer )                                                       |

```js
// EXEMPLE DEMO DYMA
const fs = require('fs');

fs.open('./test.txt', 'w', (err, fd) => {
	if (err) throw err;
	const buf1 = Buffer.from('Je test plusieurs data');

	fs.write(fd, buf1, (err, written, buffer) => {
		if (err) throw err;
		console.log(err, written, buffer);

		fs.close(fd, () => {
			console.log('Done');
		});
	});
});
```

`fs.read( fd, buffer, offset, length, position, callback );`

| Paramètres | Description                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `buffer`   | Cette fois, Buffer est là où les données seront écrites après la lecture.     |
| `offset`   | Spécifie le nombre d'octets que l'on saute avant d'écrire sur le buffer .     |
| `length`   | nombre d'octet à écrire.                                                      |
| `position` | est le nombre d'octets dans le fichier à partir duquel vous souhaitez écrire. |
| `callback` | reçoit en argument ( err, bytesWritten, buffer )                              |

```js
// Exemple de la méthode read() sur DYMA
const fs = require('fs');

fs.open('./test.txt', 'r', (err, fd) => {
	if (err) throw err;

	const buf1 = Buffer.alloc(5);

	fs.read(fd, buf1, 0, 5, 0, (err, bytesRead, buffer) => {
		if (err) throw err;
		console.log(err, bytesRead, buffer);
		console.log(buffer.toString());

		fs.close(fd, () => {
			console.log('Done');
		});
	});
});
```

```js
/*
  ICI FAUT REVOIR LE CODE POUR CREER UNE BOUCLE AFIN DE LIRE LE FICHIER INTEGRALEMENT SELON LE NOMBRE DE BYTES GENERER

    // Lire tout un fichier
    const buffer = new Buffer.from( new ArrayBuffer(8), 'utf-8' );
    let contentToString = '';
    let contentJSON 	= '';

    fs.read( fd, buffer, 0, 8, 0 ( err, bytesRead, buffer ) => {
    	contentToString += buffer.toString();
    	contentJSON 	+= butter.toJSON();
    	console.log( { err, bytesRead, buffer } );

    	fs.read( fd, buffer, 0, 8, 8 ( err, bytesRead, buffer ) => {
    		contentToString += buffer.toString();
    		contentJSON 	+= buffer.toJSON();
    		console.log( { err, bytesRead, buffer, contentToString, contentJSON } );
    		fs.close( fd, ( err ) => {} );
    	}
    }

})
*/
```

### Les méthodes writeFile, appendFile, readFile et unlink

| Ordre logique     | Description de la tâche                                                     |
| ----------------- | --------------------------------------------------------------------------- |
| `fs.writeFile()`  | Créer un fichier avec du contenu.                                           |
| `fs.appendFile()` | Ajoute à la suite de ce fichier du contenu.                                 |
| `fs.readFile()`   | Permet de lire le contenu d'un fichier.                                     |
| `fs.unlink()`     | Supprime le fichier. **J'aurais un fichier à par pour éviter tout conflit** |

> Pour la bonne compréhension de ces 4 méthodes, nous allons créer/utiliser un fichier appelé **lorem.txt**.
> Ce fichier sera créer dans un répertoire appelé **test**
> Pour l'utilisation de la dernière méthode, à la racine nous allons créer un fichier javascript appelé **delete.js**
> On aura plus qu'à alterner entre 2 commandes : _Une pour **créer**, **modifier**, **lire** le fichier_ et l'autre _Pour **supprimer** le fichier_

1.  Contenu du fichier que l'on va créer avec la méthode **fs.writeFile()**.

```sh
"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
```

2.  Contenu que l'on va rajouter au fichier précédemment créé, avec la méthode **fs.appendFile()**

```sh
" Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
```

3. Nous allons lire le fichier qu'on aura précédemment modifié avec la méthode **fs.readFile()**
4. On exécutera la seconde commande pour exécuter la suppression de notre fichier.

#### Etape 1 - Création du fichier avec la méthode fs.writeFile()

-   Avant tout Nous allons stocker le contenu du fichier de base dans une constante appelé **buffer**, en effet la méthode fs.**writeFile()** retournera un buffer encoder en **utf-8**. _On utilisera la méthode **.toString()** pour convertir le fichier_.

```js
const fs = require('fs');

/**
 * ---------------------------------------------------------------------------
 * ETAPE 1
 * ---------------------------------------------------------------------------
 * - Conception du contenu qui sera un buffer
 * - writeFile() - Permet de créer et d'écrire un fichier.
 **/

//
const buffer = Buffer.from(
	"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
);

fs.writeFile('./test/lorem.txt', buffer, (error) => {
	if (error) throw error;
	console.log({
		writeFileBuffer: buffer,
		writeFileContent: buffer.toString(),
	});
});

/**
 * ---------------------------------------------------------------------------
 * ETAPE 2
 * ---------------------------------------------------------------------------
 * - Voir l'étape 2
 **/

/**
 * ---------------------------------------------------------------------------
 * ETAPE 3
 * ---------------------------------------------------------------------------
 * - Voir l'étape 3
 **/

/**
 * ---------------------------------------------------------------------------
 * ETAPE 4
 * ---------------------------------------------------------------------------
 * - Voir l'étape 4
 **/
```

#### Etape 2 - Modification du fichier avec la méthode fs.appendFile()

-   La méthode : **.appendFile()** va nous permettre d'ajouter à la suite du document de la **data** qui **ne sera pas un buffer**.

```diff
- /!\ Attention, cette méthode ne retournera rien, mais elle aura été exécuter !! /!\
```

```js
/**
 * ---------------------------------------------------------------------------
 * ETAPE 2
 * ---------------------------------------------------------------------------
 * - Je pourrais me passer d'une constante mais pour une meilleure lisibilité
 *   j'ai opté pour cette écriture.
 **/

const newData =
	" Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.";

fs.appendFile('./test/lorem.txt', newData, (err) => {
	if (err) throw err;
});

/**
 * ---------------------------------------------------------------------------
 * ETAPE 3
 * ---------------------------------------------------------------------------
 * - Voir l'étape 3
 **/

/**
 * ---------------------------------------------------------------------------
 * ETAPE 4
 * ---------------------------------------------------------------------------
 * - Voir l'étape 4
 **/
```

#### Etape 3 - Lecture du fichier avec la méthode fs.readFile()

-   La méthode : **.readFile()** est extrêmement simple d'utilisation. Celle-ci retournera un **buffer** mais on le convertira à nouveau avec la méthode **.toString()**

> A la différence de la méthode **read()**, ici le fichier sera intégralement lu
> au détriment de votre **RAM (mémoire vive)**.

```js
/**
 * ---------------------------------------------------------------------------
 * ETAPE 3
 * ---------------------------------------------------------------------------
 * - Le paramètre utf-8 est facultatif, il est utilisé pour définir l'encodage
 * - Le contenu de la data sera un simple buffer
 * - On va à nouveau utiliser toString() pour convertir le buffer.
 **/
fs.readFile('./test/lorem.txt', 'utf8', (err, data) => {
	if (err) throw err;
	console.log({
		readFileBuffer: data,
		readFileContent: data.toString(),
	});
});

/**
 * ---------------------------------------------------------------------------
 * ETAPE 4
 * ---------------------------------------------------------------------------
 * - Voir l'étape 4
 **/
```

#### Etape 4 - Suppression du fichier

```diff
- /!\ Il ne faut en aucun cas créer ce fichier dans le même fichier à moins de le commenter,
- /!\ sinon, vous ne retourner rien, le fichier sera créé/modifié/lu... et supprimé dans la foulée.
- /!\ La meilleure des options étant pour moi de créer un fichier à part afin d'obtenir un distinction
- /!\ propre de ce que l'on fait.
```

> Ci-dessous le code de l'étape 4

```js
const fs = require('fs');

/**
 * ---------------------------------------------------------------------------
 * ETAPE 4
 * ---------------------------------------------------------------------------
 * - Radical, ne retourne rien...
 * - Mais la suppression se fait sans confirmation
 **/
fs.unlink('./test/lorem.txt', (err) => {
	if (err) throw err;
});
```

### Les méthodes pour gérer les répertoires

```js
const fs = require( 'fs' );

// méthode pour Création d'un dossier + sous dossier
fs.mkdir( './dossier/sous-dossier', ( err ) => {
 	console.log( err );
} // Error

// Provoquera une erreur, vu qu'on a pas de dossier créer précédemment.
// Sauf si... on ajoute une option : { recursive : true } soit :
fs.mkdir( './dossier/sous-dossier', { recursive : true }, ( err ) => {
 	console.log( err );
} // OK

// Pour concevoir un un simple dossier sans option.
fs.mkdir('./mondossier', (err) => {});

// Méthode pour Accéder aux dossiers, avec imaginons qu'on a 2 fichiers text dedans...
fs.readdir('./mondossier', (err) => {}); // Affichera ['fichier1.txt', 'fichier2.txt',]

// Méthode pour Supprimer un dossier
fs.rmdir('./dossier/sous-dossier', (err) => {});
```

### Les méthodes stats et copyFile

```js
// copyFile() - Permet de copier des fichier
fs.copyFile('./fichier.txt', './fichiercopy.txt', (err) => {});

// stat() - Permet d'afficher un bon nombre d'information.
fs.stat( './fichier.txt', ( err ) => {
  console.log( { err, stats } );
}
```
