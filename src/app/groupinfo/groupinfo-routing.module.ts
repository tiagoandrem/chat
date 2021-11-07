import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupinfoPage } from './groupinfo.page';

const routes: Routes = [
  {
    path: '',
    component: GroupinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupinfoPageRoutingModule {}
