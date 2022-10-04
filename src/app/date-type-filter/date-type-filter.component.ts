import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-type-filter',
  templateUrl: './date-type-filter.component.html',
})
export class DateTypeFilterComponent implements OnInit {
  form: FormGroup;
  @Input() defaultFilters = [];
  @Output() applied = new EventEmitter();
  selectedValue: string;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Today: [this.defaultFilters.includes('Today')],
      Tomorrow: [this.defaultFilters.includes('Tomorrow')],
      Yesterday: [this.defaultFilters.includes('Yesterday')],
    });
  }

  submit(formValue) {
    const dateTypes = Object.keys(formValue).filter((item) => formValue[item]);
    console.log(dateTypes);
    this.applied.emit(dateTypes);

    // this.selectedValue = '';
    // if (type) {
    //   if (type == 'Today') {
    //     this.selectedValue = type; // new Date().toDateString();
    //   } else if (type == 'Tomorrow') {
    //     this.selectedValue = type; //(new Date().setDate(new Date().getDate() + 1));
    //   } else if (type == 'Yesterday') {
    //     this.selectedValue = type; //(new Date().getDate() - 1).toString();
    //   }
    //   console.log(this.selectedValue);
    // }
  }
}
