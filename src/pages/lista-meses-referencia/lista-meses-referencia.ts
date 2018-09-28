import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverMenu } from './popover-menu';
import { ListaDespesasPage } from '../lista-despesas/lista-despesas';

import { MesRefProvider } from '../../providers/mes-ref/mes-ref';
import { MesRef } from '../../app/despesa';

@Component({
  selector: 'page-lista-meses-referencia',
  templateUrl: 'lista-meses-referencia.html'
})
export class ListaMesesReferenciaPage {
  mesesRef: MesRef[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private mesRefProvider: MesRefProvider
  ) {
    this.getMesesReferencia();
  }

  verMesReferencia(mesRef: MesRef): void {
    this.navCtrl.push(ListaDespesasPage, {
      ano: mesRef.ano,
      mes: mesRef.mes
    });
  }

  getMesesReferencia(): void {
    this.mesRefProvider.getMesesReferencia().then((mesesRef: MesRef[]) => {
      this.mesesRef = mesesRef;
    });
  }

  exibirOpcoes(event): void {
    let popover = this.popoverCtrl.create(PopoverMenu);
    
    popover.present({
      ev: event
    })
  }
}
