import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaDespesaPage } from './nova-despesa';

@NgModule({
  declarations: [
    NovaDespesaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaDespesaPage),
  ],
})
export class NovaDespesaPageModule {}
