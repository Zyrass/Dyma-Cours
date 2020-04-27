// APPRENTISSAGE DE CHALK
const chalk = require('chalk');

function formatLogger(tokens, req, res) {
	const status = tokens.status(req, res);
	const statusColor =
		status >= 500
			? 'red'
			: status >= 400
			? 'yellow'
			: status >= 300
			? 'cyan'
			: 'green';
	return `
		[${chalk['blue'](new Date().toLocaleString())}]
		${chalk(tokens.method(req))}
		${chalk(tokens.url(req, res))}
		${chalk[statusColor](status)}
		${chalk(tokens['response-time'](req, res))}ms
	`;
}

// ECRIRE DES LOGS dans un fichier très simplement
const fs = require('fs');
const morgan = require('morgan');

app.use(morgan('combined'));

const writeLogStream = fs.createWriteStream(
	path.join(__dirname, 'logs/errors.log'),
	{ flags: 'a' }
);

app.use(
	morgan('combined', {
		skip: (req, res) => res.statusCode < 400,
		stream: writeLogStream,
	})
);

/* 
	-------------------- Utilisation du - et du . pour décomposer un segment d'URL
	Grâce au - et au . je peux décomposer un seul segement d'une URL en plusieurs paramètres et donc les stocker dans différentes variables.

	EX - AVEC un TIRET :
		// PATH
			/flights/:from-:to 
		// URL de la requête HTTP
			http://localhost:3000/flights/LAX-SFO 
		// objet req.params
			{ "from": "LAX", "to": "SFO" }

	EX - AVEC un POINT :
		// PATH
			/plante/:genre.:espece
		// URL de la requête HTTP
			http://localhost:3000/plante/Prunus.persica
		// objet req.params
			{ "genre": "Prunus", "espece": "persica" }
*/

/* 
	-------------------- Contrôler le type des caractères des paramètres
	On peut utiliser des regex pour contrôler des paramètres.

	EX - avec un nombre avec d+ :
		// PATH
			/user/:userId(d+) 
		// URL de la requête HTTP
			http://localhost:3000/user/42
		// objet req.params
			{"userId": "42"}
*/

/* 
	--------------------------------------------------- Utilisation de app.param()
	La fonction de callback dispose de 2 arguments supplémentaire 
	aux req/res/next. Il s'agit de value et name soit :
	
	(req, res, next, value, name) => {....}
*/

/* Utilisation classique pour récupérer i, utilisateur */
app.params('userid', (req, res, next, userId) => {
	User.find(userId, (err, user) => {
		// requête à la BDD
		if (err) {
			// Erreur de la requête dans la BDD
			next(err);
		} else if (user) {
			// Le user est récupérer
			req.user = user;
			next();
		} else {
			// pas de user pour cet id
			next(new Error("Pas d'utilisateur"));
		}
	});
});
app.get('/user/:userid', (req, res, next) => {
	console.log(req.user);
});

/* Utilisation avec plusieurs paramètres */
app.param(['userid', 'pageid'], function (req, res, next, value, name) {
	next();
});

## DU CODE A COMPRENDRE

```diff
- LE CODE CI-DESSOUS N'AI PAS ENCORE COMPRIS, JE DOIS PRENDRE LE TEMPS DE L'ANALYSER
```

Utilisation du raccourci route. Je peux utiliser le raccourci route et utiliser une fonction de callback avec param lorqu'un paramètre match

```js
const router = express.Router();

router.param('user_id', (req, res, next, id) => {
	User.find(id, (err, user) => {
		// requête à la base de données
		if (err) {
			// erreur de la requête à la base de données
			next(err);
		} else if (user) {
			// le user est récupéré
			req.user = user;
			next();
		} else {
			// pas de user pour cet id
			next(new Error("pas d'utilisateur"));
		}
	});
});

router
	.route('/users/:user_id')
	.all((req, res, next) => {
		// exécutés pour toutes les méthodes HTTP
		next();
	})
	.get((req, res, next) => {
		res.json(req.user);
	})
	.put((req, res, next) => {
		req.user.name = req.params.name; // exemple update du nom
		// sauvegarde en DB
		res.json(req.user); // renvoi du user mis à jour
	})
	.post((req, res, next) => {
		// sauvegarde en DB+
		res.json(req.user); // renvoi du user créé
	})
	.delete((req, res, next) => {
		// delete en DB
		res.sendStatus(200); // si le delete s'est bien passé
	});
```
