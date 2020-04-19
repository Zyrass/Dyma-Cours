const colors = require('colors');
const fs = require('fs');

// contenu des fichiers à ajouter aux fichier existant mais vide.
const descriptionLanguages = {
	languages: {
		html:
			'Le HyperText Markup Language, généralement abrégé HTML ou dans sa dernière version HTML5, est le langage de balisage conçu pour représenter les pages web. ',
		css:
			"Les feuilles de style en cascade, généralement appelées CSS de l'anglais Cascading Style Sheets, forment un langage informatique qui décrit la présentation des documents HTML et XML ",
		javascript:
			"JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l'utilisation de Node.js",
		node:
			"Node.js est une plateforme logicielle libre en JavaScript orientée vers les applications réseau événementielles hautement concurrentes qui doivent pouvoir monter en charge. Elle utilise la machine virtuelle V8, la librairie libuv pour sa boucle d'évènements, et implémente sous licence MIT les spécifications CommonJS.",
		express:
			"Express.js est un framework pour construire des applications web basées sur Node.js. C'est de fait le framework standard pour le développement de serveur en Node.js",
		mongodb:
			"MongoDB est un système de gestion de base de données orienté documents, répartissable sur un nombre quelconque d'ordinateurs et ne nécessitant pas de schéma prédéfini des données. Il est écrit en C++",
		mongoose:
			"Mongoose est un module Node.js qui s'installe avec NPM (Node Package Manager).",
		angular:
			"Angular est un cadriciel côté client, open source, basé sur TypeScript, et co-dirigé par l'équipe du projet « Angular » à Google et par une communauté de particuliers et de sociétés. Angular est une réécriture complète de AngularJS, cadriciel construit par la même équipe.",
		react:
			"React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état.",
		vuejs:
			"Vue.js, est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web monopages. Vue a été créé par Evan You et est maintenu par lui et le reste des membres actifs de l'équipe principale travaillant sur le projet et son écosystème.",
		git:
			"Git est un logiciel de gestion de versions décentralisé. C'est un logiciel libre créé par Linus Torvalds, auteur du noyau Linux, et distribué selon les termes de la licence publique générale GNU version 2",
		flutter:
			'Flutter est un framework de développement mobile multiplateformes réactif utilisant le langage Dart. Il est utilisé pour développer des applications pour Android, iOS, Windows, Mac, Linux, Google Fuchsia. Flutter est un kit de développement logiciel open source créé par Google.',
	},
};

for (let [language, content] of Object.entries(
	descriptionLanguages.languages
)) {
	const buffer = Buffer.from(content);

	fs.appendFile(
		`./languages/${language}/DYMA-${language}.txt`,
		buffer,
		(error) => {
			if (error) throw error;
			console.log(
				'Le fichier : '.grey,
				`DYMA-${language}.txt`.blue,
				'à bien été mis à jour!'.grey
			);
		}
	);
}

/**
 * Code de Zenz
 * -----------------------------------------------------------------------------
 * for (const language in descriptionLanguages.languages) {
 * 		const buffer = Buffer.from(descriptionLanguages.languages[language]);
 * 		fs.appendFile(`./languages/${language}/DYMA-${language}`, buffer, (err) => {
 * 				if (err) throw err;
 * 		});
 * }
 * -----------------------------------------------------------------------------
 **/
