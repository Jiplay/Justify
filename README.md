# Tictactrip

Ce projet répond à un test technique proposé par cette entreprise, le test est le suivant : 

* Développer un backend en Node.js avec Typescript pour justifier du texte envoyer à l'application.

* Développer quelques endpoints qui permettent de limiter l'usage, et pour justifier le texte

* Déployer l'application


## Ma solution

J'ai repris un bout de code de l'application aperta que j'ai commencé à developper. J'ai organisé le code de la manière la plus optimisée que je connais pour une passerelle API d'un projet en microservice.

On y trouve le point d'entrée du code dans `app.ts`, les routes login & register y sont instancié. 

L'endpoint register propose de créer un compte pour pouvoir utilisé le service, une fois le compte créer, il suffit de faire une requête qui va renvoyer un JWT, avec lequel l'endpoint justify.

## Routes 

POST : /api/justify. body : text/plain

INPUT :
Header : 
Authorization : <token> type string
Body: 
Je suis Julien...

--------

POST : /register. body JSON 
INPUT : 
{
	"username": "<...>", type:string
	"password": "<...>", type:string
}
OUTPUT : 
{
	"bool": "<...>", type:boolean
}

--------

POST : /login. body JSON 
INPUT : 
{
	"username": "<...>", type:string
	"password": "<...>", type:string
}

OUTPUT : 
{
	"token": "<ey...>", type:string
}

## Déploiement 

Pour ce qui est du déploiement, j'ai utilisé Docker & Render. L'application est disponible à l'URL suivante : https://justify-5len.onrender.com/

## Le reste

J'ai choisi d'utiliser les JWT pour gérer l'authentification des utilisateurs. En ce qui concerne la base de donnée, j'ai opté pour MongoDB Atlas.


## Tests

Pour les tests de l'application, il y a des tests fonctionnels implémenté dans un script Python pour les routes login & register.
