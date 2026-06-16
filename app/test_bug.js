import { formatAd } from './src/utils/formatter.js';
import dotenv from 'dotenv';
dotenv.config();
async function run() {
  console.log("Testing ad...");
  const res = await formatAd("Buying p1 case in bulk. 18k");
  console.log("Result:", res);
}
run();
