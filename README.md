# guess

a lightweight image guessing game for movies, tv, anime, games, characters, consoles, people, places, objects, and more.

## categories

**Movies** and **TV** are expandable categories with genre subcategories. the active genre is preserved when the game starts dynamically discovering new subjects.

Other categories include Anime, Games, Consoles, Characters, People, Places, Objects, and Franchises.

## image and subject sources

the game uses a category-specific source first:

- Anime → AniList
- TV → TVMaze
- Movies → TMDB when a user-supplied key exists, otherwise Wikipedia search
- Games → RAWG when a user-supplied key exists, otherwise Wikipedia search
- Consoles / Characters / People / Places / Objects / Franchises → Wikipedia

The curated pools are only seeds. Once a seed pool is exhausted, the game discovers additional subjects from the matching source instead of looping the same small list.

### console protection

Consoles use stricter validation than other categories:

- rejects non-hardware pages such as divisions, companies, services, accessories, and combined product/brand pages
- treats Xbox Series X and Xbox Series S as separate subjects
- rejects likely logos, wordmarks, icons, symbols, banners, screenshots, controllers, packaging, and other non-console images
- checks image dimensions and format before accepting an image
- when Wikipedia's chosen page image is unsuitable, the game searches the page's other image files for a better hardware photo
- canonicalizes pages such as Xbox (console) to the actual answer Xbox

Wikipedia's PageImages API can expose the selected image filename plus original/thumbnail dimensions, which the game uses for image validation. citeturn838193search0turn838193search2

TVMaze provides show images and genres through its public API, which lets TV subcategories keep their genre filter even during dynamic discovery. citeturn838193search1

## answers

answers use exact normalized matching plus an explicit alias table for common names and abbreviations. small typos are allowed only when the answer is long enough; partial words are never accepted.

for example, Fullmetal Alchemist accepts fma and fmab, but alchemist by itself does not.

## gameplay

- pick a category or use random
- guess the image
- correct answers increase your streak and score
- skip/reveal gives 0 points and resets the streak
- solved, skipped, and revealed rounds are locked until the next round starts
- broken images are rejected before they become a playable round
- repeats are avoided until a category pool is exhausted

## hosting

this is a plain HTML/CSS/JavaScript site with no build step.

GitHub Pages is deployed by the workflow in .github/workflows/pages.yml.

## optional API keys

TMDB and RAWG require API credentials. this build does not embed private credentials. without those keys, Movies and Games use Wikipedia discovery so the public GitHub Pages site remains playable.

Keys, when present, are read from localStorage under tmdb_api_key and rawg_api_key.
