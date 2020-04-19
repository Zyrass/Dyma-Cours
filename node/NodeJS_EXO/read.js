const colors = require('colors');
const fs = require('fs');

const languages = [
	'angular',
	'css',
	'express',
	'flutter',
	'git',
	'html',
	'javascript',
	'mongodb',
	'mongoose',
	'node',
	'react',
	'vuejs',
];

readFile = () => {
	if (!fs.existsSync('./languages')) {
		console.log(
			" Actuellement, le dossier languages n'existe pas, veuillez exécuter la commande :"
				.grey,
			'npm run create\n'.green,
			'Ensuite il vous faudra mettre à jours les fichiers avec la commande :'
				.grey,

			'npm run update\n'.green
		);
	} else {
		for (const language of languages) {
			// Lecture des fichiers
			fs.readFile(
				`./languages/${language}/DYMA-${language}.txt`,
				(error, data) => {
					if (error) throw error;
					console.log(`\n  
  ----------------------------------------------------------------------------
  ${language.toUpperCase().yellow} : ${data.toString().grey}
  ----------------------------------------------------------------------------
        `);
				}
			);
		}
	}
};

readFile();
