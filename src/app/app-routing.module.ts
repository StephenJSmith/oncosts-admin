import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OncostsAdminComponent } from './oncosts-admin/oncosts-admin.component';

const routes: Routes = [
  { path: '', component: OncostsAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
