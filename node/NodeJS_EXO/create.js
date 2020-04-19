const colors = require('colors');
const fs = require('fs');

// rappel de l'objet à modéliser en dossier/fichier
const languagesSouhaite = {
	languages: {
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

/**
 * 1. - Au cas où, création du folder principal si celui-ci est supprimer
 * 2. - Création d'une fonction pour modéliser la structure en créant chaque dossier.
 * 3. - Création des fichiers indépendemment de chaque dossier (Le fichier est vide).
 */

// 1. - Au cas où, création du folder principal si celui-ci est supprimer
if (!fs.existsSync('./languages')) {
	fs.mkdir('./languages/', (error) => {
		if (error) throw error;
	});
	console.log(
		'Création du dossier '.grey + '"languages" '.cyan + ' avec succès'.grey
	);
}

console.log('---------------------------------------------------------------');

// 2. - Création d'une fonction pour modéliser la structure en créant chaque dossier.
createSubFolder = (languages) => {
	fs.mkdir(`./languages/${languages}`, (error) => {
		if (error) throw error;
	});
	console.log(
		'Création du sous-dossiers '.grey,
		`${languages}`.cyan,
		' avec succès'.grey
	);
};
Object.keys(languagesSouhaite.languages).map(createSubFolder);

console.log('---------------------------------------------------------------');

// 3. - Création des fichiers (vide)
createFiles = (languages) => {
	const currentBuffer = Buffer.from('');
	fs.writeFile(
		`./languages/${languages}/DYMA-${languages}.txt`,
		currentBuffer,
		(error) => {}
	);
	console.log(
		'Création du fichier : '.grey,
		`DYMA-${languages}.txt`.yellow,
		' avec succès'.grey
	);
};

Object.keys(languagesSouhaite.languages).map(createFiles);

console.log(
	'---------------------------------------------------------------\n'
);
