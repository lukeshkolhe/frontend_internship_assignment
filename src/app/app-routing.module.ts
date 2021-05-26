import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankComponent } from './bank/bank.component';

const routes: Routes = [
  { path : "", component : BankListComponent},
  { path : "bank-list", component : BankListComponent},
  { path: "bank", component: BankComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }