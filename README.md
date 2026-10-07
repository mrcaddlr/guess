# guess

A lightweight image guessing game for movies, TV, anime, games, characters, consoles, people, places, objects, and more.

## How it works

- Pick a category.
- The game searches Wikipedia for a real image matching that category.
- Guess what the image is.
- Correct answers earn points.
- Streaks increase the points you earn.
- Skip/reveal gives 0 points and resets the streak.
- There is no fixed end: keep playing as long as you want.

## Hosting

This is a plain HTML/CSS/JavaScript site with no build step.

Enable **Settings → Pages → Deploy from branch → main / root** on GitHub and open the generated Pages URL.

## Image source

Images and subject metadata are retrieved at runtime from Wikipedia's public APIs. The game does not generate the quiz images itself.

## Adding categories

Edit the `categories` object in `app.js`. Each category contains search queries that Wikipedia can use to find candidate subjects.