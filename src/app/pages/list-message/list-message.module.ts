import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMessagePageRoutingModule } from './list-message-routing.module';

import { ListMessagePage } from './list-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMessagePageRoutingModule
  ],
  declarations: [ListMessagePage]
})
export class ListMessagePageModule {}
