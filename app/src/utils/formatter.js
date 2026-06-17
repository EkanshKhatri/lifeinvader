import { carsList, clothsList } from '../data.js';
const BLACKLISTED_CARS = [
  "Annis Concept 2021", "Brabus Rocket G900", "Bravado Charger Daytona", "Enus EXP 10", "Genesis G90", "KMTA Optima", 
  "Overflod Jesko 2020", "Pfister Cayenne", "Shelby Cobra Daytona", "Truffade Veyron", "Ubermacht M5 (F90)", 
  "Vapid Focus RS", "Benefactor-MG G63 (6X6)", "Enus Wraith", "Grotti FXX-K Evo", "Karin Corolla AE", "Overflod CCX", 
  "Pfister Panamera Turismo", "Skoda Octavia RS", "Truffade La Voiture Noire", "Ubermacht Z4 (E85)", "Vapid GT 2017", 
  "Benefactor-Benz GLS 63", "Grotti Tributo (F8)", "Overflod One", "Pfister 911 Turbo 2021", "SSC Tuatara", "Truffade Bolide", 
  "Ubermacht Vision", "Vapid Raptor F150", "Benefactor-Benz MG Visione", "Grotti Stradale (SF90)", "Overflod Gemera", 
  "Pegassi Veneno (LP750)", "Truffade Divo", "Vapid Mustang 1965", "Benefactor-Benz Vision AVTR", "Grotti Superfast (F812)", 
  "Overflod Regera", "Pegassi Centenario (LP770)", "Vapid Mustang MACH-E", "Benefactor-MG Project One", "Grotti Pista (F488)", 
  "Obey TT", "Pegassi Terzo", "Benefactor-MG E63 (W213)", "Grotti Monza (SP2)", "Obey RS5 Coupe", "Pegassi Urus", 
  "Benefactor-Maybach GLS600", "Gallivanter Evoque", "Obey RS E-Tron GT", "Pegassi Diablo (SV)", "Benefactor-MG GLE63 Coupe", 
  "Obey E-Tron Sportback", "Pegassi Aventador (LP700)", "Benefactor-MG A45 (W176)", "Ocelot Vulcan", "Pegassi Alston (SC18)", 
  "Benefactor-MG CLS53 (C257)", "Ocelot Evora", "Pegassi Reventon", "Benefactor-Benz GLC300", "Ocelot GranTurismo", "Pegassi Sian", 
  "Benefactor-Benz 300 SL (W198)", "Pegassi Countach (LP400)", "Benefactor-Benz 190E (Evolution II)", "Pegassi Countach (LPI 800-4)", 
  "Benefactor-Maybach S63 (W223)", "Pegassi SE (PJ1)", "Progen Elva", "Progen P1", "Progen 765 LT (Spider)"
];

const ILLEGAL_TERMS = [
  "firearm", "gun", "ammunition", "ammo", "bulletproof vest", "dark lui vi armored vest",
  "weed", "cannabis", "cocaine", "drug", "ems surgical mask", "medical mask",
  "vehicle scanner", "people scanner", "radar", "balaclava", "rope", "flash drive with a virus",
  "lock pick", "lockpick", "anti-radar", "engine block", "smuggling machine", "submodule",
  "hacking the search database", "crowbar", "fabric", "head bag", "animal skin", "armor skin",
  "air horn", "earplug", "barricade", "trap", "poison dart", "army uniform", "tracking sensor",
  "dangerous razor", "resource scanner", "body armor", "paper for money", "satellite dish",
  "tincture", "first aid", "pill", "banana", "burger", "grilled steak", "grand coin",
  "battlepass", "hype body", "mega mall", "black market", "lesbian", "gay", "sugar daddy"
];

const GENERAL_RULES = `You format raw messy ads into PERFECT strings for LifeInvader. Do NOT add conversation.
PREFIXES: "Selling ", "Buying ", "Trading ", "Selling or trading ", "Renting ", "Renting out ", "Auto Fair: Selling "
SUFFIXES: " Price: [Amount]." or " Budget: [Amount]." (Use "Negotiable." if no amount is given).

CRITICAL RULE: You MUST output ONLY the final formatted ad sentence. Do NOT prefix the category.

GENERAL RULES:
1. Formatting: Begin with a Prefix. Follow with item(s), ending with a full stop (.). Then "Price:" or "Budget:". Then the value.
2. Numbers & Currency: ALWAYS use a period (.) for thousands, NEVER a comma (,). Do NOT use "k" or "m". ($2.500, $1.000, $1 Million., $1.45 Million.)
3. Price Limits: If a price is $500 Million or more, change it to "Negotiable".
4. Period Rule: No period after numbers. Add period after words (Million., Negotiable.)
5. Trading: Trade Business for Business, Cars for Cars, Other for Other.
6. Singular/Plural: If exactly 1 (EXCEPT Businesses), use "a" or "an". Businesses NEVER use "a" or "an".
7. Multiple Items: Use a comma after the first and "and" before the last.
8. Word Replacements: change "extras" to "type", "cheap" to "for good prices".
9. Green Grass Rule: "Party at the Beach Market." -> "Party at the Beach."
10. Templates: Keep Service/Discount templates exactly as provided, just fix words.
11. Bulk/Quantity: If buying or selling items "in bulk" or multiple items, ALWAYS append " each" to the Price/Budget (e.g. "Price: $18.000 each.").`;

