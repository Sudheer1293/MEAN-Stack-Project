import { Component, OnInit, HostBinding, Output, EventEmitter } from '@angular/core';
import { Tab } from '../shared/model';

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
  recentTabId: string;

  constructor() { }

  ngOnInit(): void {
    this.active = this.tabs[this.tabs.length-1].active;
    this.id = this.tabs[this.tabs.length-1].id;
  }
 
}
