This project is a web application built with NextJS and TypeScript utilizing TailwindCSS using the SuperHero API. This is a simple search engine that shows cards of superheros, once the user clicks on the card, a modal will show up showing additional information for the superhero such as powerstats, biography, appearance, work, and connections.

## Getting Started

Here's the command to start the web application locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Now open [http://localhost:3000](http://localhost:3000) on your browser to see the web application.

## Limitations:

1. The search engine is not case sensitive to superheros that have a hyphenated name such as Spider-Man and Star-Lord
2. The search engine is only limited to the names of the superheros and cannot filter the searched by any other characteristic.
3. The rest of the page will look blank unless the user searches for someone to fill up the space below it.
4. There isn't a auto-completion list underneath the search bar.

## Challenges faced:

1. I encountered a problem when certain superheros did not have any images such as Miguel O'Hara's version of Spider-Man. It seemed like the API had the image but the image wasn't found. To fix this, I tried employing ternary operator on the image but it wouldn't load the condition when the image wouldn't show.