const REAL_ESTATE_RULES = `REAL ESTATE & RENTING:
- Allowed properties: Houses, Apartments, Mansions, Casino penthouses ("Casino apartment" -> "Casino penthouse").
- Quantity: Max 1 numbered property (use "№"). If multiple properties (e.g., "house 72 and 108"), DROP all numbers and state quantity ("Selling 2 houses"). Max 3 unnumbered properties. If exactly 1 unnumbered, add "a" or "an" (e.g., "Selling a house", "Buying an apartment").
- Tradability: Houses and apartments are NOT tradable.
- Renting: Use "Renting out" prefix. Suffix " Rent: $X per week." instead of Price. For buying rentals: "Renting a [item]. Budget: $X per week."
- Names/Interiors: Furnished -> "custom interior". Cannot mention the number of "stars".
- Garages/Storage: 5 garage types (2 g.s., 5 g.s., 9 g.s., 25 g.s., 30 g.s.). Storage space is "w.h." (3 w.h., 4 w.h., 5 w.h.).
- Grammar: Use commas between features, "and" before the last. If ad ends with "g.s." or "w.h.", do NOT add an additional period. Always use "a garden" (not just "garden").
- Apartments cannot be insured. (Remove insurance if mentioned for apartments).
- CRITICAL REORDERING: You must aggressively REORDER features to match this exact sequence: 
  1) a garden, 2) garage spaces (g.s.), 3) warehouses (w.h.), 4) custom interior, 5) insurance (do not mention number of days), 6) helipad, 7) swimming pool, 8) tennis court, 9) (long/large) driveway, 10) (spacious) backyard, 11) (nice/beautiful) views, 12) location.
- EXAMPLES TO FOLLOW STRICTLY:
  "Selling house in mirror park with helipad, 5 w.h., custom interior, 25 g.s., garden" -> "Selling a house with a garden, 25 g.s., 5 w.h., custom interior and helipad in Mirror Park. Price: Negotiable."
  "Selling house №586 with a garden, 9 g.s., 5 w.h., custom interior, insurance and swimming pool in Vinewood Hills. Price: $7 Million."
  "Selling house №758 with 9 g.s., 5 w.h., helipad and spacious backyard. Price: Negotiable."
  "Selling apartment №154 in Eclipse Towers. Price: $1.5 Million."`;

const AUTO_RULES = `VEHICLES & CAR RENTALS:
- Rules: Max 1 vehicle (unless trading). Cars MUST be in double quotes with capitalized Brand/Model (e.g., "Ubermacht M8 (F91)"). If no brand, use "a car".
- CRITICAL BRAND RULE: NEVER hallucinate car brands. If the user writes "Toros", just output "Toros". Do NOT change it to "Pegassi Toros".
- Feature order MUST be: 1) with partial/full configuration, 2) visual upgrades, 3) luminous wheels (of type X), 4) insurance (do NOT mention number of days), 5) turbo kit, 6) drift kit.
- Types: Do not indicate types of cars such as SUV, Sports, Electric. Just "a car".
- Trading: "Trading [Y] for [X]". You can only trade a vehicle for another vehicle. If the user says "Buying [X] trading/exchanging [Y]", it means "Trading [Y] for [X]".
- Auto Fair: Suffix "at Auto Fair." (Do not add Price).
- Renting: Use "Renting out" prefix (or "Renting" for buying). Suffix " Rent: $X [period]" instead of Price. If rent/budget is specified but NO rental period (e.g. "per week", "for 3 days"), output "REJECTED: Please indicate rental period."
- Exclusive Trucks: "Renting a "20 percent" exclusive truck. Budget: Negotiable."
- Monowheels: "Selling "Monowheel" of type 2."
- EXAMPLES TO FOLLOW STRICTLY:
  "Selling "Obey R8" with full configuration, visual upgrades, insurance, turbo kit and drift kit. Price: $8 Million."
  "Selling "Enus Phantom" with partial configuration, visual upgrades, luminous wheels of type 9, insurance and drift kit. Price: $10 Million."
  "Selling "Benefactor-Maybach Pullman" at Auto Fair."
  "Renting out "Truffade Chiron". Rent: $100.000 per week."`;

const DATING_RULES = `DATING & SEARCHING:
- Allowed searches ONLY: "Looking for [First Last].", "Looking for a family.", "Looking for family members.", "Looking for a date.", "Looking for a wife.", "Looking for a husband.", "Looking for a valentine.", "Looking for a friend.", "Looking for friends.", "Looking for a boyfriend.", "Looking for boyfriends.", "Looking for a girlfriend.", "Looking for girlfriends.", "Looking for Casino poker players."
- Specific People: MUST have a First and Last name. Capitalize both (e.g., "Looking for Max Uchiha.", "Searching elite alpha" -> "Looking for Elite Alpha."). If only one name is provided (e.g., "Looking for Max"), output "REJECTED: Please mention the Full Name."
- Classified People: If the ad specifically mentions looking for a state leader or deputy (e.g., LSPD leader), output "REJECTED: You cannot search for classified person." (Note: The AI cannot check databases, so just format normal names perfectly for the human to check).
- Specific Families: Mentioning a specific family name is NOT allowed. Output "REJECTED: Mentioning of looking for a specific family is not allowed."
- Budgets/Buying: Cannot list a price or budget for a wife/husband/person, or say "Buying a wife". Output "REJECTED: Improper advertisement."
- Trolling: Ads looking for "sugar daddy", "lesbian", or "gay" are illegal.`;

