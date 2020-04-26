# Formation NodeJS

## Chapitre 5 - Serveur Node

### Introduction aux protocoles Web

-   HTTP VS HTTPS : [Site comparant les deux protocoles](https://www.httpvshttps.com/)
-   **HTTPS très franchement plus rapide** que le protocol **HTTP**
-   HTTPS est la combinaison du protocole **HTTP** et du protocole de **chiffrement SSL**

> HTTPS permet au navigateur de vérifier l'identiter du site auquel il accède
> grâce à un certificat d'authentification émis par une autorité tierce, réputée fiable.

1. **Etape 1** - Le client demande une connexion sécurisée au serveur avec une requête HTTPS sur le port 443.

> Si la requête est faite en HTTP alors le serveur la passe en HTTPS automatiquement.

2. **Etape 2** - Le serveur confirme qu'il gère le HTTPS et envoi un certificat (_service payant_).

> Ce certificat permet de garantir l'identité du serveur par rapport au domaine.
> Le certificat contient une clé public utiliséé pour le chiffrement asymétrique

3. **Etape 3** - Le navigateur vérifie auprès de l'autorité de certification que le certificat est bien valide soit authentique, qu'il n'est périmé et bien d'auters choses encore.

4. **Etape 4** - Le navigateur va générer une clé de session et va l'encrypter en utilisant la clé public du serveur.

> Il envoi cette clé de session au serveur que seul lui peut décrypter.

5. **Etape 5** - Le serveur décrypte la clé de session avec sa clé privée. Ensuite grâce à la clé de session qui est mmaintenant
   partagée par le client et le serveur, ils peuvent passer au chiffrement symétrique qui est beaucoup plus
   rapide pour le reste des échanges.

```diff
- A ce moment tout le trafic client/serveur peut maintenant être totalement crypté
- et indéchiffrable sauf par le client ou le serveur.
```

| Protocole | Port associé |
| --------- | ------------ |
| HTTP      | 80           |
| HTTPS     | 443          |
| SSH       | 22           |
| SMTP      | 25           |
| DNS       | 53           |

> **A SAVOIR** : Google à mis au point un meilleur protocol que le **TCP/IP** ou **TCP/UDP**.
> Il s'appel : **QUIC** et donc le prochain protocole HTTP sera la 3ème version et donc **HTTP3** utilisera **QUIC**.

## Créer un serveur HTTP avec Node.js

1.  Pour concevoir un serveur on va utilisé un _module natif_ de Node.js, il se nomme **http**.
2.  On va utiliser une de ces méthodes pour créer notre server, cette méthode s'appelle : **createServer()**.

    -   Cette méthode, prends 2 pramètres : **request** et **response**.
    -   Pour éviter une fuite mémoire, on va devoir couper le socket en invoquant la méthode **end()** du paramètre **response**.

    > Pour rappel le socket est un **flux** de donnée qui transit entre le **client** et le **serveur**.
    > Et donc là, nous coupons cette communication sachant que la réponse à bien été retourné au client (nous).

3.  Utilisation de la méthode : **listen()** du module **http()**.

    -   En paramètre on va lui assigner un port qui sera utilisé lorsqu'on ira sur internet.
    -   Exemple : on définit le port `5000` et donc on saisira : [http://localhost:5000]

        > Il existe un seconde paramètre qui correspond à **l'host**. Par défaut il est sur `0.0.0.0`.

| origine  | Nom courant utilisé par les developpeurs |
| -------- | ---------------------------------------- |
| request  | req                                      |
| response | res                                      |

> J'utiliserai donc **req** et **res**

```js
// Exemple du code présenté précédemment
const http = require('http');
const server = http.createServer((req, res) => {
	console.log('Retour OK');
	res.end();
});

server.listen(5000);
```

```diff
+ Lors de la visite sur l'adresse précédente, le message "Retour OK" s'affichera dans le terminal.
```

#### Si on retourne un event handler

Avec le code ci-dessous, nous obtiendrons exactement le même rendu. (Mais avec un event)

```js
// Le même exemple avec un event
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
	console.log('Retour OK');
	res.end();
});

server.listen(5000);
```

## Les requêtes HTTP

Les headers que l'on peut récuperer via nos requetes HTTP permettent principalement de controler :

-   La mise en cache.
-   L'authentification.
-   La connexion TCP.
-   Le contenu (méthode de compression ou encodage et qu'elle langues sont accepté par le client).
-   Les cookies, les CORS.
-   Le contexte de requete (host, le user-agent (type de navigateur) ).

### req.url

La propriété **url** permet d'accéder à l'URI

> L'**URI** correspond au **PROTOCOLE HTTP** et à l'**URL** en même temps.

```js
// ... du code

server.on('request', (req, res) => {
	console.log('req.url : ', req.url);
	res.end();
});
// du code ...
```

### Afficher du texte à l'écran

Pour pouvoir écrire du contenu, ça va se passer en 3 étapes.

1.  **Etape 1** - On va utiliser la méthode **writeHead()** du paramètre **response**

> Cette méthode prends 2 paramètres. Le premier correspond **au statut** de la requête. (_voir le tableau juste après cette description_). Le second paramètre correspond **aux options** qui nous permettrons de modifier les **headers** (_l'en-tête de la requête_).

| Code d'erreur | Description du statut d'erreur.                                                                                                                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200           | Requête traitée avec succès. La réponse dépendra de la méthode de requête utilisée.                                                                                                                                                                                                                                                        |
| 201           | Requête traitée avec succès et création d’un document.                                                                                                                                                                                                                                                                                     |
| 203           | Information retournée, mais générée par une source non certifiée.                                                                                                                                                                                                                                                                          |
| 400           | La syntaxe de la requête est erronée.                                                                                                                                                                                                                                                                                                      |
| 401           | Une authentification est nécessaire pour accéder à la ressource.                                                                                                                                                                                                                                                                           |
| 402           | Paiement requis pour accéder à la ressource.                                                                                                                                                                                                                                                                                               |
| 403           | Le serveur a compris la requête, mais refuse de l'exécuter. Contrairement à l'erreur 401, s'authentifier ne fera aucune différence. Sur les serveurs où l'authentification est requise, cela signifie généralement que l'authentification a été acceptée mais que les droits d'accès ne permettent pas au client d'accéder à la ressource. |
| 404           | Ressource non trouvée.                                                                                                                                                                                                                                                                                                                     |
| 500           | Erreur interne du serveur.                                                                                                                                                                                                                                                                                                                 |
| 503           | Service temporairement indisponible ou en maintenance.                                                                                                                                                                                                                                                                                     |

2.  **Etape 2** - On va pour l'exemple afficher un contenu dans le navigateur. (Fini la page blanche)
3.  **Etape 3** - Dans la méthode **end()**, nous allons passer en argument la data que l'on souhaite afficher.

-   La syntaxe de la méthode **writeHead()**
    -- `res.writeHead( status, { options } )`
    -- Pour en savoir plus voici le lien officiel de la doc : [Documentation officiel](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)

```js
// Exemple de ce qui a été dis précédemment
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
	res.writeHead(200, 'utf-8', {
		'Content-Type': 'text/plain; charset=utf-8',
	});
	res.end(
		"Hello, j'apprends à créer un serveur avec node.js sur la plateforme de Dyma.fr"
	);
});

server.listen(5000, '0.0.0.0');
```

#### Amusons nous un peu (Exercices pratique)

1. Pour mission vous devez adapter le message avec du HTML.
2. Pour mission vous vous décrivez simplement avec du JSON.

> Le tout faut que ce soit visible à l'écran :P

#### Mon code perso (Peut faire office de correction)

```js
// Version HTML
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/html; charset=utf-8',
	});
	res.end(`
		<!DOCTYPE html>
		<html lang="fr">
			<head>
				<title>Test fichier html</title>			
			</head>
			<body>
				<h1>Fichier HTML</h1>
				<p>Ce message est généré par mon serveur node js.>br />
				Inspecté le code pour voir son contenu</p>
			</body>
		</html>
	`);
});

server.listen(5000, '0.0.0.0');
```

```js
// Version JSON
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json; charset=utf-8',
	});
	res.end(
		JSON.stringify({
			firstname: 'Alain',
			lastname: 'Guillon',
			age: 36,
			children: 3,
			skills: ['html', 'css', 'js', 'react', 'git'],
			project: 'Trouver un emploi dans le milieu du web',
		})
	);
});

server.listen(5000, '0.0.0.0');
```

> Mes données peuvent être placer dans une constante à part.

## En savoir un peu plus sur les réponses HTTP

Comme pour la requête il existe des HEADERS spécifique à la réponse HTTP

-   **Access-Control-Allo-Origin**

    > Le serveur peut contrôler l'accèsà des ressources d'un agent utilisateur.
    > _En gros, ça signifie que toute origine peut accéder à la ressource demander_.

-   **Connetion: Keep-Alive**

    > Permet de maintenir la connexion TCP ouverte après la requete. (Que en HTTP/1.1) HTTP/2 maintient la connexion d'office.

-   **Content-Encoding: gzip**

    > Permet d'indiquer à l'agent utilisateur que le body a été compressé en utilisant gzip pour qu'il puisse le décrypter.

-   **Content-Type: text/html; charset=utf-8** > Permet d'indiquer à l'agent utilisateur le média-type > ( _media-type utilie le standard MIME qui permet d'indiquer la nature et le format du document_ ) et l'encoding de la ressource renvoyée.

-   **Etag**

    > Identifiant unique pour une version spécifique d'une ressource.

-   **Date**

    > Spécifie juste le moment de la réponse

-   **LasModified**

    > Est la date de la dernière modification de la ressource

-   **Set-Cookie**

    > Gère les cookies

| Exemple Type MIME   | Desciption                                    |
| ------------------- | --------------------------------------------- |
| **text/css**        | Fichier css                                   |
| **image/png**       | Image                                         |
| **application/pdf** | Fichier pdf                                   |
| **application**     | signifie n'importe qu'elle ressource binaire. |
| **video/mp4**       | Vidéo mp4                                     |

> [Lien vers une liste des Type MIME que vous pourrez rencontrer](https://fr.wikipedia.org/wiki/Type_de_m%C3%A9dias)

## Les méthodes important de http.ServerResponse

1. **setHeader()**

```js
res.setHeader('Content-Type', 'text/html');
// Ou avec plusieurs valeurs comme avec les cookies
res.setHeader('Set-Cookie', ['key1=val1', 'key2=val2']);
```

2. Le **statusCode** et le **statusMessage** d'une réponse

```js
// Syntaxe directe
res.statusCode = 404;
res.statusMessage = 'Page Not found';
```

3. La méthode **writeHead()**

```js
// Syntaxe déjà vu
res.writeHead(404, {
	'Content-Type': 'text/html; charset=utf-8',
});
res.end(`
    <html>
    	<head>
    		<title>Error 404</title>
    	</head>
    	<body>
    		<h1>Page not found - 404</h1>
    	</body>
    </html>
	`);
```

4. La méthode **write()**
    > **Signature** : `res.write( Buffer_Ou_String, encoding, callback );`

```js
// Attention ça pique les yeux :
res.write('<html>');
res.write('<body>');
res.write('<h1>Hello</h1>');
res.write('</body>');
res.write('</html>');
```

5. La méthode **end()** est obligatoire d'utilise res.end() ou response.end() pour chaque réponse.
    > **Signature** : `res.end( data, encoding, callback )`. _Par défaut l'encoding est sur utf-8_

```js
res.write(data, encoding);
res.end(callback);
```

#### EXEMPLE A COMPRENDRE - (JE DOIS REVISER ENCORE SUR SA)

```js
// Exemple :
const body =
	'<html><head><title>Error 404</title></head><body><h1>Page not found - 404</h1></body></html>';
response
	.writeHead(200, {
		'Content-Type': 'text/html',
	})
	.end(body);

// Exemple de petit serveur
const http = require('http');

http.createServer((req, res) => {
	// si les erreurs ne sont pas gérée dans node et qu'il y en a une, l'app crashera...
	req.on('error', (err) => {
		console.error(err);
		res.statuscode = 400; // BAD REQUEST
		res.end();
	});
	res.on('error', (err) => {
		console.error(err);
	});

	if (req.method === 'POST' && req.url === '/echo') {
		// let body = [];
		// req.on( 'data', ( chunk ) => {
		//		body.push( chunk );
		// }).on( 'end', () => {
		//		body = Buffer.concat( body ).toString();
		//		res.end( body );
		// } );

		// Peut être remplacer par :
		req.pipe(res);
	} else {
		res.statusCode = 404;
		res.end();
	}
}).listen(8000);
```

## Les templates

> Découverte sur l'utilisation d'un template par le code.

### Fichier index.html

```html
<!-- index.html (Dans la démonstration de l'utilisation d'un template) -->
<html>
	<head>
		<title>Title</title>
	</head>
	<body>
		<h1>Comment tu vas {{ name }} ?</h1>
	</body>
</html>
```

> **Les doubles accolades**, permettent dans des frameworks, d'**interpoler** une variable.
> Pour une simulation réussi, nous allons simuler un framework et donc on va remplacer son contenu.

### Fichier app.js

```js
// app.js (Dans la démonstration de l'utilisation d'un template)
const http 		= require( 'http' );
const fs 		= require( 'fs' );

const server 	= http.createServer();

server.on( 'request', ( req, res ) => {
	res.writeHead( 200 {
		'content-type': 'text/html'
	} );

	// Lecture du fichier index.html qui sera encodé en utf-8
	const fileContent = fs.readFileSync( './index.html', 'utf8' );

	// On utilise une méthode native à javascript pour remplacer un contenu.
	const template = fileContent.replace( '{{ name }}', 'Alain' );

	res.end( template );
} );

server.listen( 5000, "0.0.0.0" );
```

## Découverte du "routing" par un exemple concret

| N°  | Nom du fichier | Rôle                           | Route                                                            |
| --- | -------------- | ------------------------------ | ---------------------------------------------------------------- |
| 1   | not-found.html | Simulation d'une page d'erreur | **Toutes les routes sauf :** `/`, `/home`, `info`, `information` |
| 2   | info.html      | Page d'information             | `/info`, `/information`                                          |
| 3   | index.html     | Page d'accueil                 | `/`, `/home`                                                     |
| 4   | app.js         | server                         |                                                                  |

#### Fichiers HTML

1. Page : **not-found.html**

```html
<html>
	<head>
		<title>Hello</title>
	</head>
	<body>
		<h1>Page inexistante... Aussi appelé Page 404</h1>
		<ul>
			<li><a href="/home">Accueil</a></li>
			<li><a href="/info">Information</a></li>
		</ul>
	</body>
</html>
```

2. Page : **info.html**

```html
<html>
	<head>
		<title>Hello</title>
	</head>
	<body>
		<h1>Information</h1>
		<ul>
			<li><a href="/home">Accueil</a></li>
			<li><a href="/info">Information</a></li>
		</ul>
	</body>
</html>
```

3. Page : **index.html**

```js
<html>
	<head>
		<title>Hello</title>
	</head>
	<body>
		<h1>Accueil</h1>
		<ul>
			<li>
				<a href='/home'>Accueil</a>
			</li>
			<li>
				<a href='/info'>Information</a>
			</li>
		</ul>
	</body>
</html>
```

#### Fichier app.js

4. Fichier du server : **app.js**

```js
const http 		= require( 'http' );
const server	= http.createServer();

server.on( 'request', ( req, res ) => {

	// définition d'une constante pour récupérer l'url
	const url 		= req.url;
	const myData;

	// Routing (contrôle des routes)
	if ( url === '/' || url === '/home' ) {
		res.writeHead( 200, {
			'content-type': 'text/html; charset=utf-8'
		} );
		myData = fs.readFileSync( '/index.html', (err) => {} );
	} else if ( url === '/info' || url === '/information' ) {
		res.writeHead( 200, {
			'content-type': 'text/html; charset=utf-8'
		} );
		myData = fs.readFileSync( '/info.html', (err) => {} ):
	} else {
		myData = fs.readFileSync( '/not-found.html', (err) => {} );
	}

	res.end( myData );
} );

server.listen( 5000, "0.0.0.0" );
```
