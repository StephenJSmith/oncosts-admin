import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { OncostsAdminFormService } from './oncosts-admin-form.service';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OncostsAdmin, OncostsItem } from './_models';

@Component({
  selector: 'app-oncosts-admin',
  templateUrl: './oncosts-admin.component.html',
  styleUrls: ['./oncosts-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OncostsAdminComponent implements OnInit, OnDestroy {
  adminForm?: FormGroup;
  adminFormSub?: Subscription;
  isFormInvalid: boolean = false;
  taxesItems?: FormArray;
  insuranceItems?: FormArray;
  otherItems?: FormArray;
  duplicatedItemErrorText: string = 'Oncost name already exists. Please rename';

  get isTaxesItemsValid(): boolean | undefined {
    if (!this.adminForm) { return false; }
    if (!this.adminForm.get('taxes')) { return true; }

    return this.adminForm?.get('taxes')?.valid || false;
  }

  get isInsuranceItemsValid(): boolean | undefined {
    if (!this.adminForm) { return false; }
    if (!this.adminForm.get('insurance')) { return true; }

    return this.adminForm?.get('insurance')?.valid || false;
  }

  get isOtherItemsValid(): boolean | undefined {
    if (!this.adminForm) { return false; }
    if (!this.adminForm.get('other')) { return true; }

    return this.adminForm?.get('other')?.valid || false;
  }

  constructor(
    private adminFormService: OncostsAdminFormService
  ) { }

  ngOnInit(): void {
    this.adminFormSub = this.adminFormService.adminForm$
      .subscribe(adminForm => {
        this.adminForm = adminForm;
        this.taxesItems = this.adminForm.get('taxes') as FormArray;
        this.insuranceItems = this.adminForm.get('insurance') as FormArray;
        this.otherItems = this.adminForm.get('other') as FormArray;
      })
  }

  ngOnDestroy(): void {
    this.adminFormSub?.unsubscribe();
  }

  populateOncostsAdmin() {
    // simulate existing values when form opened
    const taxes = [
      new OncostsItem('PAYG', 13),
      new OncostsItem('FBT', 7)
    ];

    const insurances = [
      new OncostsItem('Workers Comp - NSW', 4.5),
      new OncostsItem('Workers Comp - VIC', 5),
    ];

    const other = [
      new OncostsItem('Misc', 6)
    ];

    const initial = new OncostsAdmin(
      12, 15, taxes, insurances, other
    );
    this.adminFormService.setOncostsAdmin(initial);
  }

  addTaxesItem(): void {
    this.adminFormService.addTaxesItem();
  }

  deleteTaxesItem(index: number): void {
    this.adminFormService.deleteTaxesItem(index);
  }

  addInsuranceItem(): void {
    this.adminFormService.addInsuranceItem();
  }

  deleteInsuranceItem(index: number): void {
    this.adminFormService.deleteInsuranceItem(index);
  }

  addOtherItem(): void {
    this.adminFormService.addOtherItem();
  }

  deleteOtherItem(index: number): void {
    this.adminFormService.deleteOtherItem(index);
  }

  onSaveChanges() {
    this.adminFormService.saveChanges();
    console.log('Form to save:', this.adminForm?.value);
  }

  onCancel() {
    this.adminFormService.revertToLastSavedChange();
  }
}