const BUSINESS_RULES = `BUSINESS: 
- Max 1 business per ad. Do NOT use "a" or "an" before a business. Capitalize the first letter of the business name.
- Allowed Private Businesses: Ammunition Store, ATM business, Bar, Car wash, Car sharing, Chip tuning, Clothing shop, Electric station, Farm, Flower shop, Fight club, Furniture shop, Gas station, Grand Elite, Hair salon, Jewelry store, Juice shop, Luna park, Parking, Pet Shop, State object, Service station, Tattoo studio, Taxi company, Warehouse, 24/7 Store.
- Allowed Family Businesses: Burger shop, Cowshed, Freight train, Plantation (only capitalize the first word, e.g. "Cabbage plantation business"), Oil Well.
- Trading: You can only trade a Business for another Business.
- Family Business Tradability: Family businesses CANNOT be traded (e.g., "Trading Burger shop"). If attempted, output: "REJECTED: Family businesses cannot be traded."
- Adding "business": If NO business number (like №4) or "Control" or "shares" is specified, you MUST append the word "business" immediately after the business name (e.g., "Selling Bar." -> "Selling Bar business.", "Buying ATM" -> "Buying ATM business."). If a number IS specified, do NOT add "business".
- Business Shares: "Taxi fleet shares", "Gas station shares", "Chip tuning shares", "Barber shop shares", "Tattoo studio shares", "Armory store shares", "Bar shares", "Car sharing shares".
- EXAMPLES TO FOLLOW STRICTLY:
  "Selling Burger shop business. Price: $65 Million."
  "Selling Ammunition Store №269 in the city. Price: Negotiable."
  "Buying Plantation business with 20 beds. Budget: Negotiable."
  "Selling Cabbage plantation business with 20 beds. Price: Negotiable."
  "Selling Chip tuning №4 Control. Price: Negotiable."
  "Selling Gas station shares. Price: Negotiable."`;

const WORK_RULES = `WORK & HIRING:
- Prefixes: "Hiring [profession/workers]", "[Profession] looking for work.", "Looking for a job."
- Currency: "Salary: $X." or "Awarding $X bonus." (If no amount, use "Salary: Negotiable." or "Awarding bonuses."). NEVER use "Price:".
- Construction Sites: Map exactly: site №1 -> "construction site №1 on Vespucci Boulevard.", site №2 -> "construction site №2 on Calais Avenue.", site №3 -> "construction site №3 in Pillbox Hill."
- Roles & Professions: Trucker, lawyer, DJ, photographer, bodyguard, professional dancer, personal driver, assistant, professional singer, firefighters, locksmith, electrician, gardener, surveyor, driver.
- Multiple Roles: If an ad mentions more than one construction role (e.g. locksmith, electrician, gardener, driver), change it to "Hiring workers".
- Terminology: If you see "lumberjack" use "locksmith". "farmer" -> "gardener". "oilman" -> "surveyor". "strippers" or "exotic dancers" -> "professional dancer". "level X" -> "X years of experience".
- Capitalization: Capitalize the profession ONLY if it's the first word (e.g., "Lawyer looking..."). Otherwise lowercase (e.g., "Hiring a lawyer."). "DJ" is ALWAYS fully capitalized.
- EXAMPLES TO STRICTLY FOLLOW:
  "Hiring workers at construction site №1 on Vespucci Boulevard. Salary: Negotiable."
  "Hiring at construction site №1, in Vespucci Boulevard. Awarding $3.000 bonus."
  "Hiring a driver with 3 years of experience at construction site №2 on Calais Avenue."
  "Looking to work as a professional dancer."
  "Professional dancer looking for work."
  "Hiring truckers. Salary: Negotiable."
  "Hiring a lawyer. Salary: Negotiable."
  "DJ looking for work."
  "Hiring firefighters at the beach market. Salary: $15.000"`;

