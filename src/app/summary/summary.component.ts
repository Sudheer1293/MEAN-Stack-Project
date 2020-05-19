import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Contact, Tab } from '../shared/model';
import { AppService } from '../app.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  contacts: Contact[];
  dynamicTabs: Tab[] = [];
  activateClass = true;
  selectedContactId: string;
  imgFilePath: string;
  
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(
    private appService: AppService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    // this.initialTab();
    this.getContactDetails();
  }

  getContactDetails(searchValue?: string) {
    this.appService.getContactDetails(searchValue).subscribe((value) => {
      this.contacts = value;
    });
  }

  selectSummaryTab() {
    this.activateClass = true;
    this.dynamicTabs.map((tab) => tab.active = false);
    this.removeActiveClass();
  }

  deselectSummaryTab() {
    this.activateClass = false;
  }

  removeActiveClass() {       
    const panelElements = document.querySelectorAll(".tab-pane.active");
    panelElements.forEach(element => { // instead of iterating over all dom elements may be we can store the tabid of previous active element 
                                    // in class variable and get the specific element using the id 
      element.classList.remove("active");
    });
  }

  selectTab(tab: Tab) {
    const activeElement = document.querySelector("#"+tab.id);
    tab.active = true;   
    this.dynamicTabs.map((tab) => tab.active = false);
    this.deselectSummaryTab();
    this.removeActiveClass();
    activeElement.classList.add("active");   
  }

  closeTab(tab: Tab) {
    const index = this.dynamicTabs.findIndex(dTab => dTab.id === tab.id);
    this.dynamicTabs.splice(index, 1);
    document.querySelector("#"+tab.id).remove();
    this.selectSummaryTab();
  }

  addEmployee() {
    const addTabExists = this.dynamicTabs.find((tab) => tab.id === 'add');
    if(addTabExists) {
      return;
    }
    this.dynamicTabs.map((tab) => tab.active = false);
    const addTab = {
      id: 'add',
      title: 'Add Employee',
      active: true
    };
    this.dynamicTabs.push(addTab);

    
    const factory = this.resolver.resolveComponentFactory(AddEmployeeComponent);
    const componentRef = this.container.createComponent(factory);
    
    componentRef.instance.tabs = this.dynamicTabs;
    this.deselectSummaryTab();
    this.removeActiveClass();
  }

  viewEmployee() {
    this.dynamicTabs.map((tab) => tab.active = false);
    const viewTab = {
      id: 'view'+ this.selectedContactId,
      title: 'View Employee',
      active: true,
    };
    this.dynamicTabs.push(viewTab);

    const factory = this.resolver.resolveComponentFactory(ViewEmployeeComponent);
    const componentRef = this.container.createComponent(factory);
    console.log(this.imgFilePath)
    componentRef.instance.tabs = this.dynamicTabs;
    componentRef.instance.empid = this.selectedContactId;
    componentRef.instance.filePath = this.imgFilePath;
    this.deselectSummaryTab();
    this.removeActiveClass();
  }

  rowClicked(contact: Contact) {
    this.selectedContactId = contact.empid;
    this.imgFilePath = contact.filePath;
  }
}
