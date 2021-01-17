import { FormControl, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { OncostsItem } from './oncosts-item.model';
export class OncostsItemForm {
  itemType = new FormControl();
  amount = new FormControl();

  constructor(oncostsItem: OncostsItem) {
    this.itemType.setValue(oncostsItem.itemType);
    this.itemType.setValidators([
      Validators.required,
      RxwebValidators.unique(),
    ]);

    this.amount.setValue(oncostsItem.amount);
    this.amount.setValidators([
      Validators.required,
      Validators.min(1),
    ]);
  }
}
