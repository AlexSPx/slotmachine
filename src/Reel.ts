export class Reel {
  private readonly positions: number[];

  constructor(positions: number[]) {
    this.positions = positions;
  }

  public roll(range: number): number[] {
    let index = Math.floor(Math.random() * this.positions.length);

    const result: number[] = new Array(range);
    for (let i = 0; i < range; i++) {
      result[i] = this.positions[index];
      index = (index + 1) % this.positions.length;
    }

    return result;
  }
}
