# Mission Spatiale

Application web éducative pour aider les enfants à apprendre l'orthographe des mots en français. Les enfants doivent reconstituer des mots en cliquant sur les lettres mélangées, le tout dans un univers spatial coloré et engageant.

## Fonctionnalités

- **Sélection de listes** : Plusieurs niveaux de difficulté (syllabes simples à complexes)
- **Système de bundles** : Les mots sont présentés par groupes pour éviter la fatigue
- **Pause et reprise** : Possibilité de mettre le jeu en pause et de reprendre plus tard
- **Suivi de progression** : Affichage des mots complétés et des listes terminées
- **Synthèse vocale** : Lecture audio du mot à épeler (clic sur la carte du mot)
- **Interface tactile** : Optimisée pour tablettes et smartphones

## Technologies

- React 19
- Vite 7
- Tailwind CSS 4
- Lucide React (icônes)

## Structure du projet

```
src/
  App.jsx                    # Composant principal
  hooks/
    useMissionGame.js        # Logique du jeu
  components/
    screens/                 # Écrans (sélection, pause, completion)
    game/                    # Composants de jeu (lettres, progression)
    ui/                      # Composants UI réutilisables
  constants/
    game.js                  # Configuration (taille des bundles)
  utils/
    speech.js                # Synthèse vocale
lists/
  words.json                 # Listes de mots par niveau
```

## Personnalisation des mots

Pour modifier ou ajouter des listes de mots, éditez le fichier `lists/words.json` :

```json
{
  "nom-de-la-liste": ["mot1", "mot2", "mot3"]
}
```

## Licence

MIT - Voir le fichier [LICENSE](LICENSE) pour plus de détails.
