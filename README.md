# groupomonia

Instructions pour initialiser le projet:

Ouvrer le fichier de votre choix et à partir du terminal taper la commande: 
git clone "https://github.com/jmalassigne/groupomonia.git"

Allumer votre serveur MAMP

A partir du dossier groupomonia/server lancer la commande:
"npm i" pour installer les dépendances.

Puis "npm run start" pour lancer le serveur.

Encore à partir du dossier groupomonia/server tapez la commande:
"sequelize db:create"

Puis "sequelize db:migrate".

Pour finir à partir du dossier groupomonia/client lancer la commande:
"npm i vue-cli"

puis "npm run serve"

L'application tourne désormais sur le port 8080

Pour avoir accès à l'application en tant qu'administrateur rendez vous dans phpMyAdmin et renseignez un nouvel utilisateur avec la valeur 1 pour le champ isAdmin