import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewgroupPageRoutingModule } from './newgroup-routing.module';

import { NewgroupPage } from './newgroup.page';
import { SharedModule } from '../services/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    NewgroupPageRoutingModule
  ],
  declarations: [NewgroupPage]
})
export class NewgroupPageModule {}
