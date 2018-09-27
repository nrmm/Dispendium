import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Despesa, MesRef } from '../../app/despesa';
import { DespesaProvider } from '../../providers/despesa/despesa';

@IonicPage({
  name: 'nova-despesa',
  segment: 'ref/:ano/:mes'
})
@Component({
  selector: 'page-nova-despesa',
  templateUrl: 'nova-despesa.html',
})
export class NovaDespesaPage {

  mesRef: MesRef;
  dia: string;
  descricao: string;
  valor: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private despesaProvider: DespesaProvider,
    private toastCtrl: ToastController  
  ) {
    this.setMesReferencia();  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaDespesaPage');
  }

  setMesReferencia(): void {
    this.mesRef = {
      ano: this.navParams.get('ano'),
      mes: this.navParams.get('mes')
    };
  }

  getDia() {
    return +this.dia.split('-')[2];
  }

  cadastrarDespesa(): void {
    if(!this.dia || !this.descricao || !this.valor) {
      return;
    }

    const despesa: Despesa = {
      id: Date.now(),
      dia: this.getDia(),
      descricao: this.descricao,
      valor: this.valor
    };

    this.despesaProvider.adicionarDespesa(this.mesRef, despesa)
      .then(despesas => {
        const toast = this.toastCtrl.create({
          message: 'Despesa cadastrada com sucesso.',
          duration: 3000
        });

        toast.present();
      }).catch(err => {
        console.log('Erro ao incluir nova despesa.');
      });

    this.descricao = null;
    this.valor = null;
  }
}
