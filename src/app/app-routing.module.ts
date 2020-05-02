import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SourcesComponent } from './sources/sources.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';


const routes: Routes = [
  // { path: 'sources', component: SourcesComponent },
  { path: 'summary', component: SummaryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
