import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { OncostsAdminForm } from './_models';
import { OncostsAdmin } from './_models';
import { OncostsItem } from './_models/oncosts-item.model';
import { OncostsItemForm } from './_models/oncosts-item-form.model';

@Injectable({
  providedIn: 'root'
})
export class OncostsAdminFormService {
  private adminForm: BehaviorSubject<FormGroup>
    = new BehaviorSubject(this.fb.group(
      new OncostsAdminForm(
        new OncostsAdmin(0, 0, [], [], []))
    ));
  adminForm$: Observable<FormGroup>
    = this.adminForm.asObservable();

  private lastSavedAdmin: OncostsAdmin
    = new OncostsAdmin(0, 0, [], [], []);

  get casualLoading(): FormControl {
    return this.adminForm.getValue().get('casualLoading') as FormControl;
  }

  constructor(private fb: FormBuilder) { }

  setOncostsAdmin(oncostsAdmin: OncostsAdmin) {
    this.lastSavedAdmin = oncostsAdmin;
    const currentAdmin = this.adminForm.getValue();

    const casualLoading = currentAdmin.get('casualLoading') as FormControl;
    casualLoading.setValue(oncostsAdmin.casualLoading);

    const superannuation = currentAdmin.get('superannuation') as FormControl;
    superannuation.setValue(oncostsAdmin.superannuation);

    const taxes = currentAdmin.get('taxes') as FormArray;
    this.replaceOncostItems(taxes, oncostsAdmin.taxes);

    const insurance = currentAdmin.get('insurance') as FormArray;
    this.replaceOncostItems(insurance, oncostsAdmin.insurance);

    const other = currentAdmin.get('other') as FormArray;
    this.replaceOncostItems(other, oncostsAdmin.other);

    this.adminForm.next(currentAdmin);
  }

  private replaceOncostItems(formArray: FormArray, oncostItems: OncostsItem[]) {
    formArray.clear();

    oncostItems.forEach(item =>
      formArray.push(
        this.fb.group(new OncostsItemForm(item))
      ))
  }

  addTaxesItem() {
    this.addCategoryItem('taxes');
  }

  deleteTaxesItem(index: number) {
    this.deleteCategoryItem('taxes', index);
  }

  addInsuranceItem() {
    this.addCategoryItem('insurance');
  }

  deleteInsuranceItem(index: number) {
    this.deleteCategoryItem('insurance', index);
  }

  addOtherItem() {
    this.addCategoryItem('other');
  }

  deleteOtherItem(index: number) {
    this.deleteCategoryItem('other', index);
  }

  saveChanges() {
    this.lastSavedAdmin = this.adminForm.getValue().value;
  }

  revertToLastSavedChange() {
    if (!this.adminForm.getValue().dirty) { return; }

    this.setOncostsAdmin(this.lastSavedAdmin);
  }

  private addCategoryItem(category: string) {
    const currentAdmin = this.adminForm.getValue();
    const currentCategoryItems = currentAdmin.get(category) as FormArray;

    currentCategoryItems.push(
      this.fb.group(
        new OncostsItemForm(
          new OncostsItem('', 0)
        )
      )
    )

    this.adminForm.next(currentAdmin);
  }

  private deleteCategoryItem(category: string, index: number) {
    const currentAdmin = this.adminForm.getValue();
    const currentCategoryItems = currentAdmin.get(category) as FormArray;

    currentCategoryItems.removeAt(index);

    this.resetInvalidItemsValue(currentCategoryItems);

    this.adminForm.next(currentAdmin);
  }

  private resetInvalidItemsValue(currentCategoryItems: FormArray) {
    for (let i = 0; i < currentCategoryItems.controls.length; i++) {
      const item = currentCategoryItems.controls[i].get('itemType');
      if (item?.invalid) {
        item?.setValue(item.value);
      }
    }
  }
}
