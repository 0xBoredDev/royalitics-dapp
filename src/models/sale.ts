export class Sale {
  constructor(
    day: string,
    month: string,
    year: string,
    timestamp: string,
    royaltiesCollected: number,
    royaltiesUnCollected: number,
    marketplace: string,
    paidFullRoyalty: boolean,
    paidHalfRoyalty: boolean,
    sellerFee: number
  ) {
    day = day;
    month = month;
    year = year;
    timestamp = timestamp;
    royaltiesCollected = royaltiesCollected;
    marketplace = marketplace;
    paidFullRoyalty = paidFullRoyalty;
    paidHalfRoyalty = paidHalfRoyalty;
    sellerFee = sellerFee;
  }
}
