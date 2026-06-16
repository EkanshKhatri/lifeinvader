import { formatAd } from './src/utils/formatter.js';

const tests = [
  "Selling a house with 5 g.s. Price: Negotiable.",
  "Selling a house with a garden, 9 g.s., insurance and nice views. Price: Negotiable.",
  "Selling an apartment with 9 g.s. Price: Negotiable.",
  "Selling an apartment with nice views. Price: Negotiable.",
  "Selling 2 houses with a garden. Price: Negotiable.",
  "Selling house №1680 with 5 g.s. and 3 w.h. in the city. Price: Negotiable.",
  "Selling house №758. Price: Negotiable.",
  "Selling 2 houses. Price: Negotiable.",
  "Buying an apartment near Lifeinvader. Budget: Negotiable.",
  "Buying an apartment near the beach market. Budget: Negotiable.",
  "Buying house №574. Budget: Negotiable.",
  "Selling an apartment. Price: Negotiable.",
  "Selling Casino penthouse. Price: Negotiable.",
  "Selling mansion №58. Price: Negotiable.",
  "Selling house №758 with insurance. Price: Negotiable.",
  "Selling house №758 with 25 g.s. and insurance. Price: Negotiable.",
  "Selling a house. Price: $10 Million.",
  "Buying a house with a swimming pool in Vinewood Hills. Budget: Negotiable.",
  "Selling a house with a garden and 4 w.h. Price: Negotiable.",
  "Selling a house with a garden and custom interior. Price: Negotiable.",
  "Selling house №586 with a garden, 9 g.s., 5 w.h., custom interior, insurance and swimming pool in Vinewood Hills. Price: $7 Million.",
  "Selling a house with 9 g.s. and 5 w.h. Price: Negotiable.",
  "Selling house №758 with 9 g.s., 5 w.h., helipad and spacious backyard. Price: Negotiable.",
  "Selling house №759 with 9 g.s. and long driveway. Price: Negotiable.",
  "Selling house №476 with a garden, swimming pool and nice views. Price: Negotiable.",
  "Selling a house with a helipad. Price: Negotiable.",
  "Renting out house №1023 with a garden and 5 g.s. Rent: $100.000 per week.",
  "Renting a house. Budget: $100.000 per week.",

  "Selling apartment №154 in Eclipse Towers. Price: $1.5 Million.",
  "Selling apartment №163 in Tinsel Towers. Price: Negotiable.",
  "Selling apartment №188 in Del Perro Heights. Price: Negotiable.",
  "Selling apartment №306 in Richards Majestic. Price: Negotiable.",
  "Selling apartment №344 in Tinkle Building. Price: $950.000",
  "Selling apartment №774 in 3 Alta Street. Price: Negotiable.",
  "Selling apartment №1790 in Celltowa Building. Price: Negotiable.",
  "Selling apartment №1480 near the beach market. Price: Negotiable.",
  "Buying \"Toros\" exchanging \"Karin Tundra 2021\".",
  "buying pineapple, mandarin, cabbage seed bulk. 2500 each, 3000, 3500 eac",
  "sell a rp ticket"
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runTests() {
  for (let t of tests) {
    console.log(await formatAd(t));
    await sleep(2500); // Prevent Groq 30 RPM rate limit
  }
}
runTests();
