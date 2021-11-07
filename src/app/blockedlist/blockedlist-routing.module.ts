import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockedlistPage } from './blockedlist.page';

const routes: Routes = [
  {
    path: '',
    component: BlockedlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockedlistPageRoutingModule {}
