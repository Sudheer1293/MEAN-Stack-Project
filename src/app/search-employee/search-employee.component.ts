import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  searchForm: FormGroup;
  @Output() searchValue = new EventEmitter();

  constructor(
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  getFormControls(){
    return this.searchForm.controls;
  }

  buildForm() {
    this.searchForm = this.formbuilder.group({
      searchEmp: ['']
    }); 
  }

  onSubmit() {
    console.log(this.getFormControls()['searchEmp'].value)
    const value = this.getFormControls()['searchEmp'].value;
    this.searchValue.emit(value);
  }
}
