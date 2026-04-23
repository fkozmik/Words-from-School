# Mission Spatiale

Note for my foreign friends:  
	This game has been developed to help my son learn to read.  
	It is not expected to have either commercial use or different language support. 
	<3

Application web éducative pour aider les enfants à apprendre l'orthographe des mots en français. Les enfants doivent reconstituer des mots en cliquant sur les lettres mélangées, le tout dans un univers spatial coloré et engageant.

## Structure du projet

```
Words-from-School
├── CLAUDE.md
├── index.html
├── LICENSE
├── lists
│├── modes.json
│└── words.json
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── shell.nix
├── src
│├── App.jsx
│├── components
│├── constants
│├── hooks
│├── index.css
│├── main.jsx
│└── utils
└── vite.config.js
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