const OTHER_BASE_RULES = `SERVICES, PARTIES, & OTHER:
- Max Items: Maximum 3 items allowed in an Other ad.
- Word Replacements: change "extras" to "of type".
- Backpack skins: "backpack skin(s)". Batteries: "battery(ies)". Biospark: "Biospark(s)".
- Chargers: "charger(s)". Canisters: "premium fuel canister(s)", "fuel canister(s)".
- Christmas: "Christmas key(s)", "Christmas copper", "Christmas timber", "Christmas perch", "Christmas seed(s)", "Christmas lollipop(s)".
- Gifts: "New years gift(s)", "Little gift(s)", "Big gift(s)", "Opened gift(s)".
- Statues: "Dirty Statue(s)", "Purified Statue(s)". Drawings: "Drawing(s)".
- Fishing rods / Pickaxes: "[low/medium/high/max/advanced] quality fishing rod" or "pickaxe".
- Fish: "perch", "carp", "salmon", "trout", "megalodon", "ray", "orca", "humpback whale".
- Fruits/Vegetables: Append category (e.g. "pineapple fruits", "cabbage vegetables"). Fruits: mandarin, pumpkin, strawberry, pineapple. Vegetables: cabbage.
- Fireworks: "firework(s)". GrandPro BodyCam: "GrandPro BodyCam". Fuel for resource extraction: "fuel for resource extraction".
- Letters: "letter \\"G\\"", "letters".
- License plates: "license plate (1ABC234)". Custom: "custom license plate(s)".
- Mining Resources: "copper", "an emerald"/"emeralds", "a ruby"/"rubies", "a diamond"/"diamonds", "obsidian", "a magma stone"/"magma stones".
- Resource barrels: "solar barrel(s)", "gasoline barrel(s)", "kerosene barrel(s)".
- Materials/Resources: "sand", "snow", "scrap metal", "top quality metal", "thread(s)", "timber", "token(s)", "tonic treat(s)", "Treasure Map(s)", "video card(s)", "wires".
- Miscellaneous: "automatic [drill/sawmill/rod/oil well/watering can]", "[low/medium/high/max] quality inventory", "dice", "hookah", "Leash", "milk", "mushroom(s)" (NOT tincture soup), "paint can(s)" (never spray cans), "pearl(s)", "pet food", "repair kit(s)", "solar panel(s)", "SIM card № [number]", "sponge(s)", "[small/large] inflatable mattress(es) of type [X]".
- Containers: Keep exact brand names (e.g. "Progen container"), NEVER "cases/crates".
- Animated Items: "Fire Ring", "Lightning Charge", etc.
- Spatial Sound Effects: If exactly 1: "spatial sound effect ([Name])". If multiple: "2 spatial sound effects" (do NOT mention names).

BEACH MARKET:
- Format: "Selling [Item] at the beach market shop №X. Price: $X." (Do NOT add Negotiable).
- MAX 1 item name mentioned. If multiple, replace with "various items".
- Use "for good prices" instead of "cheap".`;

const PETS_RULES = `PETS:
- Caged pets: "cage with a [Pet Name]". Allowed: Border Collie, Cat, Cougar, Cyberdog, Husky, Panther, Pig, Poodle, Monkey, Pug, Christmas Elf, Santa Claus, Fancy bear, Cute Hippo, Mr Candy Cane, Futuristic Friend, New years Husky, Rabbit, Rat, Retriever, Robobeast, Rooster, Puma, Rottweiler, Westie, Kitty Bunny, Duckling, Panda, Lion Cub, Mini Robot, Cosmodog, Easter Bunny. Example: "cage with a Panda".
- Shoulder pets: "[Name] on shoulder pet". Allowed: six tailed fox, hamster, strong chicken, owl, flying bear, toothless dragon, leon brawl, lovely bird egg, Mr. Robot friend, el primo corazon brawl, black voron.`;

const JUICES_RULES = `JUICES:
- Juices: "attack juice", "protection juice", "endurance juice", "25% protection juice", "riding juice", "power juice", "immunity juice", "fast running juice", "juice on becoming an animal", "juice for double the payment".`;

const TUNING_RULES = `TUNING PARTS:
- Grammar: "[quality] quality [type] tuning" (types: engine, brakes, suspension, tires, transmission).
- 1 part: "high quality engine tuning".
- 2+ of SAME quality: "high quality tires and suspension tunings".
- 3 parts of DIFFERENT qualities: "high quality transmission, medium quality tires and low quality suspension tunings".
- 2 same quality + 1 different: "medium quality transmission tuning and high quality tires and suspension tunings".
- If no specific parts, use: "high quality tuning parts".`;

const CLOTHING_RULES = `CLOTHING:
- Clothing Order: [color] [luminous] [item name] [type] [gender]. Ex: "black luminous Keezy Boost shoes of type 5 for men".`;

const SERVICES_RULES = `SERVICES, PARTIES & ALLIANCES:
- Professionals/Services: "Looking for a lawyer.", "Looking for a personal driver.", "Looking for a professional dancer.", "Looking for a professional singer.", "Looking for a DJ."
- Weddings: "Wedding at Church.", "Wedding at Church for [Names] at [Time]."
- Events/Meets: "Car meet at [Location].", "[Brand] exclusive car meet at [Location]."
- Parties: "Looking for a party.", "Party at [Location].", "Pool party at [Location]."
  Allowed Party Locations: Houses/apartment, The beach, The yacht, Bahama Mamas Bar, Tequi-la-la Bar, Stadium, Diamond Resort Bar (which is casino), Arena, Raton Canyon, Vanilla Unicorn Bar, Hotel Spa Bar.
- Poker/Dice: "Looking to play poker/dice. Bet: $X" (not Price). Max bet is $10 Million. If over $10 Million or no bet is given, use "Bet: Negotiable."
- Families & Owners: "Looking for an alliance.", "Looking for a [Business] owner." (e.g. "Looking for a 24/7 Store owner.")`;

