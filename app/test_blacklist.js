const BLACKLISTED_CARS = [
  "Progen Elva", "Progen P1", "Progen 765 LT (Spider)"
];

let input = "Buying p1 case in bulk. 18k";
console.log("Original:", input);

let cleanedInput = input;
cleanedInput = cleanedInput.replace(/\b(crates|cases)\b/gi, 'containers');
cleanedInput = cleanedInput.replace(/\bp1 container(s)?\b/gi, 'Progen container$1');
cleanedInput = cleanedInput.replace(/\bp1(?!\s+containers?)\b/gi, 'Progen P1');

console.log("Cleaned:", cleanedInput);

const isBuyingOrSelling = /\b(buy|buying|sell|selling|trade|trading)\b/i.test(cleanedInput);
if (isBuyingOrSelling) {
  for (let car of BLACKLISTED_CARS) {
    if (new RegExp(car.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(cleanedInput)) {
      console.log(`REJECTED: ${car} is a non-tradeable vehicle.`);
    }
  }
}
