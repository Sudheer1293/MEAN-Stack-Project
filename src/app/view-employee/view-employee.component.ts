import { Component, OnInit, HostBinding } from '@angular/core';
import { Tab } from '../shared/model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  @HostBinding('class.tab-pane') tabPane: boolean = true;
  @HostBinding('class.active') active: boolean;
  @HostBinding('attr.id') id: string;
  tabs: Tab[];
  recentTabId: string;
  empid: string;
  filePath: string;
  filesToUpload: Array<File> = [];

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit(): void {
    this.active = this.tabs[this.tabs.length-1].active;
    this.id = this.tabs[this.tabs.length-1].id;
  }

  fileSelected(file) {
    this.filesToUpload = <Array<File>>file.target.files;
    const formData = new FormData();
    const files: Array<File> = this.filesToUpload;
    for(let i=0; i < files.length; i++) {
      formData.append('avatar', files[i], files[i].name);
      formData.append('empid', this.empid);
    }
    this.appService.uploadFile(formData)
    
  }

}
