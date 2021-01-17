import { FormArray, FormControl } from "@angular/forms";
import { OncostsAdmin } from './oncosts-admin.model';

export class OncostsAdminForm {
  casualLoading = new FormControl();
  superannuation = new FormControl();
  taxes = new FormArray([]);
  insurance = new FormArray([]);
  other = new FormArray([]);

  constructor(oncostsAdmin: OncostsAdmin) {
    this.casualLoading.setValue(oncostsAdmin.casualLoading);
    this.superannuation.setValue(oncostsAdmin.superannuation);
    this.taxes.setValue(oncostsAdmin.taxes);
    this.insurance.setValue(oncostsAdmin.insurance);
    this.other.setValue(oncostsAdmin.other);
  }
}
