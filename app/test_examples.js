import { formatAd } from './src/utils/formatter.js';

const ads = [
  "Buy house in ghetto need garden, price 2 million",
  "I want to rent apartment, budget 100k",
  "Selling \"Benefactor-Maybach GLS600\". Price: $20 Million.",
  "Buying Corvette C7, full config, visuals, wheels 9, insurance, turbo.",
  "Selling strip club. Price 350 million.",
  "Selling Cabbage plantation with 20 beds. Price - 12 million",
  "Great Ocean Highway Charging Station (GPS №283) - Charging at $10/kw and $200/charger. For bulk orders, mail: (a7ph4). Call at 33-30-777 for details.",
  "Hurry up! Up to 60% OFF on Firearms at Central Mall Weapon Shop (GPS №269)! Limited stock, act fast. Ping Me on 22-20-444 OR Mails (maxuchihax).",
  "Searching Elite AlphaX",
  "I need a indian family.",
  "Selling Abibas Pezy 700. Price 5 mil",
  "Buying \"Toros\" exchanging \"Karin Tundra 2021\".",
  "buying 50 crypto currency. 8k each",
  "Party house no 71",
  "Buying p1 case in bulk. 18k"
];

async function run() {
  for (let i = 0; i < ads.length; i++) {
    const res = await formatAd(ads[i]);
    console.log(`${i+1}. [${res.category}] ${res.result}`);
  }
}

run();