const TICKETS_RULES = `TICKETS & PASSES:
- Tickets: "Grand ticket", "regular lottery ticket", "rare lottery ticket", "flame and water lottery ticket", "Cayo Perico ticket", "Car ticket", "Secret ticket fragment", "Secret ticket", "Royal Artifacts lottery ticket", "Resource Miners ticket".
- Prime: "Prime with 30 days". Prime Platinum: "Prime Platinum", "Prime Platinum with 15 days".`;

function guessCategory(input) {
  const text = input.toLowerCase();
  
  // Explicitly catch Services / Other first
  if (/\b(party|wedding|meet|alliance|poker|dice)\b/.test(text)) return 'Other';
  if (/\blooking for (a |an )?(lawyer|personal driver|professional dancer|professional singer|dj|dancer|singer|mechanic|bodyguard|photographer|assistant)\b/.test(text)) return 'Other';
  if (/\blooking for (a |an )?.*owner\b/.test(text)) return 'Other';

  if (/\b(house|apartment|garage|ghetto|vinewood|mirror park|property|renting|rent|garden|w\.h\.|g\.s\.)\b/.test(text)) {
    return 'Real Estate';
  }
  if (/\b(car|vehicle|corvette|truffade|chiron|wheels|engine|transmission|turbo|drift|tuning|rims?|insurance|obey|uber|benefactor|grotti|pegassi|toros)\b/.test(text)) return 'Auto';
  
  if (/\b(lawyer|mechanic|hiring|work|job|salary|worker|taxi|lumberjack|farmer|dj|locksmith|electrician|gardener|surveyor|driver)\b/.test(text)) return 'Work';
  
  if (/\b(looking for|wife|husband|family|members|boyfriend|girlfriend|date|valentine|friend)\b/.test(text)) {
    if (/\b(car|vehicle|corvette|truffade|chiron|obey|uber|benefactor|grotti|pegassi)\b/.test(text)) return 'Auto';
    if (/\b(house|apartment|garage)\b/.test(text)) return 'Real Estate';
    if (/\b(business|shop|store)\b/.test(text)) return 'Business';
    return 'Dating';
  }
  if (/\b(business|strip club|gas station|farm|atm|shop|store|plantation|bar|barber|workshop|drug lab|clothing shop)\b/.test(text)) return 'Business';
  if (/\b(% off|discount|sale)\b/.test(text)) return 'Discounts';
  if (/\b(gps|service|charging station|electric station|weapon shop)\b/.test(text)) return 'Services';
  return 'Other';
}

const PLACES_RULES = `PLACES CAPITALIZATION:
- Official (uppercase): Vinewood Hills, Rockford Hills, Richman, Sandy Shores, Paleto Bay, Postal, Hospital, Capitol, Fire Station, Auto Fair, Bahama Mamas Bar, Tequi-la-la Bar, FIB, Hotel Spa Bar, Pacific Bluffs Country Club, Diamond Resort Bar (Casino Restaurant), Vanilla Unicorn Bar, Church, Stock Exchange, Stadium, Chumash, Lifeinvader, Del Perro Pier, Del Perro Beach, Cayo Perico Island, Hotel, Raton Canyon, School, SAHP, Mirror Park. (Use "in/near [Place]").
- Unofficial (lowercase): airport, autosalon, beach, beach market, ghetto, post office, train station, yacht. (Always include "the" e.g., "at the beach", "near the beach market", "in the city").`;

let currentTokenIndex = 0;

