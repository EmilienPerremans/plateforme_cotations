## Utilisation de git
### Initialisation
- git clone https://github.com/severinRobert/Module_DevII.git : Permet de créer un fichier "Module_DevII" contenant tout le projet.
### Commande les + utilisées :
- git commit -am "[message]" : Ajoute les modifications apportées dans tous les fichiers, [message] indique en 2/3 mots les changement apporté.
- git push : Envoi les modifications (qui ont été commit) sur github.
- git pull : Met à jour les fichiers locaux en prenant les modifications mises(push) sur github.
- git status : Rapide coup d'oeil sur l'état des fichiers locaux (si il faut push/commit des modifications).
### Autres commandes
- git add [fichier] : Ajoute un fichier au projet, git le commitera avec les autres fichiers.
- git reset --hard : Supprime toutes les modifications et rebase les fichiers locaux sur la version du github, à utiliser si le projet est cassé en local et que la source du problème n'est pas trouvée.
### Les branches
Les branches permettent de travailler en parallèle du projet sur une autre fonctionnalité sans risquer de casser le reste du projet. Une fois terminée la fonctionnalité peut être rajoutée au projet, on "merge" la branche vers une autre.
- git branch [nomBranche] : Crée une nouvelle branche.
- git checkout [nomBranche] : Permet de changer de branche.
- git merge [nomBranche] : Merge [nomBranche] sur la branche dans laquelle on se trouve.
