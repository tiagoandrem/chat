import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedlistPageRoutingModule } from './blockedlist-routing.module';

import { BlockedlistPage } from './blockedlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockedlistPageRoutingModule
  ],
  declarations: [BlockedlistPage]
})
export class BlockedlistPageModule {}
