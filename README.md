



# vendez_les_votres

## Binome

- **ELGHANI ZENAIDJI**

## Présentation du projet

- le projet consiste à construire une application ou des gens peuvents mettre en vente ou achter des articles à  d'autres utlisateurs.
- Pour se  deconnecter, il suffit juste de cliquer sur le bouton **logout**.   

### Lancement du  serveur MongoDB
 Pour lancer le server MongoDB , il vous suffit de suivre les étapes suivantes.
- Lancer un terminal et se mettre dans le dossier vendez_lesvotres et lancer la commande ```npm install``` 
- crée un dossier dans la racine vous le nomerez dbData il contiendra les données de notre base.
- puis lancer `mongod --dbpath dbData`


### Lancement du  serveur web node
- Lancer un terminal et se mettre dans le dossier vendez_lesvotres et lancer le server avec la commande ```npm install```
- Lancer le server avec la commande ```nodemon```et voila le server est activé par votre machine qui fait office de server

###lancement de l'application
- pour accéder à notre application il faut d'abord lancer le serveur Mongodb ,lancer le serveur web node et accéder à```http://localhost:3000/access/login```qui est  une page  d'authentification avec les champs login et password il vous suffit de crée un compte  , cliquer sur register pour vous enregistrer votre compte et enfin vous connecter en mettant votre login et password et cliquer sur login. 

## Avancée sur le projet

#### v1

- Mise en place de la configuration de de base du server avec exppress avec `express --view=pug vendez_lesautres`
- défininition des schémas et modèles de données pour les utilisateurs et les objets 
- Mise en place la connexion à la base de données MongoDb
#### v2
- mise ne place des routes  pour l'authentification des  utilisateurs à l'aide de JWT.
- définition des routes pour la connexion l'accès à l'application et la mnipulation des objets.
#### Problèmes
- mise à jour des montans des utilisateurs.
- disparitions des objets achtés.


