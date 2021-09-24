import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonsComponent } from './components/persons/persons.component';

const routes: Routes = [
  { path: '', component: PersonsComponent },
  { path: 'person/new', component: PersonFormComponent },
  { path: 'person/:id', component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
