import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmembersPageRoutingModule } from './addmembers-routing.module';

import { AddmembersPage } from './addmembers.page';
import { SharedModule } from '../services/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AddmembersPageRoutingModule
  ],
  declarations: [AddmembersPage]
})
export class AddmembersPageModule {}
