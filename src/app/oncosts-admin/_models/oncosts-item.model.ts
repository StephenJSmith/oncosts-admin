export class OncostsItem {
  itemType: string;
  amount: number

  constructor(
    itemType: string,
    amount: number
  ) {
    this.itemType = itemType;
    this.amount = amount;
  }
}
