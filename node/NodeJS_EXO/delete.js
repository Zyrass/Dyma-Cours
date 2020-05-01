const colors = require('colors');
const fs = require('fs');

// Méthode pour supprimer tous les dossiers/fichiers.
removeAll = () => {
	if (fs.existsSync('./languages')) {
		fs.rmdirSync('./languages', { recursive: true }, (error) => {
			if (error) throw error;
		});
		console.log(
			`Suppression réalisé avec succès! le répertoire `.red +
				'"languages/" '.cyan +
				'à bien été détruit avec tout son contenu.'.red
		);
	} else {
		console.log(
			"Actuellement, le dossier languages n'existe pas, veuillez exécuter la commande :"
				.grey,
			'npm run create'.green
		);
	}
};

removeAll();
