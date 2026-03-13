# CLAUDE.md - Conventions pour Claude Code

## Présentation du projet

Application éducative pour l'apprentissage de l'orthographe française.

- **Cible** : Sites éducatifs du gouvernement français
- **Stack** : React 19, Vite, Tailwind CSS, Lucide React

## Conventions de langue

| Contexte | Langue |
|----------|--------|
| Code (variables, fonctions, composants, constantes) | Anglais |
| Commentaires | Français |
| README et documentation | Français |
| Texte utilisateur (UI) | Français |

## Clean Code

### Principes

- Fonctions courtes et mono-responsabilité
- Noms explicites et auto-documentés
- Éviter les commentaires inutiles (code lisible)
- DRY (Don't Repeat Yourself)
- Composants < 100 lignes idéalement

### Conventions de nommage

| Type | Convention | Exemples |
|------|------------|----------|
| Variables / Fonctions | camelCase | `handleLetterClick`, `selectedList` |
| Composants React | PascalCase | `PauseScreen`, `LetterArea` |
| Constantes | UPPER_SNAKE_CASE | `BUNDLE_SIZE` |
| Booléens | Préfixes `is`, `has`, `show` | `isComplete`, `showPause` |
| Handlers | Préfixe `handle` | `handleValidate` |
| Props callbacks | Préfixe `on` | `onContinue` |
| Hooks | Préfixe `use` | `useMissionGame` |

## Structure des fichiers

```
src/
  components/
    screens/     # Écrans complets
    game/        # Composants spécifiques au jeu
    ui/          # Composants réutilisables
  hooks/         # Hooks personnalisés
  constants/     # Constantes de configuration
  utils/         # Fonctions utilitaires
```

## Conventional Commits

Format : `<type>(<scope>): <description>`

### Types

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Refactoring sans changement fonctionnel |
| `style` | Formatage, espaces, etc. |
| `docs` | Documentation |
| `chore` | Maintenance, dépendances |
| `test` | Ajout/modification de tests |

### Exemples

```
feat(pause): add resume button for mid-bundle pause
fix(speech): correct pronunciation for accented words
refactor(hooks): rename French variables to English
```



## Note sur le refactoring existant

Le code actuel utilise parfois du français (ex: `handleContinueAfterPause`).
Lors de modifications, privilégier la cohérence locale.
Un refactoring global vers l'anglais peut être planifié séparément.
