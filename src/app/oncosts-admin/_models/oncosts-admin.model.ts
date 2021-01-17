import { OncostsItem } from './oncosts-item.model';
export class OncostsAdmin {
  casualLoading: number;
  superannuation: number;
  taxes: OncostsItem[];
  insurance: OncostsItem[];
  other: OncostsItem[];

  constructor(
    casualLoading: number,
    superannuation: number,
    taxes: OncostsItem[],
    insurance: OncostsItem[],
    other: OncostsItem[],
  ) {
    this.casualLoading = casualLoading;
    this.superannuation = superannuation;
    this.taxes = taxes;
    this.insurance = insurance;
    this.other = other;
  }
}
