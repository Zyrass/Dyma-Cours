# Formation NodeJS

> Ces notes ont été prises pendant mon apprentissage sur Node.JS sur la plateforme de [DYMA.fr](https://dyma.fr) > **En aucun cas ces notes ont pour vocation de voler le travail** réaliser par ces formateurs talentueux, **mais de promouvoir la qualité de leur travail**.
> _Si je suis capable de ré-expliquer des notions c'est que leurs formations vaut très franchement le détour_.

-   Si Mes notes sont satisfaisante et qu'elles vous donne l'envie de vous inscrire sur **Dyma**, je vous propose un lien de parrainage.
-   **_J'insiste qu'il est aucunement obligatoire de suivre mon lien._** :
-   Si vous tenez tout de même à me remercier pour cette prise de note, [cliquez ici pour que je vous parraine](https://dyma.fr/r/5d52bd274e7aec730eb90fde)

## Chapitre 3

### Les évènements

-   1er type évènement systeme (**LIBUV**)
-   2ème type évènement personnalisés - **EventEmitter**

#### Les évènements systèmes avec LIBUV

-   **LIBUV** a été conçu pour Node à partir de librairies existantes. emet des requetes au V8 de chrome.
    > C'est grâce à elle, _qu'elle peut effectuer des opérations non bloquantes pour tout système d'exploitation_.
-   **http-parser** permet de passer les requêtes **HTTP** de manière optimal avec une consommation extrêmement réduite.
-   **openSSl** est très connue et sert pour toutes les opérations de cryptographies.

> Il faut savoir que node n'est pas vraiment fait pour gérer énormément de calculs.

#### Les évènements personnalisés ( EventEmitter )

> Il existe 2 méthodes qui seront constamment utilisé : `EventEmitter.emit(xxx)` qui nous permettra d'émettre un évènement
> et nous avons aussi `EventEmitter.on(xxx, eventHandler)` ou en premier paramètre on pourra sélectionner sur quelle type d'évènement, l'event se déclenchera. Pour le second paramètre, il sagit simplement de la fonction que sera exécuter.

-   Conception d'un fichier fichier **OneEmitter.js**. ( _Majuscule obligatoire au début vue que l'on utilise une Class_ )
-   A l'intérieur de ce fichier on définit une class avec les 2 méthodes qu'on a vu.

```js
// Contenu du fichier : OneEmitter.js
class OneEmitter {
	constructor() {
		this.events = {};
	}

	on(event, listener) {
		// Ici, si this.events[ event ] est undefined alors on assigne un tableau vide.
		this.events[event] = this.events[event] || [];
		this.events[event].push(listener);
	}

	emit(event) {
		// Ici on vérifie la présente d'un event, si c'est le cas on va boucler dessus et tout afficher.
		if (this.events[event]) {
			this.events[event].forEach((currentListener) => listener());
		}
	}
}
```

-   A cet instant on peut très bien tester notre fichier en lui ajoutant plusieurs méthodes **on**.
-   Pour celà dans le même fichier après la classe on saisira ce code.

```js
// ... Code de la class OneEmitter :
const testOneEmitter = new OneEmitter();

// Initialisation d'un premier event - Exemple issu de Dyma.fr
testOneEmitter.on('FILE_READ', () => {
	console.log('Le fichier a bien été lu.');
});

// Initialisation d'un second event
testOneEmitter.on('FILE_READ' () => {
  console.log('Le fichier doit-il être sauvegardé');
});

// Initialisation des event avec la méthode emit
testOneEmitter.emit('FILE_READ');
```

-   Pour tester ce code il faut dans le terminal saisir :

```sh
# Volontairement on utilise pas le script de notre fichier package.json
# vu que nous sommes pas sur le point d'entré mais sur OneEmitter.js
node OneEmitter.js
```
