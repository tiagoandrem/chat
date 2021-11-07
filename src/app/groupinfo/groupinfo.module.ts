import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupinfoPageRoutingModule } from './groupinfo-routing.module';

import { GroupinfoPage } from './groupinfo.page';
import { SharedModule } from '../services/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GroupinfoPageRoutingModule
  ],
  declarations: [GroupinfoPage]
})
export class GroupinfoPageModule {}
