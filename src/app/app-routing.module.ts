import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormEvaluationComponent } from './user-form-evaluation/user-form-evaluation.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-form', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent },
  { path: 'user-form/evaluation', component: UserFormEvaluationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