export async function formatAd(input, manualCategory = 'Auto-Detect') {
  if (!input) return { category: 'Unknown', result: '' };

  let cleanedInput = input.replace(/\b(vagos|ballas|marabunta|fams|families|bloods|crips|grove|aztecas|hood|red zone|green zone|green grass|hq|gang|gangHQ)\b/gi, '');
  cleanedInput = cleanedInput.replace(/\b(pls|fast|quick|guys|hey|dm me)\b/gi, '');
  
  // Vague / Short Form mapping
  cleanedInput = cleanedInput.replace(/\bmg\s*vt\b/gi, 'Benefactor-MG VT Black Series');
  cleanedInput = cleanedInput.replace(/\b(?:no\.?|number|#)\s*(\d+)\b/gi, '№$1');
  cleanedInput = cleanedInput.replace(/\bwtb\b/gi, 'buying');
  cleanedInput = cleanedInput.replace(/\bwts\b/gi, 'selling');
  cleanedInput = cleanedInput.replace(/\bwtt\b/gi, 'trading');
  cleanedInput = cleanedInput.replace(/\bexchanging\b/gi, 'trading');
  cleanedInput = cleanedInput.replace(/\bfam\b/gi, 'family');
  // Prevent community/nationality names from triggering the "specific family name" rejection rule
  cleanedInput = cleanedInput.replace(/\b(indian|chinese|turkish|russian|american|mexican|spanish|arab|arabic|british|french|italian|german|japanese|korean|brazilian|filipino|asian|european|african|latino|black|white)\s+family\b/gi, 'family');
  cleanedInput = cleanedInput.replace(/\bbiz\b/gi, 'business');
  cleanedInput = cleanedInput.replace(/\brp ticket(s)?\b/gi, 'Grand ticket$1');
  cleanedInput = cleanedInput.replace(/\b(looking to buy|looking to purchase)\b/gi, 'Buying');
  cleanedInput = cleanedInput.replace(/\b\d+\s*stars?\b/gi, ''); // Remove stars for real estate
  cleanedInput = cleanedInput.replace(/\b(crate|case)s?\b/gi, 'containers');
  cleanedInput = cleanedInput.replace(/\bp1 container(s)?\b/gi, 'Progen container$1');
  cleanedInput = cleanedInput.replace(/\bp1(?!\s+containers?)\b/gi, 'Progen P1');
  
  // Auto features & Tuning
  cleanedInput = cleanedInput.replace(/\bCorvette C7\b/gi, 'Declasse Corvette C7');
  cleanedInput = cleanedInput.replace(/\bToros\b/gi, 'Pegassi Toros');
  cleanedInput = cleanedInput.replace(/\b(max config|max tuning|fully upgraded)\b/gi, 'with full configuration');
  cleanedInput = cleanedInput.replace(/\b(nearly max|\(part\)|lvl3 or below)\b/gi, 'with partial configuration');
  cleanedInput = cleanedInput.replace(/\b(body upgrades|body kit)\b/gi, 'with visual upgrades');
  cleanedInput = cleanedInput.replace(/\b(turbo)\b/gi, 'turbo kit');
  cleanedInput = cleanedInput.replace(/\b(drift tuning|drift assistance)\b/gi, 'drift kit');
  cleanedInput = cleanedInput.replace(/\bunique 6 rims\b/gi, 'luminous wheels of type 6');
  cleanedInput = cleanedInput.replace(/\bwheels (\d+)\b/gi, 'luminous wheels of type $1');
  cleanedInput = cleanedInput.replace(/\b(luminous rims?|unique wheels?)\b/gi, 'luminous wheels');
  cleanedInput = cleanedInput.replace(/\b\d+\s*days?\s+(of\s+)?insurance\b/gi, 'insurance');
  cleanedInput = cleanedInput.replace(/\binsurance\s+(for\s+)?\d+\s*days?\b/gi, 'insurance');
  
  // Quality & Items
  cleanedInput = cleanedInput.replace(/\b(level 1|low level)\b/gi, 'low quality');
  cleanedInput = cleanedInput.replace(/\b(level 2|medium level)\b/gi, 'medium quality');
  cleanedInput = cleanedInput.replace(/\b(level 3|high level)\b/gi, 'high quality');
  cleanedInput = cleanedInput.replace(/\b(level 4|max level)\b/gi, 'max quality');
  cleanedInput = cleanedInput.replace(/\b(spray cans|spray balloons)\b/gi, 'paint cans');
  cleanedInput = cleanedInput.replace(/\bextras\b/gi, 'of type');
  cleanedInput = cleanedInput.replace(/\bAbibas Pezy 700\b/gi, 'Abibas Pezy Boost 700 V3 Alvah shoes');
  
  // Businesses & Work
  cleanedInput = cleanedInput.replace(/\bcasino\s+(apartment|penthouse)\b/gi, 'penthouse');
  cleanedInput = cleanedInput.replace(/\bpenthouse\b/gi, 'Casino penthouse');
  cleanedInput = cleanedInput.replace(/\b(gun store|weapon store)\b/gi, 'Ammunition Store');
  cleanedInput = cleanedInput.replace(/\bstrip club\b/gi, 'Bar');
  cleanedInput = cleanedInput.replace(/\b(binco|suburban)\b/gi, 'Clothing shop');
  cleanedInput = cleanedInput.replace(/\bcharging station\b/gi, 'Electric station');
  cleanedInput = cleanedInput.replace(/\bbarber\b/gi, 'Hair salon');
  cleanedInput = cleanedInput.replace(/\bauto workshop\b/gi, 'Service station');
  cleanedInput = cleanedInput.replace(/\bdrug lab\b/gi, 'Burger shop');
  cleanedInput = cleanedInput.replace(/\bpersonal business\b/gi, 'private business');
  cleanedInput = cleanedInput.replace(/\blooking to hire\b/gi, 'Hiring');
  
  // Specific edge cases from test suite
  cleanedInput = cleanedInput.replace(/\bfamily\s+busi\.?\b/gi, 'family business');
  cleanedInput = cleanedInput.replace(/\bbusi\.?\b/gi, 'business');
  cleanedInput = cleanedInput.replace(/\blawye\b/gi, 'lawyer');
  cleanedInput = cleanedInput.replace(/\bbp\b/gi, 'battlepass');
  cleanedInput = cleanedInput.replace(/\bcocain\b/gi, 'cocaine');
  cleanedInput = cleanedInput.replace(/\bvisuals?\b/gi, 'visual upgrades');
  
  cleanedInput = cleanedInput.replace(/\badidas\b/gi, 'Abibas');
  cleanedInput = cleanedInput.replace(/\blion\b/gi, 'Lion Cub');
  cleanedInput = cleanedInput.replace(/\btaxi\s+shares?\b/gi, 'Taxi fleet shares');
  cleanedInput = cleanedInput.replace(/\b(cabbage|pineapple|mandarin|pumpkin)\s+plantations?\b/gi, '$1 plantation business');
  cleanedInput = cleanedInput.replace(/\blevel\s+(\d+)\b/gi, '$1 years of experience');
  cleanedInput = cleanedInput.replace(/\b(\d+)\s*levels?\b/gi, '$1 years of experience');
  cleanedInput = cleanedInput.replace(/\b(exotic dancer|stripper)s?\b/gi, 'professional dancer');
  cleanedInput = cleanedInput.replace(/\blumberjacks?\b/gi, 'locksmith');
  cleanedInput = cleanedInput.replace(/\bfarmers?\b/gi, 'gardener');
  cleanedInput = cleanedInput.replace(/\b(oilman|oilmen)\b/gi, 'surveyor');
  cleanedInput = cleanedInput.replace(/\bgraphic cards?\b/gi, 'video card');
  cleanedInput = cleanedInput.replace(/\bcrypto(currency)?s?\b/gi, 'tokens');
  cleanedInput = cleanedInput.replace(/\bfrom wheels \d+ container\b/gi, '');
  cleanedInput = cleanedInput.replace(/\b(electric|suv|sports)\s+(car|vehicle)\b/gi, '$2');
  
  cleanedInput = cleanedInput.replace(/\b(max config|max tuning|fully upgraded)\b/gi, 'with full configuration');
  cleanedInput = cleanedInput.replace(/\b(nearly max|part lvl3 or below)\b/gi, 'with partial configuration');
  cleanedInput = cleanedInput.replace(/\b(body upgrades|body kit)\b/gi, 'with visual upgrades');
  cleanedInput = cleanedInput.replace(/\bturbo\b/gi, 'turbo kit');
  cleanedInput = cleanedInput.replace(/\b(drift tuning|drift assistance)\b/gi, 'drift kit');
  cleanedInput = cleanedInput.replace(/\b(luminous rims|unique wheels)\b/gi, 'luminous wheels');
  cleanedInput = cleanedInput.replace(/\b(level 1|low level)\b/gi, 'low quality');
  cleanedInput = cleanedInput.replace(/\b(level 2|medium level)\b/gi, 'medium quality');
  cleanedInput = cleanedInput.replace(/\b(level 3|high level)\b/gi, 'high quality');
  cleanedInput = cleanedInput.replace(/\b(level 4|max level)\b/gi, 'max quality');
  cleanedInput = cleanedInput.replace(/\b(crates|cases)\b/gi, 'containers');
  cleanedInput = cleanedInput.replace(/\b(spray cans|spray balloons)\b/gi, 'paint cans');
  cleanedInput = cleanedInput.replace(/\bextras\b/gi, 'of type');
  cleanedInput = cleanedInput.replace(/\bscarf\b/gi, 'mask');
  cleanedInput = cleanedInput.replace(/\bunique (\d+) rims\b/gi, 'luminous wheels of type $1');
  cleanedInput = cleanedInput.replace(/\b(looking to buy|looking to purchase)\b/gi, 'Buying');
  
  // Work Translations
  cleanedInput = cleanedInput.replace(/\b(lumberjack|lumberjacks)\b/gi, 'locksmith');
  cleanedInput = cleanedInput.replace(/\b(farmer|farmers)\b/gi, 'gardener');
  cleanedInput = cleanedInput.replace(/\b(oilman|oilmen)\b/gi, 'surveyor');
  cleanedInput = cleanedInput.replace(/\b(exotic dancers|stripers|strippers|exotic dancer|stripper)\b/gi, 'professional dancer');

  // Pure JS Optimization: Check Blacklisted cars instantly to avoid hitting API
  const isBuyingOrSelling = /\b(buy|buying|sell|selling|trade|trading)\b/i.test(cleanedInput);
  if (isBuyingOrSelling && typeof BLACKLISTED_CARS !== 'undefined') {
    for (let car of BLACKLISTED_CARS) {
      if (new RegExp(car.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(cleanedInput)) {
        return { category: 'Rejected', result: `REJECTED: ${car} is a non-tradeable vehicle.` };
      }
    }
  }

  if (typeof ILLEGAL_TERMS !== 'undefined') {
    for (let term of ILLEGAL_TERMS) {
      if (new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i').test(cleanedInput)) {
        if (term === "head bag" && /luminous head bag/i.test(cleanedInput)) continue;
        return { category: 'Rejected', result: "REJECTED: Cannot promote illegal items." };
      }
    }
  }

  if (/\b(trade|trading)\b/i.test(cleanedInput)) {
    if (/\b(house|apartment|mansion|penthouse|houses|apartments)\b/i.test(cleanedInput)) {
      return { category: 'Rejected', result: "REJECTED: Houses and apartments are not tradable." };
    }
    if (/\b(burger shop|cowshed|freight train|plantation|oil well)\b/i.test(cleanedInput)) {
      return { category: 'Rejected', result: "REJECTED: Family businesses cannot be traded." };
    }
  }

  const tokenString = typeof process !== 'undefined' && process.env.VITE_GROQ_TOKENS 
    ? process.env.VITE_GROQ_TOKENS 
    : (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GROQ_TOKENS || import.meta.env.VITE_GROQ_TOKEN : null);

  if (!tokenString) return { category: 'Error', result: "ERROR: Missing Groq Tokens (VITE_GROQ_TOKENS). Please add them to your .env file." };

  const tokens = tokenString.split(',').map(t => t.trim()).filter(Boolean);
  if (tokens.length === 0) return { category: 'Error', result: "ERROR: No valid Groq tokens found." };

  // Only retry exactly once per available key to avoid harassing Groq and resetting the ban timer!
  let retries = tokens.length;
  let lastError = '';
  while (retries > 0) {
    try {
      const activeToken = tokens[currentTokenIndex % tokens.length];
      const category = (manualCategory && manualCategory !== 'Auto-Detect') ? manualCategory : guessCategory(cleanedInput);
      let DYNAMIC_PROMPT = GENERAL_RULES + "\n\n";
      if (category === 'Real Estate') DYNAMIC_PROMPT += REAL_ESTATE_RULES + "\n\n";
      else if (category === 'Auto') DYNAMIC_PROMPT += AUTO_RULES + "\n\n";
      else if (category === 'Work') DYNAMIC_PROMPT += WORK_RULES + "\n\n";
      else if (category === 'Dating') DYNAMIC_PROMPT += DATING_RULES + "\n\n";
      else if (category === 'Business') DYNAMIC_PROMPT += BUSINESS_RULES + "\n\n";

      DYNAMIC_PROMPT += PLACES_RULES + "\n\n";

      if (category === 'Other' || category === 'Discounts') {
        DYNAMIC_PROMPT += OTHER_BASE_RULES + "\n\n";
        if (/\b(pet|cage|dog|panda|fox|bear|hippo|duckling|cat|pug|puma|rat|rooster|husky)\b/i.test(cleanedInput)) DYNAMIC_PROMPT += PETS_RULES + "\n\n";
        if (/\b(juice|juices)\b/i.test(cleanedInput)) DYNAMIC_PROMPT += JUICES_RULES + "\n\n";
        if (/\b(tuning|engine|brakes|suspension|tires|transmission)\b/i.test(cleanedInput)) DYNAMIC_PROMPT += TUNING_RULES + "\n\n";
        if (/\b(cloth|shirt|pants|shoes|mask|hoodie|jacket|sneakers|hat|glasses)\b/i.test(cleanedInput)) DYNAMIC_PROMPT += CLOTHING_RULES + "\n\n";
        if (/\b(party|wedding|meet|poker|dice|alliance|lawyer|driver|dancer|singer|dj)\b/i.test(cleanedInput)) DYNAMIC_PROMPT += SERVICES_RULES + "\n\n";
        if (/\b(ticket|prime|pass|fragment)\b/i.test(cleanedInput)) DYNAMIC_PROMPT += TICKETS_RULES + "\n\n";
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: DYNAMIC_PROMPT },
            { role: 'user', content: `Format this ad strictly according to the rules: ${cleanedInput}` }
          ],
          max_tokens: 75,
          temperature: 0.0,
          top_p: 1.0
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API Error: ${response.status} ${response.statusText}`);
      }

      const res = await response.json();
      let formatted = res.choices[0].message.content.trim();
      formatted = formatted.replace(/^["'](.*)["']$/, '$1').replace(/^Here is the formatted ad:\s*/i, '').replace(/^Formatted:\s*/i, '');
      formatted = formatted.replace(/garage spaces/gi, 'g.s.');
      formatted = formatted.replace(/\b(?:the\s+)?(?:party\s+|wedding\s+|meet\s+)?house\s+№/gi, 'house №');
      formatted = formatted.replace(/\bPegassi Toros\b/gi, 'Toros');
      
      // If AI still hallucinated a pipe, strip it.
      if (formatted.includes('|')) {
        formatted = formatted.split('|').slice(1).join('|').trim();
      }
      
      let finalCategory = category;
      let finalResult = formatted;

      if (formatted.toUpperCase().startsWith('REJECTED:')) {
        finalCategory = 'Rejected';
      }

      return { category: finalCategory, result: finalResult };
    } catch (err) {
      lastError = err.message || 'Unknown error';
      if (lastError.includes('429')) {
          console.log(`[Groq Rate Limit] Token ${currentTokenIndex % tokens.length + 1} exhausted. Switching to next token...`);
          currentTokenIndex++;
          retries--;
          continue;
      }
      if (lastError.includes('503') || lastError.includes('fetch failed')) {
          console.log(`[Groq API Busy] Waiting 2s before retrying...`);
          await new Promise(r => setTimeout(r, 2000));
          retries--;
          continue;
      }
      return { category: 'Error', result: `ERROR: ${lastError}` };
    }
  }
  
  if (lastError.includes('429')) {
    return { category: 'Rate Limit', result: `ERROR: You are formatting ads too fast! Groq's free tier allows 30 ads per minute. (Tried ${tokens.length} keys). Please wait 60 seconds and try again.` };
  }
  return { category: 'Error', result: `ERROR: Formatting failed. ${lastError || 'Max retries exceeded.'}` };
}
