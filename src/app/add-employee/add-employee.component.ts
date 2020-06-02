import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Tab, Contact } from '../shared/model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @HostBinding('class.tab-pane') tabPane: boolean = true;
  @HostBinding('class.active') active: boolean;
  @HostBinding('attr.id') id: string;
  tabs: Tab[];
  currentTab: Tab;
  empForm: FormGroup;
  previousCompanies: FormArray;
  submitted: boolean;
  selectedEmployee: Contact;
  submitValue: string = 'Submit';

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    console.log(this.selectedEmployee)
    this.active = this.tabs[this.tabs.length-1].active;
    this.id = this.tabs[this.tabs.length-1].id;
    this.buildForm();
    if(!!this.selectedEmployee) {
      this.setEmployeeData();
      this.submitValue = 'Update';
    }
  }

  buildForm() {
    this.empForm = this.formBuilder.group({
      name: ['', Validators.required],
      empid: ['', Validators.required],
      company: ['', Validators.required],
      previousCompanies: this.formBuilder.array([]),
    });
  }

  get companies(): FormArray {
    return this.empForm.get('previousCompanies') as FormArray;
  }

  get empFormControl() {
    return this.empForm.controls;
  }

  setEmployeeData() {
    this.empFormControl['name'].setValue(this.selectedEmployee.name);
    this.empFormControl['empid'].setValue(this.selectedEmployee.empid);
    this.empFormControl['company'].setValue(this.selectedEmployee.company);
    const previousCompanies = this.selectedEmployee.previousCompanies.map((company) => ({
      companyName: company.companyName,
      experience: company.experience
    }));
    
    previousCompanies.forEach(() => {
      const company = this.prevCompanies();
      this.companies.push(company);
    });
    this.companies.patchValue(previousCompanies);
  }

  prevCompanies() {
    return this.formBuilder.group({
      companyName: ['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern("^[0-9]*")]]
    });
  }

  changed(i) {
    console.log(i)
  }

  addExperience() {
    this.previousCompanies = this.empForm.get('previousCompanies') as FormArray;
    this.previousCompanies.push(this.prevCompanies());
  }

  onSubmit() {
    const employee = this.empForm.value;
    console.log(employee)
    this.submitted = true;
    if(!this.empForm.invalid && this.selectedEmployee) {
      this.appService.updateEmployee(employee, this.selectedEmployee._id)
        .subscribe(() => {
          this.appService.employeeAdded$.next(this.currentTab);
      });
    }
    else if(!this.empForm.invalid) {
      this.appService.addEmployee(employee)
        .subscribe(() => {
          this.appService.employeeAdded$.next(this.currentTab);
      });    
    }
    
  }
 
}
