# guess

a lightweight image guessing game for movies, tv, anime, games, characters, consoles, people, places, objects, and more.

## categories

**Movies** and **TV** are expandable categories with genre subcategories such as All, Sci-Fi, Horror, Fantasy, Animation, Action, Comedy, Drama, Crime, Mystery, and Thriller.

Other categories include Anime, Games, Consoles, Characters, People, Places, Objects, and Franchises.

## image sources

the game uses category-specific sources first:

- Anime → AniList
- TV → TVMaze
- Movies → TMDB when a user-supplied key exists, otherwise Wikipedia
- Games → RAWG when a user-supplied key exists, otherwise Wikipedia
- Consoles / Characters / People / Places / Objects / Franchises → Wikipedia

The quiz never uses a broad category search to decide what the subject is. The subject comes from curated pools, and the source only provides the image for that exact subject.

TVMaze exposes a free public API with show images and CORS support for browser applications. AniList exposes a public GraphQL API for anime data and cover images.

## gameplay

- pick a category or use **random**
- guess the image
- correct answers increase your streak and score
- skip/reveal gives 0 points and resets the streak
- solved, skipped, and revealed rounds are locked until the next round starts
- broken images are rejected before they become a playable round
- repeats are avoided until a category pool is exhausted

## hosting

this is a plain HTML/CSS/JavaScript site with no build step.

GitHub Pages is deployed by the workflow in `.github/workflows/pages.yml`.

## optional API keys

TMDB and RAWG require API credentials. This build does not embed private credentials. Without those keys, Movies and Games fall back to Wikipedia so the public GitHub Pages site remains playable.

Keys, when present, are read from `localStorage` under `tmdb_api_key` and `rawg_api_key`.
