import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { SourcesComponent } from './sources/sources.component';
import { SummaryComponent } from './summary/summary.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth-interceptor';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth-guard';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    // SourcesComponent,
    SummaryComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    PaginatorComponent,
    LoginComponent,
    HeaderComponent,
    SearchEmployeeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [AddEmployeeComponent],
})
export class AppModule { }
