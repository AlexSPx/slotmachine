import { Reel } from "./Reel";

type Symbols = {
  [key: number]: number[];
};

type Line = number[];

export type SlotMachineProps = {
  reelsCount: number;
  rowsCount: number;
  symbols: Symbols;
  reels: number[][];
  lines: Line[];
};

type SpinResult = {
  result: number[][];
  payloadLines: number;
  payload: number;
};

export class SlotMachine {
  private readonly reels: Reel[];
  private readonly rows: number;
  private readonly lines: Line[];
  private readonly symbols: Symbols;

  constructor({
    reelsCount,
    rowsCount,
    symbols,
    reels,
    lines,
  }: SlotMachineProps) {
    this.reels = Array.from(
      { length: reelsCount },
      (_, idx) => new Reel(reels[idx])
    );
    this.rows = rowsCount;
    this.lines = lines;
    this.symbols = symbols;
  }

  public spin(): SpinResult {
    const result: number[][] = Array.from({ length: this.reels.length });
    this.reels.map((reel, idx) => (result[idx] = reel.roll(this.rows)));

    const winnings: { [key: number]: number } = {};
    Object.keys(this.symbols).forEach((key) => {
      winnings[+key] = 0;
    });

    let payloadLines = 0;
    for (const combination of this.lines) {
      const target = result[0][combination[0]];

      if (this.checkCombination(result, combination, target)) {
        winnings[target]++;
        payloadLines++;
      }
    }

    let payload: number = 0;
    for (const symbol of Object.keys(winnings)) {
      const occurrence = winnings[+symbol];
      payload += this.symbols[+symbol][occurrence];
    }

    return {
      result,
      payload,
      payloadLines,
    };
  }

  private checkCombination(
    reels: number[][],
    combination: number[],
    target: number
  ): boolean {
    for (let i = 1; i < combination.length; i++) {
      const row = combination[i];
      if (reels[i][row] !== target) {
        return false;
      }
    }

    return true;
  }
}
