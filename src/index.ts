import { SlotMachine } from "./SlotMachine";
import config from "./config";

const machine = new SlotMachine(config);

const startTime = performance.now();

let payload = 0;
let num = 0;
for (let index = 0; index < 100_000; index++) {
  const res = machine.spin();

  if (res.payloadLines > 0) {
    num++;
    console.log(res);
  }

  payload += res.payload;
}

const endTime = performance.now();
const executionTime = (endTime - startTime) / 1000;

console.log(`Number of winning spins: ${num}`);
console.log(`Total payout: ${payload}`);
console.log(`Execution time: ${executionTime.toFixed(2)} seconds`);
