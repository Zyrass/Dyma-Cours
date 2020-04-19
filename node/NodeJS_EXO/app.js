const colors = require('colors');

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

const technicien = 'Zyrass'; // Ici renseigner votre nom :)

console.log(probleme.blue);
console.log('-------------------------------------------------------------- ');
console.log(langagesSouhaite);
console.log('-------------------------------------------------------------- ');
console.log(`\t ${technicien} sera en charge de résoudre cette tâche`.red);
console.log('-------------------------------------------------------------- ');
