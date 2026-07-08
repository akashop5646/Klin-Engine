export class Rating {
  public stars: number;
  public reviewCount: number = 0;

  constructor(stars: number) {
    this.stars = stars;
  }
}
