import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-oncosts-item',
  templateUrl: './oncosts-item.component.html',
  styleUrls: ['./oncosts-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OncostsItemComponent implements OnInit {
  @Input() index?: number;
  @Input() itemForm?: FormGroup;
  @Input() placeholderText = 'Enter item type';
  @Input() duplicatedErrorText = 'Item type already exists. Please rename.';
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();

  get itemTypeControl(): FormControl | null | undefined {
    return this.itemForm?.get('itemType') as FormControl;
  }

  get amountControl(): FormControl | null | undefined {
    return this.itemForm?.get('amount') as FormControl;
  }

  get canShowItemTypeError(): boolean | null | undefined {
    return this.itemTypeControl
      && this.itemTypeControl.invalid
      && this.itemTypeControl.touched;
  }

  get canShowItemTypeRequiredError(): boolean | null | undefined {
    return this.canShowItemTypeError && this.itemTypeControl?.errors?.required;
  }

  get canShowItemTypeDuplicatedError(): boolean | null | undefined {
    return this.itemTypeControl
      && this.itemTypeControl.invalid
      && this.itemTypeControl?.errors?.unique;
  }

  get canShowAmountError(): boolean | null | undefined {
    return this.amountControl
      && this.amountControl.invalid
      && this.amountControl.touched;
  }

  get canShowAmountRequiredError(): boolean | null | undefined {
    return this.canShowAmountError && this.amountControl?.errors?.required;
  }

  get canShowMinAmountError(): boolean | null | undefined {
    return this.canShowAmountError && this.amountControl?.errors?.min;
  }


  constructor() { }

  ngOnInit(): void { }

  onDelete() {
    this.deleteItem.emit(this.index);
  }
}
