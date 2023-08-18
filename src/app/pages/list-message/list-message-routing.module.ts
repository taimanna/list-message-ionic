import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMessagePage } from './list-message.page';

const routes: Routes = [
  {
    path: '',
    component: ListMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMessagePageRoutingModule {}
